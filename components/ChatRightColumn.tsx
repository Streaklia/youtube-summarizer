'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageSquare, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { ChatMessage } from '@/lib/types';

interface ChatRightColumnProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  loading: boolean;
  onQuickAction?: (actionPrompt: string) => void;
}

const QUICK_ACTIONS = [
  { label: 'Key Quotes', prompt: 'What are the top 3 most important quotes in this video with timestamps?' },
  { label: 'Action Items', prompt: 'List all actionable advice or steps mentioned in this video.' },
  { label: 'Fact Check', prompt: 'Summarize the primary thesis and identify any claims that require verification.' },
];

export function ChatRightColumn({
  messages,
  onSendMessage,
  loading,
  onQuickAction,
}: ChatRightColumnProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSendMessage(input.trim());
    setInput('');
  };

  const handleActionClick = (prompt: string) => {
    if (loading) return;
    if (onQuickAction) {
      onQuickAction(prompt);
    } else {
      onSendMessage(prompt);
    }
  };

  return (
    <div className="glass flex flex-col h-full min-h-[560px] max-h-[820px] overflow-hidden">
      {/* Header */}
      <div className="p-3.5 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-red-500/10">
            <MessageSquare className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-xs sm:text-sm">Chat & Quick Actions</h3>
            <p className="text-[10px] text-gray-500">Ask questions about this video</p>
          </div>
        </div>

        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
          Live AI
        </span>
      </div>

      {/* Quick Action Buttons */}
      <div className="p-2.5 border-b border-white/[0.04] bg-white/[0.01]">
        <div className="flex items-center gap-1.5 mb-1.5 text-[11px] text-gray-400">
          <Zap className="w-3 h-3 text-orange-400" />
          <span className="font-medium text-gray-300">Quick Prompts</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_ACTIONS.map((action, i) => (
            <button
              key={i}
              onClick={() => handleActionClick(action.prompt)}
              disabled={loading}
              className="px-2.5 py-1 text-[11px] text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.1] rounded-lg transition-all whitespace-nowrap disabled:opacity-40"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3 scrollbar-thin">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-3 py-10 text-center px-4">
            <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <Sparkles className="w-6 h-6 text-red-400/80" />
            </div>
            <div>
              <p className="text-gray-300 text-xs font-medium">Ready to discuss this video</p>
              <p className="text-gray-500 text-[11px] mt-1 max-w-[200px]">
                Click a quick prompt above or type any specific question below.
              </p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2.5 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-3 h-3 text-red-400" />
              </div>
            )}
            <div
              className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-br-xs'
                  : 'bg-white/[0.04] text-gray-200 border border-white/[0.06] rounded-bl-xs'
              }`}
            >
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="w-6 h-6 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="w-3 h-3 text-gray-400" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-2.5 items-start">
            <div className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
              <Bot className="w-3 h-3 text-red-400" />
            </div>
            <div className="bg-white/[0.04] border border-white/[0.06] px-3 py-2 rounded-xl rounded-bl-xs">
              <div className="flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="p-2.5 border-t border-white/[0.06] bg-black/40">
        <div className="flex gap-1.5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the video..."
            className="flex-1 px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-500/40 text-xs transition-all"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2.5 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-400 disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-600 text-white rounded-xl transition-all shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
