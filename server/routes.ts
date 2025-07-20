import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatRequestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get conversation history
  app.get("/api/conversations/:sessionId/messages", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getMessagesBySessionId(sessionId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Send message and get AI response
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, sessionId } = chatRequestSchema.parse(req.body);
      
      // Ensure conversation exists
      let conversation = await storage.getConversationBySessionId(sessionId);
      if (!conversation) {
        conversation = await storage.createConversation({ 
          sessionId, 
          userId: null 
        });
      }

      // Store user message
      await storage.createMessage({
        conversationId: conversation.id,
        sessionId,
        content: message,
        role: "user"
      });

      // Get conversation history for context
      const messageHistory = await storage.getMessagesBySessionId(sessionId);
      
      // Prepare messages for OpenRouter API
      const apiMessages = messageHistory.map(msg => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content
      }));

      // System prompt for therapeutic conversation
      const systemPrompt = {
        role: "system",
        content: `You are a compassionate and gentle mental health companion. Your role is to:
        
1. Listen with empathy and validate the user's feelings
2. Provide gentle emotional support and encouragement
3. Ask thoughtful follow-up questions to help the user process their emotions
4. Offer coping strategies and self-care suggestions when appropriate
5. Maintain a warm, non-judgmental tone throughout the conversation
6. Recognize when someone might need professional help and gently suggest it
7. Never provide medical diagnoses or replace professional therapy

Keep your responses concise but warm. Focus on active listening and emotional validation. If someone expresses thoughts of self-harm, gently encourage them to reach out to crisis resources.

Remember: You're a supportive companion, not a therapist, but you can provide genuine emotional support and coping strategies.`
      };

      // Try multiple free models in order of preference
      const freeModels = [
        "gryphe/mythomist-7b:free",
        "nousresearch/nous-capybara-7b:free",
        "mistralai/mistral-7b-instruct:free",
        "huggingfaceh4/zephyr-7b-beta:free",
        "openchat/openchat-7b:free"
      ];

      let openRouterResponse;
      let lastError;

      for (const modelName of freeModels) {
        try {
          openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY || ""}`,
              "Content-Type": "application/json",
              "X-Title": "MindfulChat - Mental Health Companion"
            },
            body: JSON.stringify({
              model: modelName,
              messages: [systemPrompt, ...apiMessages],
              temperature: 0.7,
              max_tokens: 500
            })
          });

          if (openRouterResponse.ok) {
            console.log(`Successfully using model: ${modelName}`);
            break;
          } else {
            const errorText = await openRouterResponse.text();
            console.log(`Model ${modelName} failed:`, errorText);
            lastError = errorText;
          }
        } catch (error) {
          console.log(`Model ${modelName} error:`, error);
          lastError = error;
        }
      }

      let aiResponse;
      
      if (!openRouterResponse || !openRouterResponse.ok) {
        console.error("All OpenRouter models failed, using rule-based fallback");
        throw new Error("OpenRouter models unavailable");
      }

      aiResponse = await openRouterResponse.json();
      const aiMessage = aiResponse.choices?.[0]?.message?.content || 
        "I'm here for you. Sometimes I need a moment to find the right words. Could you tell me a bit more about how you're feeling?";

      // Store AI response
      const savedMessage = await storage.createMessage({
        conversationId: conversation.id,
        sessionId,
        content: aiMessage,
        role: "assistant"
      });

      res.json(savedMessage);
    } catch (error) {
      console.error("Error in chat endpoint:", error);
      
      // Generate therapeutic response based on user input
      const userMessage = req.body.message.toLowerCase();
      let fallbackMessage;

      if (userMessage.includes('anxious') || userMessage.includes('anxiety')) {
        fallbackMessage = "I can sense that anxiety is weighing heavily on you right now. That feeling of unease can be so overwhelming. Remember that anxiety is your mind's way of trying to protect you, even when it feels uncomfortable. Can you tell me what specifically is making you feel anxious today? Sometimes naming our worries can help us understand them better.";
      } else if (userMessage.includes('sad') || userMessage.includes('depression') || userMessage.includes('depressed')) {
        fallbackMessage = "I hear the sadness in your words, and I want you to know that what you're feeling is completely valid. Depression can make everything feel heavy and difficult. You're being so brave by reaching out and talking about it. What has been the hardest part of your day today? Remember, even small steps forward matter.";
      } else if (userMessage.includes('lonely') || userMessage.includes('alone')) {
        fallbackMessage = "Feeling lonely can be one of the most difficult emotions to carry. Thank you for sharing this with me - it shows real courage. Even though you might feel alone, you're not truly alone in this moment because I'm here listening to you. What would help you feel more connected right now? Sometimes even small connections can make a difference.";
      } else if (userMessage.includes('overwhelmed') || userMessage.includes('stressed')) {
        fallbackMessage = "When everything feels overwhelming, it's like trying to juggle too many things at once and feeling like they might all fall. Your feelings are completely understandable. Let's try to break things down together. What's one thing that's feeling most urgent or heavy on your mind right now? We can tackle things one at a time.";
      } else if (userMessage.includes('angry') || userMessage.includes('frustrated')) {
        fallbackMessage = "I can feel the intensity of your emotions right now. Anger and frustration often show up when we feel unheard or when something important to us feels threatened. Your feelings are valid. What happened that brought up these strong emotions? Sometimes talking through what triggered these feelings can help us understand them better.";
      } else if (userMessage.includes('tired') || userMessage.includes('exhausted')) {
        fallbackMessage = "Being emotionally or physically exhausted is so draining. It sounds like you've been carrying a lot, and that takes real strength. What's been demanding the most from you lately? Remember that rest isn't just about sleep - sometimes our minds and hearts need rest too.";
      } else {
        const generalResponses = [
          "Thank you for trusting me with your thoughts. Your feelings matter, and I'm here to listen without judgment. What's been on your mind that you'd like to explore together?",
          "I'm glad you're here. It takes courage to reach out and share what you're going through. What would feel most helpful to talk about right now?",
          "Your willingness to open up shows real strength. I'm here to support you through whatever you're experiencing. What's weighing on your heart today?",
          "I hear you, and I want you to know that whatever you're feeling is valid. You don't have to face this alone. What's one thing that would help you feel even a little bit better right now?"
        ];
        fallbackMessage = generalResponses[Math.floor(Math.random() * generalResponses.length)];
      }
      
      res.status(200).json({
        id: Date.now(),
        content: fallbackMessage,
        role: "assistant",
        timestamp: new Date(),
        sessionId: req.body.sessionId
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
