"use client";

import { MessageCircle, Send, X, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

type Message = {
  role: "bot" | "user";
  text: string;
  link?: { label: string; href: string };
};

const faqChips = [
  "Who are you?",
  "What do you do?",
  "Where do you work?",
  "What tools do you use?",
  "How can I contact you?",
  "Show me your projects",
];

type KnowledgeEntry = {
  keywords: string[];
  response: string;
  link?: { label: string; href: string };
};

const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: ["who", "about", "name", "darsh", "introduce", "yourself"],
    response:
      "I'm Darsh — a designer and creative director based in Ahmedabad, India. I've spent 7+ years in design and e-commerce, starting as a graphic designer and evolving into an AI workflow builder. I care about taste first, then use systems and code to move faster.",
  },
  {
    keywords: ["what do you do", "work", "job", "role", "profession", "career", "practice"],
    response:
      "I work at the intersection of design, direction, and AI. I build creative systems, AI-powered workflows, and prototype tools. My practice covers brand systems, motion design, prompt engineering, and automation — anything that makes the creative process sharper.",
  },
  {
    keywords: ["where", "work", "company", "urban", "space", "currently", "office", "ahmedabad"],
    response:
      "I'm currently the Creative Director at URBAN SPACE — the furniture brand that appeared on Shark Tank India. Based in Ahmedabad. Before that, I worked at Cossouq.com, an e-commerce brand, also in Ahmedabad.",
  },
  {
    keywords: ["previous", "before", "cossouq", "ecommerce", "e-commerce", "earlier", "past"],
    response:
      "Before URBAN SPACE, I worked at Cossouq.com — an e-commerce brand based in Ahmedabad. That's where I cut my teeth on product design, conversion funnels, and the intersection of design + commerce at scale.",
  },
  {
    keywords: ["tool", "software", "adobe", "figma", "photoshop", "after effects", "premiere", "app"],
    response:
      "I know the full Adobe suite — Photoshop, After Effects, Premiere, Illustrator, InDesign. I also use Figma, ComfyUI, and build custom tools with Python and ExtendScript. Lately I'm deep into AI tools: Whisper, Claude, Stable Diffusion, and building automations around them.",
  },
  {
    keywords: ["ai", "artificial intelligence", "automation", "workflow", "prompt", "model", "llm"],
    response:
      "AI is my leverage layer. I build model chains, prompt systems, creative QA tools, and automations that survive real production work — not demos. Think: AI rough cut assistants, prompt archaeology tools, brand consistency checkers. All open-source on GitHub.",
  },
  {
    keywords: ["contact", "reach", "email", "hire", "collab", "dm", "message", "twitter", "x "],
    response:
      "The fastest way to reach me is on X (Twitter) @Darshd9941. I check DMs there first. Email is coming once MX records are configured.",
    link: { label: "X / Darshd9941", href: "https://x.com/Darshd9941" },
  },
  {
    keywords: ["project", "github", "repo", "code", "open source", "build", "show"],
    response:
      "I have 27+ public repos on GitHub — tools for motion design, AI workflows, brand systems, and creative ops. Scroll down to the Projects section to explore them all, or check my GitHub directly.",
    link: { label: "View Projects", href: "#projects" },
  },
  {
    keywords: ["service", "offer", "help", "hire", "freelance", "agency"],
    response:
      "Three main areas: 1) Creative Systems — brand logic, motion rules, production rituals. 2) AI Workflow Design — model chains, prompts, automations. 3) Prototype Builds — small apps, scripts, dashboards, weird useful tools. If you have a problem worth solving with first principles and modern tech, let's talk.",
  },
  {
    keywords: ["experience", "year", "how long", "background", "started", "begin"],
    response:
      "7+ years in design and e-commerce. Started as a graphic designer, learned the Adobe suite inside out, then slowly upgraded — motion design, then systems thinking, then AI and automation. The throughline: making things that work, not just look good.",
  },
  {
    keywords: ["philosophy", "principle", "belief", "approach", "how", "think"],
    response:
      "Direction before decoration. AI as leverage, not a personality replacement. Make the boring part obedient. Tools should feel like taste with buttons. I solve problems with first principles and the latest tech.",
  },
  {
    keywords: ["mumbai", "delhi", "bangalore", "india", "location", "based"],
    response:
      "I'm based in Ahmedabad, Gujarat, India. Both my current role at URBAN SPACE and previous role at Cossouq.com are Ahmedabad-based.",
  },
  {
    keywords: ["shark", "tank", "urban space", "furniture", "brand"],
    response:
      "URBAN SPACE is the furniture brand that appeared on Shark Tank India. I'm their Creative Director — overseeing brand direction, visual systems, and creative production.",
  },
];

