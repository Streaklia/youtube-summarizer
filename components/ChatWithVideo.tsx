'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Loader2, Bot, User } from 'lucide-react';
import { ChatMessage } from '@/lib/types';

interface ChatWithVideoProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  loading: boolean;
}

export function ChatWithVideo({
  messages,
  onSendMessage,
  loading,
}: ChatWithVideoProps) {
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

  return (
    <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-red-400" />
        <h3 className="font-semibold text-white">💬 Chat with Video</h3>
        <span className="text-sm text-gray-400 ml-2">
          Ask questions about the video content
        </span>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm">
            Ask a question about the video to get started...
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-red-400" />
              </div>
            )}
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-200'
              }`}
            >
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-gray-300" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 items-center">
            <div className="w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-red-400" />
            </div>
            <div className="bg-gray-800 px-4 py-2.5 rounded-xl">
              <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the video..."
            className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
