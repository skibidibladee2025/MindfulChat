import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Heart, User } from "lucide-react";
import type { Message } from "@shared/schema";
import { format } from "date-fns";

interface ChatMessagesProps {
  sessionId: string;
}

export default function ChatMessages({ sessionId }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["/api/conversations", sessionId, "messages"],
    enabled: !!sessionId,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-start space-x-3 animate-fade-in">
          <div className="w-8 h-8 bg-gradient-to-br from-sage to-skyblue rounded-full flex-shrink-0 flex items-center justify-center">
            <Heart className="text-white" size={12} />
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-gray-100 max-w-sm">
              <div className="animate-pulse space-y-2">
                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {messages.map((message: Message) => (
        <div
          key={message.id}
          className={`flex items-start space-x-3 animate-slide-up ${
            message.role === "user" ? "justify-end" : ""
          }`}
        >
          {message.role === "assistant" && (
            <div className="w-8 h-8 bg-gradient-to-br from-sage to-skyblue rounded-full flex-shrink-0 flex items-center justify-center shadow-lg neon-glow animate-gentle-pulse">
              <Heart className="text-white" size={12} />
            </div>
          )}
          
          <div className="flex-1">
            <div
              className={`${
                message.role === "user"
                  ? "bg-gradient-to-r from-sage to-skyblue rounded-2xl rounded-tr-md px-4 py-3 shadow-lg max-w-sm ml-auto neon-glow"
                  : "glass-effect rounded-2xl rounded-tl-md px-4 py-3 shadow-lg border border-white/30 max-w-sm backdrop-blur-md"
              }`}
            >
              <p
                className={`leading-relaxed ${
                  message.role === "user" ? "text-white" : "text-charcoal"
                }`}
              >
                {message.content}
              </p>
            </div>
            <p
              className={`text-xs text-gray-400 mt-1 ${
                message.role === "user" ? "text-right mr-2" : "ml-2"
              }`}
            >
              {format(new Date(message.timestamp), "h:mm a")}
            </p>
          </div>

          {message.role === "user" && (
            <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex-shrink-0 flex items-center justify-center shadow-lg">
              <User className="text-white" size={12} />
            </div>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
