import { Heart, LifeBuoy, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onOpenCrisisModal: () => void;
}

export default function ChatHeader({ onOpenCrisisModal }: ChatHeaderProps) {
  return (
    <header className="glass-effect backdrop-blur-md shadow-lg border-b border-sage/30 sticky top-0 z-50 neon-glow">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sage to-skyblue rounded-full flex items-center justify-center shadow-lg animate-gentle-pulse">
              <Heart className="text-white text-lg" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">MindfulChat</h1>
              <p className="text-sm text-gray-500 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-gentle-pulse"></span>
                Here for you
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onOpenCrisisModal}
              className="text-gray-500 hover:text-sage transition-colors rounded-full hover:bg-sage/10"
            >
              <LifeBuoy size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-sage transition-colors rounded-full hover:bg-sage/10"
            >
              <Settings size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
