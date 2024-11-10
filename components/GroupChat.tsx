import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '@/utils/axiosInstance';
import slugify from 'slugify';

interface Message {
    id: string;
    user: string;
    text: string;
    alert: boolean;
    isCurrentUser: boolean;
    order: number;
}

const GroupChat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>('');
    const [userName, setUserName] = useState<string>('Anónimo');
    const [chatTitle, setChatTitle] = useState<string>('Chat Grupal');
    const [token, setToken] = useState<string | null>(null);
    const [districtSlug, setDistrictSlug] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedToken = window.localStorage.getItem('token');
            setToken(savedToken);
            if (savedToken) {
                const decodedToken: any = jwtDecode(savedToken);
                setUserName(`${decodedToken.first_name} ${decodedToken.last_name}`);
                const department = decodedToken.department || 'Desconocido';
                const province = decodedToken.province || 'Desconocido';
                const district = decodedToken.district || 'Desconocido';
                const slug = slugify(district, { lower: true });
                setDistrictSlug(slug);
                setChatTitle(`Chat Grupal: ${department} - ${province} - ${district}`);
                fetchMessages(slug);
            }
        }
    }, []);

    const fetchMessages = async (slug: string) => {
        try {
            const response = await axiosInstance.get(`/messages/${slug}`);
            const loadedMessages = response.data.data.map((msg: any) => ({
                id: msg.uuid,
                user: msg.fullname,
                text: msg.message_content,
                alert: msg.is_alert,
                isCurrentUser: msg.fullname === userName,
                order: msg.order,
            }));
            setMessages(loadedMessages);
        } catch (error) {
            console.error("Error al obtener mensajes:", error);
        }
    };

    const saveMessage = async (msg: string, isAlert: boolean = false) => {
        const newMessage = {
            department: chatTitle.split(': ')[1].split(' - ')[0],
            province: chatTitle.split(' - ')[1],
            district: districtSlug,
            fullname: userName,
            message_content: msg,
            is_alert: isAlert,
            order: messages.length + 1,
        };

        try {
            const response = await axiosInstance.post('/messages', newMessage);
            const savedMessage = response.data.data;

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: savedMessage.uuid,
                    user: userName,
                    text: msg,
                    alert: isAlert,
                    isCurrentUser: true,
                    order: savedMessage.order,
                },
            ]);
        } catch (error) {
            console.error("Error al guardar mensaje:", error);
        }
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            saveMessage(message);
            setMessage('');
        }
    };

    const handleAlert = () => {
        saveMessage('⚠️ ALERTA ROJA ⚠️', true);
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <Layout>
            <div className="max-w-full sm:max-w-2xl mx-auto bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mt-8">
                <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-700 dark:text-gray-200 mb-4 sm:mb-6">{chatTitle}</h2>
                
                <div className="border rounded-lg p-2 sm:p-4 h-64 sm:h-80 md:h-96 overflow-y-scroll bg-gray-100 dark:bg-gray-700">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`p-2 mb-2 rounded-lg max-w-full sm:max-w-md lg:max-w-lg ${
                                msg.alert
                                    ? 'bg-red-500 text-white animate-pulse'
                                    : msg.isCurrentUser
                                    ? 'bg-blue-200 text-gray-800 dark:bg-blue-600 dark:text-white self-end'
                                    : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white'
                            } ${msg.isCurrentUser ? 'ml-auto' : 'mr-auto'} break-words`}
                        >
                            <p className="font-semibold text-sm sm:text-base">{msg.user}</p>
                            <p className="text-xs sm:text-sm">{msg.text}</p>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="flex flex-col sm:flex-row items-center mt-4 sm:space-x-2">
                    <input
                        type="text"
                        placeholder="Escribe tu mensaje..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-grow p-2 border rounded-lg mb-2 sm:mb-0 dark:bg-gray-600 dark:border-gray-500 dark:text-white w-full"
                    />
                    <button
                        type="submit"
                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 mb-2 sm:mb-0"
                    >
                        Enviar
                    </button>
                    <button
                        type="button"
                        onClick={handleAlert}
                        className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 animate-pulse"
                    >
                        ALERTA
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default GroupChat;
