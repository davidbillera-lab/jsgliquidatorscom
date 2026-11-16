import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { MessageCircleQuestion, RotateCcw, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";

const STORAGE_KEY = "ask_jsg_chat_v1";
const SUGGESTIONS = [
  "How does your 35% auction commission work?",
  "How much does an estate cleanout cost?",
  "Do you serve my city?",
];

function loadMessages(): UIMessage[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function ChatPanel({ onClose }: { onClose: () => void }) {
  const [initial] = useState(loadMessages);
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { messages, sendMessage, status, stop, setMessages } = useChat({
    id: "ask-jsg",
    messages: initial,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (err) => {
      const msg = err.message || "";
      if (msg.includes("429")) toast.error("Ask JSG is busy right now. Please try again in a moment.");
      else toast.error("Ask JSG couldn't answer. Please call David at (805) 444-4069.");
    },
  });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (status === "streaming") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* storage full or blocked */
    }
  }, [messages, status]);

  useEffect(() => {
    if (!busy) textareaRef.current?.focus();
  }, [busy]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    window.__lovableEvents?.track?.(messages.length === 0 ? "project.ask_jsg_conversation_started" : "project.ask_jsg_message_sent", {
      suggested: SUGGESTIONS.includes(t),
    });
    sendMessage({ text: t });
    setInput("");
  };

  return (
    <div
      role="dialog"
      aria-label="Ask JSG chat"
      onClickCapture={(e) => {
        const a = (e.target as HTMLElement).closest("a");
        const href = a?.getAttribute("href") ?? "";
        const linkType = href.startsWith("tel:") ? "phone" : href.includes("/contact") ? "contact_form" : null;
        if (!linkType) return;
        window.__lovableEvents?.track?.("project.ask_jsg_consultation_click", { link_type: linkType });
        try {
          window.sessionStorage.setItem("ask_jsg_referred", "1");
        } catch {
          /* blocked */
        }
      }}
      className="fixed inset-x-2 bottom-2 z-[60] flex h-[min(600px,calc(100dvh-1rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[400px]"
    >
      <div className="flex items-center justify-between gap-2 bg-primary px-4 py-3 text-primary-foreground">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary-foreground font-bold text-primary text-xs">JSG</span>
          <div>
            <p className="font-semibold leading-tight">Ask JSG</p>
            <p className="text-xs opacity-80">Estate sale & cleanout answers</p>
          </div>
        </div>
        <div className="flex items-center">
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Start over"
              className="text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
              onClick={() => {
                stop();
                setMessages([]);
              }}
            >
              <RotateCcw className="size-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close chat"
            className="text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
            onClick={onClose}
          >
            <X className="size-5" />
          </Button>
        </div>
      </div>

      <Conversation className="flex-1">
        <ConversationContent className="gap-4 p-4">
          {messages.length === 0 && (
            <div className="space-y-3 text-sm">
              <p className="text-foreground">
                Hi! I'm Ask JSG. Ask me anything about estate sales, auctions, consignment or cleanouts in the Denver area.
              </p>
              <div className="flex flex-col gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-lg border border-border px-3 py-2 text-left text-foreground hover:bg-muted"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m) => (
            <Message key={m.id} from={m.role}>
              <MessageContent
                className={
                  m.role === "user"
                    ? "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground"
                    : "bg-transparent p-0 text-foreground"
                }
              >
                {m.parts.map((p, i) =>
                  p.type === "text" ? (
                    m.role === "assistant" ? (
                      <MessageResponse key={i}>{p.text}</MessageResponse>
                    ) : (
                      <p key={i} className="whitespace-pre-wrap">{p.text}</p>
                    )
                  ) : null,
                )}
              </MessageContent>
            </Message>
          ))}
          {status === "submitted" && <Shimmer className="text-sm">Thinking...</Shimmer>}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-border p-3">
        <PromptInput onSubmit={({ text }) => send(text)}>
          <PromptInputTextarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="min-h-10"
          />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} onStop={stop} disabled={!busy && !input.trim()} />
          </PromptInputFooter>
        </PromptInput>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Prefer to talk? Call David at <a className="underline" href="tel:+18054444069">(805) 444-4069</a>
        </p>
      </div>
    </div>
  );
}

export default function AskJsgChat() {
  const [open, setOpen] = useState(false);
  return open ? (
    <ChatPanel onClose={() => setOpen(false)} />
  ) : (
    <Button
      onClick={() => {
        setOpen(true);
        window.__lovableEvents?.track?.("project.ask_jsg_opened", {});
      }}
      className="fixed right-4 bottom-4 z-[60] h-12 gap-2 rounded-full px-5 shadow-xl sm:right-5 sm:bottom-5"
      aria-label="Open Ask JSG chat"
    >
      <MessageCircleQuestion className="size-5" />
      Ask JSG
    </Button>
  );
}
