import { useState } from 'react';
import { ChatBubbleBottomCenterIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import Layout from './Layout';

const Chatbot = () => {
  const [messages, setMessages] = useState([{ text: "👋 ¡Hola! Soy tu asesor de seguridad ciudadana. ¿En qué puedo ayudarte?", from: "bot" }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { text: input, from: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const botResponse = { text: "🔒 Esta es una respuesta simulada sobre seguridad ciudadana. ¿Te gustaría saber más?", from: "bot" };
      setMessages((prev) => [...prev, botResponse]);
      setLoading(false);
    }, 2000);
  };

  return (
    <Layout>
      <section className="p-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl mx-auto mt-12 transition-all">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl font-extrabold text-gray-700 dark:text-gray-200 flex justify-center items-center space-x-3">
            <ChatBubbleBottomCenterIcon className="w-8 h-8 text-blue-600" />
            <span>Chatbot de Asesoría 🛡️</span>
          </h2>
        </motion.div>

        <div className="h-96 overflow-y-auto bg-white dark:bg-gray-700 p-6 rounded-lg mb-6 shadow-inner transition-all duration-300 ease-in-out">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: msg.from === "bot" ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`flex ${msg.from === "bot" ? "justify-start" : "justify-end"} mb-3`}
            >
              <div
                className={`px-5 py-3 rounded-lg ${
                  msg.from === "bot" 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white"
                } shadow-md max-w-[75%] sm:max-w-xs lg:max-w-md`}
                style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, yoyo: Infinity }}
              className="flex justify-start mb-2"
            >
              <div
                className="px-5 py-3 rounded-lg bg-blue-500 text-white shadow-md max-w-[75%] sm:max-w-xs lg:max-w-md"
                style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
              >
                Escribiendo<span className="animate-pulse">...</span>
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Enviar mensaje"
          >
            <PaperAirplaneIcon className="w-5 h-5 transform rotate-45" />
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Chatbot;
