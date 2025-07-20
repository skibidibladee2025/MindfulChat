import { messages, conversations, type Message, type InsertMessage, type Conversation, type InsertConversation } from "@shared/schema";

export interface IStorage {
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  getConversationBySessionId(sessionId: string): Promise<Conversation | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  getMessagesBySessionId(sessionId: string): Promise<Message[]>;
}

export class MemStorage implements IStorage {
  private conversations: Map<number, Conversation>;
  private messages: Map<number, Message>;
  private conversationId: number;
  private messageId: number;

  constructor() {
    this.conversations = new Map();
    this.messages = new Map();
    this.conversationId = 1;
    this.messageId = 1;
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const id = this.conversationId++;
    const conversation: Conversation = { 
      id, 
      sessionId: insertConversation.sessionId,
      userId: insertConversation.userId ?? null,
      createdAt: new Date() 
    };
    this.conversations.set(id, conversation);
    return conversation;
  }

  async getConversationBySessionId(sessionId: string): Promise<Conversation | undefined> {
    return Array.from(this.conversations.values()).find(
      (conversation) => conversation.sessionId === sessionId,
    );
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageId++;
    const message: Message = { 
      id, 
      role: insertMessage.role,
      content: insertMessage.content,
      sessionId: insertMessage.sessionId,
      conversationId: insertMessage.conversationId ?? null,
      timestamp: new Date() 
    };
    this.messages.set(id, message);
    return message;
  }

  async getMessagesBySessionId(sessionId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter((message) => message.sessionId === sessionId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }
}

export const storage = new MemStorage();
