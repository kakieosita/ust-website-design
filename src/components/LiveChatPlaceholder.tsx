import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const LiveChatPlaceholder = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      {/* Chat Window Mockup */}
      {isOpen && (
        <div className="w-80 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-fade-in-up">
          <div className="bg-accent p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">UST</div>
              <div>
                <p className="text-sm font-bold leading-none">UST Support</p>
                <p className="text-[10px] opacity-80">Online • Usually replies in minutes</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
              <X size={18} />
            </button>
          </div>
          
          <div className="h-64 p-4 overflow-y-auto bg-muted/30">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-muted-foreground mb-4 max-w-[80%] border border-border/50">
              Hello! 👋 How can we help you today?
            </div>
          </div>
          
          <div className="p-4 bg-background border-t border-border">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="w-full bg-muted border border-border/60 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-accent font-bold text-xs uppercase tracking-wider px-2">
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group relative"
      >
        <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-25 group-hover:hidden" />
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default LiveChatPlaceholder;
