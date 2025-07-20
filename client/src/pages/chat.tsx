import { useState, useEffect } from "react";
import ChatHeader from "@/components/chat-header";
import WelcomeSection from "@/components/welcome-section";
import ConversationStarters from "@/components/conversation-starters";
import ChatMessages from "@/components/chat-messages";
import MessageInput from "@/components/message-input";
import CrisisResourcesModal from "@/components/crisis-resources-modal";

export default function Chat() {
  const [sessionId, setSessionId] = useState<string>("");
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  useEffect(() => {
    // Generate a unique session ID for this chat session
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sage/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-skyblue/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-peach/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10">
        <ChatHeader onOpenCrisisModal={() => setShowCrisisModal(true)} />
        
        <main className="max-w-4xl mx-auto px-4 py-6 pb-32">
          <WelcomeSection />
          <ConversationStarters sessionId={sessionId} />
          <ChatMessages sessionId={sessionId} />
        </main>

        <MessageInput sessionId={sessionId} />
        
        <CrisisResourcesModal 
          isOpen={showCrisisModal} 
          onClose={() => setShowCrisisModal(false)} 
        />
      </div>
    </div>
  );
}
