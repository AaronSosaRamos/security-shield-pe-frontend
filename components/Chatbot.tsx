'use client';

import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiSend } from 'react-icons/fi';
import Layout from './Layout';
import { jwtDecode } from 'jwt-decode';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      type: 'text',
      payload: { text: '👋 ¡Hola! Soy tu asesor de seguridad ciudadana. ¿En qué puedo ayudarte?' },
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = window.localStorage.getItem('token');
      setToken(savedToken);
      if (savedToken) {
        const decodedToken: any = jwtDecode(savedToken);
        setUserId(decodedToken.user_id)
        setUserName(`${decodedToken.first_name} ${decodedToken.last_name}`);
        setUserEmail(decodedToken.email);
      }
    }
  }, []);

  const user = {
    id: userId,
    fullName: userName,
    email: userEmail,
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: 'human',
      type: 'text',
      payload: { text: input.trim() },
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsSending(true);

    try {

      const response = await axiosInstance.post('/chat', {
        user, 
        type: 'chat',
        messages: [...messages, userMessage].slice(-6),  
      });

      const botResponse = response.data.data[0];
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'ai',
          type: 'text',
          payload: { text: botResponse.payload.text },
        },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'ai', type: 'text', payload: { text: '⚠️ Hubo un error procesando tu mensaje. Intenta nuevamente.' } },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-purple-700 to-blue-700 p-6">
            <h1 className="text-3xl font-bold text-white">Asesor de Seguridad Ciudadana</h1>
            <p className="text-white mt-1">Tu asistente para consultas de seguridad ciudadana.</p>
          </div>

          <div id="chat-container" className="flex-1 overflow-y-auto p-4" style={{ maxHeight: '65vh' }}>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex ${msg.role === 'human' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div
                  className={`max-w-xs md:max-w-md p-3 rounded-lg shadow ${
                    msg.role === 'human' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.payload.text}</ReactMarkdown>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="border-t p-4 flex items-center space-x-4 bg-white">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              disabled={isSending}
            />
            <button
              onClick={handleSendMessage}
              className={`bg-blue-500 p-3 rounded-full text-white shadow-md hover:bg-blue-600 transition ${
                isSending && 'opacity-50 cursor-not-allowed'
              }`}
              disabled={isSending}
              aria-label="Enviar mensaje"
            >
              <FiSend className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chatbot;
