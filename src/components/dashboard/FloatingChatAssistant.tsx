import { useState } from "react";
import { MessageCircle, X, Send, Sparkles, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm SmartAdvisor, your AI-powered category management assistant. How can I help you today?",
    timestamp: new Date(),
  },
];

const suggestedQuestions = [
  "What's driving margin erosion this week?",
  "Which SKUs should I consider for markdown?",
  "Show me top performing products",
  "What are the key risks to monitor?",
];

export function FloatingChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("margin")) {
      return "Based on current data, margin erosion is primarily driven by promotional overlap in Sports Drinks (-2.3pp) and competitive pricing pressure. I recommend reviewing the promo calendar and considering price adjustments on 3 key SKUs.";
    }
    if (lowerQuery.includes("markdown")) {
      return "I've identified 5 SKUs with >8 weeks stock cover that are candidates for markdown: ED-030, SD-078, FW-015, ED-022, and SD-043. Would you like me to create a markdown simulation?";
    }
    if (lowerQuery.includes("top") || lowerQuery.includes("performing")) {
      return "Top 5 SKUs by revenue contribution this period: 1) Red Bull 250ml (+12% vs LY), 2) Monster Energy 500ml (+8%), 3) Lucozade Sport 500ml (+6%), 4) Boost Original 250ml (+15%), 5) Tropical Blast 330ml (new launch, strong adoption).";
    }
    if (lowerQuery.includes("risk")) {
      return "Key risks to monitor: 1) Overstock on 5 SKUs (potential wastage £42K), 2) OOS risk on Spring Water 1L (1.2 wks cover), 3) Competitor X price undercut by 5% in Energy Drinks. I recommend running a buying optimization simulation.";
    }
    
    return "I can help you analyze category performance, identify opportunities, and recommend actions. Try asking about margin trends, markdown candidates, top performers, or key risks.";
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-auto py-3 px-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50 gap-2"
      >
        <Sparkles className="w-5 h-5" />
        <span className="font-medium">SmartAdvisor</span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse" />
      </Button>
    );
  }

  return (
    <Card
      className={cn(
        "fixed bottom-6 right-6 w-96 shadow-2xl z-50 transition-all duration-200",
        isMinimized ? "h-14" : "h-[500px]"
      )}
    >
      <CardHeader className="pb-2 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            SmartAdvisor
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[calc(100%-56px)]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-75" />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce delay-150" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {messages.length === 1 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs text-muted-foreground">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      className="text-xs h-auto py-1.5 px-2"
                      onClick={() => handleQuestionClick(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>

          <div className="p-3 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask SmartAdvisor..."
                className="flex-1 h-9 text-sm"
              />
              <Button type="submit" size="icon" className="h-9 w-9" disabled={!input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
