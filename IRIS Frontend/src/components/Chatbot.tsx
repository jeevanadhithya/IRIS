import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Bot,
  User,
  MessageSquare,
  X,
} from "lucide-react";
import { sendMessageToGemini, Message } from "@/lib/gemini-api";
import { nanoid } from "nanoid";

const WELCOME_MESSAGE = `Hello! I'm your GeoSense AI assistant 🌍

I can help you with:

• Disaster predictions and monitoring
• Emergency response guidance
• System features & dashboards
• Sensor networks and alerts
• Reports and analytics

Ask me anything about GeoSense!`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nanoid(),
      role: "model",
      content: WELCOME_MESSAGE,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: nanoid(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(inputMessage);

      const botMessage: Message = {
        id: nanoid(),
        role: "model",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        id: nanoid(),
        role: "model",
        content:
          error.message === "GEMINI_API_ERROR"
            ? "⚠️ AI service is temporarily unavailable. Please try again."
            : "⚠️ Something went wrong. Please retry.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed bottom-6 right-6 z-[100]">
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center"
          >
            <MessageSquare />
          </motion.button>
        )}
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 right-6 z-[100] w-full max-w-md h-[70vh]"
          >
            <div className="bg-card border rounded-xl shadow-xl flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center gap-2">
                  <Bot className="text-primary" />
                  <span className="font-semibold">GeoSense Assistant</span>
                </div>
                <Button size="icon" variant="ghost" onClick={() => setIsOpen(false)}>
                  <X />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl px-4 py-2 ${
                        msg.role === "user"
                          ? "bg-primary text-white"
                          : "bg-secondary"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Bot className="animate-pulse" />
                    Thinking...
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about GeoSense..."
                  disabled={isLoading}
                />
                <Button onClick={handleSendMessage} disabled={isLoading}>
                  <Send />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
