import { MessageCircle } from "lucide-react";

export default function WelcomeSection() {
  return (
    <div className="text-center mb-8 animate-fade-in">
      <div className="w-24 h-24 bg-gradient-to-br from-sage via-skyblue to-peach rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl neon-glow animate-gentle-pulse relative">
        <div className="absolute inset-0 bg-gradient-to-br from-sage via-skyblue to-peach rounded-full animate-spin" style={{animationDuration: '10s'}}></div>
        <div className="relative z-10 w-20 h-20 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
          <MessageCircle className="text-sage text-2xl" size={32} />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-gradient mb-3">Hello, I'm here to listen</h2>
      <p className="text-gray-600 max-w-lg mx-auto text-lg leading-relaxed">
        Take your time. Share what's on your mind today, and I'll be here to support you through it. 
        <span className="block mt-2 text-sm text-sage font-medium">✨ Your thoughts matter</span>
      </p>
    </div>
  );
}
