import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Loader2 } from "lucide-react";
import { useSendChatMessage } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "ai";
  text: string;
  suggestedActions?: string[];
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hello! I am EliteCare AI. I can help you book appointments, find doctors, or provide clinic information. How may I assist you today?",
      suggestedActions: ["Book Appointment", "Find a Doctor", "Clinic Timings", "Emergency Contact"],
    },
  ]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mutation = useSendChatMessage();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, mutation.isPending]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");

    mutation.mutate(
      { data: { message: text, sessionId } },
      {
        onSuccess: (res) => {
          setSessionId(res.sessionId);
          setMessages((prev) => [
            ...prev,
            { role: "ai", text: res.reply, suggestedActions: res.suggestedActions },
          ]);
        },
        onError: () => {
          setMessages((prev) => [
            ...prev,
            { role: "ai", text: "I'm sorry, I'm having trouble connecting right now. Please call our helpline at +91 98765 43210." },
          ]);
        },
      }
    );
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/40 border border-primary/30"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="bot" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Bot className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-44 right-6 z-50 w-80 md:w-96 glass-card rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-primary/20"
            style={{ maxHeight: "min(500px, 80vh)" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-sky-600 p-4 flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-display font-bold text-sm">EliteCare AI Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-white/80 text-xs">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ minHeight: 0 }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] ${msg.role === "user" ? "bg-primary text-white" : "bg-white/10 text-foreground"} rounded-2xl px-4 py-2.5 text-sm leading-relaxed`}>
                    {msg.text}
                    {msg.suggestedActions && msg.role === "ai" && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.suggestedActions.map((action) => (
                          <button
                            key={action}
                            onClick={() => send(action)}
                            className="text-xs bg-white/10 hover:bg-primary/30 text-primary border border-primary/30 rounded-full px-3 py-1 transition-colors"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {mutation.isPending && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl px-4 py-3 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    <span className="text-xs text-muted-foreground">Typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") send(input); }}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm placeholder:text-slate-500 text-foreground outline-none focus:border-primary/50 transition-colors"
              />
              <Button
                onClick={() => send(input)}
                disabled={!input.trim() || mutation.isPending}
                size="icon"
                className="w-9 h-9 rounded-xl bg-primary hover:bg-primary/90 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
