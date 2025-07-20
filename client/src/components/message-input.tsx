import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface MessageInputProps {
  sessionId: string;
}

export default function MessageInput({ sessionId }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const sendMessageMutation = useMutation({
    mutationFn: async (messageContent: string) => {
      const response = await apiRequest("POST", "/api/chat", {
        message: messageContent,
        sessionId
      });
      return response.json();
    },
    onSuccess: () => {
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["/api/conversations", sessionId, "messages"] });
    },
    onError: () => {
      toast({
        title: "Connection issue",
        description: "I'm having trouble connecting right now, but I'm still here for you. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSend = () => {
    if (message.trim() && !sendMessageMutation.isPending) {
      sendMessageMutation.mutate(message.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setMessage(value);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-effect backdrop-blur-md border-t border-sage/30 shadow-2xl neon-glow">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <Textarea
              placeholder="Share what's on your mind... I'm listening ✨"
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              disabled={sendMessageMutation.isPending}
              className="resize-none rounded-2xl border border-white/30 focus:border-sage focus:ring-2 focus:ring-sage/30 px-4 py-3 pr-12 text-charcoal placeholder-gray-400 glass-effect backdrop-blur-md shadow-lg min-h-[50px] max-h-32"
              rows={1}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-3 right-3 p-1.5 text-gray-400 hover:text-sage transition-colors rounded-full hover:bg-sage/10"
            >
              <Mic size={16} />
            </Button>
          </div>
          <Button
            onClick={handleSend}
            disabled={!message.trim() || sendMessageMutation.isPending}
            className="bg-gradient-to-r from-sage to-skyblue text-white p-3 rounded-full shadow-2xl hover:shadow-xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed neon-glow animate-gentle-pulse"
          >
            <Send size={18} />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
          <span>Take your time - there's no rush</span>
          <span>{message.length}/1000</span>
        </div>
      </div>
    </div>
  );
}
