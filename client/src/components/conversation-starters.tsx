import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ConversationStartersProps {
  sessionId: string;
}

const starterPrompts = [
  "I'm feeling overwhelmed today",
  "I need someone to talk to",
  "I'm struggling with anxiety",
  "I'm having trouble sleeping",
  "I'm feeling lonely lately",
  "I'm stressed about work"
];

export default function ConversationStarters({ sessionId }: ConversationStartersProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", {
        message,
        sessionId
      });
      return response.json();
    },
    onSuccess: () => {
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

  const handleStarterClick = (prompt: string) => {
    sendMessageMutation.mutate(prompt);
  };

  return (
    <div className="mb-8 animate-slide-up">
      <p className="text-sm text-gray-500 text-center mb-6">Or try one of these gentle prompts:</p>
      <div className="flex flex-wrap gap-3 justify-center">
        {starterPrompts.map((prompt, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => handleStarterClick(prompt)}
            disabled={sendMessageMutation.isPending}
            className="px-4 py-2 glass-effect border border-white/30 rounded-full text-sm text-charcoal hover:neon-glow hover:border-sage/50 transition-all duration-300 shadow-lg backdrop-blur-md hover:scale-105"
          >
            "✨ {prompt}"
          </Button>
        ))}
      </div>
    </div>
  );
}
