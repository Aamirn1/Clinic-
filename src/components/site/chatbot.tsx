"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  CalendarCheck,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { business } from "@/lib/data";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "How often should I get an eye exam?",
  "What services do you offer?",
  "Do you fit contact lenses?",
  "I have dry eyes, what should I do?",
];

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Hi there! 👋 I'm the Islamabad Optical & Clinic assistant. I can help with eye-care questions, explain our services, or guide you to book an appointment. How can I help you today?",
};

export function Chatbot() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Msg[]>([WELCOME]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [session, setSession] = React.useState<string>("");
  const [unread, setUnread] = React.useState(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (open) setUnread(false);
  }, [open]);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
          session,
        }),
      });
      const data = await res.json();
      if (session === "" && data.session) setSession(data.session);
      const reply: Msg = {
        role: "assistant",
        content: data.reply || "Sorry, I didn't catch that. Could you rephrase?",
      };
      setMessages((m) => [...m, reply]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please call us at " +
            business.phone +
            " or book an appointment online.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <div className="fixed bottom-5 right-4 z-50 sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {!open && (
            <motion.button
              key="launcher"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => setOpen(true)}
              aria-label="Open chat assistant"
              className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-emerald-700 text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:scale-105"
            >
              <span className="absolute inset-0 animate-pulse-ring rounded-full" />
              <MessageCircle className="h-6 w-6" />
              {unread && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground ring-2 ring-background">
                  1
                </span>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-4 right-4 z-50 flex h-[85vh] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl sm:bottom-6 sm:right-6 sm:h-[600px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 bg-gradient-to-br from-primary to-emerald-800 p-4 text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/15">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-primary bg-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">Vision Assistant</p>
                  <p className="flex items-center gap-1 text-[11px] text-primary-foreground/80">
                    <Sparkles className="h-3 w-3" /> AI-powered · online
                  </p>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setOpen(false)}
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/15"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="custom-scrollbar flex-1 space-y-4 overflow-y-auto bg-muted/30 p-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-end gap-2",
                    m.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {m.role === "assistant" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
                      m.role === "user"
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm bg-card text-card-foreground"
                    )}
                  >
                    {m.content}
                  </div>
                  {m.role === "user" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-end gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-card px-4 py-3 shadow-sm">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quick suggestions (only at start) */}
              {messages.length === 1 && !loading && (
                <div className="space-y-2 pt-2">
                  <p className="px-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Quick questions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div className="flex gap-2 border-t border-border/60 bg-card px-3 py-2">
              <a href="#booking" onClick={() => setOpen(false)} className="flex-1">
                <Button size="sm" variant="outline" className="w-full gap-1.5">
                  <CalendarCheck className="h-3.5 w-3.5" /> Book
                </Button>
              </a>
              <a href={`tel:${business.phoneRaw}`} className="flex-1">
                <Button size="sm" variant="outline" className="w-full gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> Call
                </Button>
              </a>
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border/60 bg-card p-3"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={loading}
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                disabled={loading || !input.trim()}
                className="h-10 w-10 shrink-0 bg-primary hover:bg-primary/90"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
