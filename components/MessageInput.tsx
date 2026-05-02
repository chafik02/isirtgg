'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface MessageInputProps {
  ticketId: string;
  currentUserId: string;
}

export default function MessageInput({ ticketId, currentUserId }: MessageInputProps) {
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || isSending) return;

    setIsSending(true);

    const { error } = await supabase.from('messages').insert({
      ticket_id: ticketId,
      sender_id: currentUserId,
      content: content.trim(),
    });

    if (!error) {
      setContent('');
    } else {
      console.error('Failed to send message:', error);
    }

    setIsSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <form onSubmit={handleSend} className="flex items-end gap-4 relative">
      <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl overflow-hidden focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all shadow-inner">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here... (Press Enter to send)"
          className="w-full bg-transparent text-white px-5 py-4 max-h-40 min-h-[60px] resize-none focus:outline-none placeholder:text-gray-600 text-[15px] leading-relaxed scrollbar-thin scrollbar-thumb-white/10"
          rows={1}
          disabled={isSending}
        />
      </div>
      <button
        type="submit"
        disabled={!content.trim() || isSending}
        className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:bg-white/5 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border disabled:border-white/5 text-white px-8 py-0 rounded-2xl font-bold transition-all h-[60px] flex items-center justify-center min-w-[120px] shadow-lg shadow-blue-500/20 disabled:shadow-none"
      >
        {isSending ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <span>Send</span>
            <svg className="w-4 h-4 translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </span>
        )}
      </button>
    </form>
  );
}