function findResponse(input: string): KnowledgeEntry {
  const lower = input.toLowerCase().trim();

  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch;
  }

  return {
    keywords: [],
    response:
      "I don't have a specific answer for that, but you can reach out to @Darshd9941 on X for anything else!",
    link: { label: "X / Darshd9941", href: "https://x.com/Darshd9941" },
  };
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasGreeted = useRef(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !hasGreeted.current) {
      hasGreeted.current = true;
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            role: "bot",
            text: "Hey! I'm Darsh's digital assistant. Ask me anything about him, or tap a question below.",
          },
        ]);
        setIsTyping(false);
      }, 600);
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = useCallback(
    (text?: string) => {
      const query = (text || input).trim();
      if (!query) return;

      setMessages((prev) => [...prev, { role: "user", text: query }]);
      setInput("");
      setIsTyping(true);

      setTimeout(() => {
        const entry = findResponse(query);
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: entry.response, link: entry.link },
        ]);
        setIsTyping(false);
      }, 500 + Math.random() * 400);
    },
    [input],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  return (
    <>
      {/* Floating chat button */}
      <button
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#6affcc] text-[#06120f] shadow-[0_8px_32px_rgba(106,255,204,0.3)] transition-all hover:scale-105 hover:bg-[#9dffe1] sm:bottom-8 sm:right-8"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-24 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-xl border border-[#f5f0e8]/14 bg-[#0c0c0c] shadow-[0_24px_90px_rgba(0,0,0,0.6)] transition-all duration-300 sm:bottom-28 sm:right-8 ${
          isOpen
            ? "h-[min(520px,70vh)] opacity-100 translate-y-0"
            : "h-0 opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#f5f0e8]/10 bg-[#111] px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-[#f5f0e8]">
              Ask Darsh
            </p>
            <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#6affcc]">
              AI assistant
            </p>
          </div>
          <button
            aria-label="Close chat"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#f5f0e8]/12 text-[#8d867e] transition hover:border-[#ff6a4a] hover:text-[#ff8b70]"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#6affcc] text-[#06120f]"
                    : "border border-[#f5f0e8]/10 bg-[#f5f0e8]/6 text-[#f5f0e8]"
                }`}
              >
                {msg.text}
                {msg.link && (
                  <a
                    className="mt-2 flex items-center gap-1.5 text-xs font-bold text-[#6affcc] transition hover:text-[#9dffe1]"
                    href={msg.link.href}
                    onClick={() => setIsOpen(false)}
                    rel="noreferrer"
                    target={msg.link.href.startsWith("http") ? "_blank" : undefined}
                  >
                    {msg.link.label}
                    <ArrowRight size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-xl border border-[#f5f0e8]/10 bg-[#f5f0e8]/6 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#6affcc] [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#6affcc] [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[#6affcc] [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* FAQ chips — always show after bot responses */}
        {!isTyping && messages.length > 0 && messages[messages.length - 1].role === "bot" && (
          <div className="shrink-0 border-t border-[#f5f0e8]/10 bg-[#0a0a0a] px-4 py-3">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#8d867e]">
              More questions
            </p>
            <div className="flex flex-wrap gap-1.5">
              {faqChips.map((chip) => (
                <button
                  className="rounded-md border border-[#f5f0e8]/12 bg-[#f5f0e8]/5 px-2.5 py-1.5 text-[11px] font-medium text-[#bdb4aa] transition hover:border-[#6affcc]/50 hover:bg-[#6affcc]/10 hover:text-[#6affcc]"
                  key={chip}
                  onClick={() => handleSend(chip)}
                  type="button"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="shrink-0 border-t border-[#f5f0e8]/10 bg-[#111] px-4 py-3">
          <div className="flex items-center gap-2 rounded-lg border border-[#f5f0e8]/12 bg-[#f5f0e8]/5 px-3 py-2 transition focus-within:border-[#6affcc]/50">
            <input
              className="flex-1 bg-transparent text-sm text-[#f5f0e8] outline-none placeholder:text-[#5a5148]"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something about Darsh..."
              ref={inputRef}
              type="text"
              value={input}
            />
            <button
              aria-label="Send message"
              className="flex h-7 w-7 items-center justify-center rounded-md bg-[#6affcc] text-[#06120f] transition hover:bg-[#9dffe1] disabled:opacity-40"
              disabled={!input.trim()}
              onClick={() => handleSend()}
              type="button"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
