'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Message {
  id: string;
  ticket_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

interface MessageListProps {
  ticketId: string;
  currentUserId: string;
}

export default function MessageList({ ticketId, currentUserId }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });

      if (!error && data) {
        setMessages(data);
      }
      setLoading(false);
    };

    fetchMessages();

    const channel = supabase
      .channel(`ticket_messages_${ticketId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `ticket_id=eq.${ticketId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [ticketId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <span className="w-8 h-8 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-gray-500 pb-10">
          <svg className="w-16 h-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-lg">No messages yet.</p>
          <p className="text-sm opacity-70 mt-1">Start the conversation with your assigned technician.</p>
        </div>
      ) : (
        messages.map((message) => {
          const isCurrentUser = message.sender_id === currentUserId;
          return (
            <div
              key={message.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`max-w-[80%] px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-lg ${
                  isCurrentUser
                    ? 'bg-blue-600 text-white rounded-br-sm shadow-blue-500/20'
                    : 'bg-white/10 text-gray-100 rounded-bl-sm border border-white/10 backdrop-blur-md'
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
                <span className={`text-[10px] mt-2 block font-medium ${isCurrentUser ? 'text-blue-200' : 'text-gray-400'}`}>
                  {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })
      )}
      <div ref={messagesEndRef} className="h-1" />
    </div>
  );
}
