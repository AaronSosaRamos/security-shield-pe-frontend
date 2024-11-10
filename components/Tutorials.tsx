import React from 'react';
import Layout from '../components/Layout';

const tutorials = [
    { title: 'Security Shield PE - Tutorial - Registro e Inicio de Sesión', url: 'https://www.youtube.com/embed/DU0A4Dhl_Ck' },
    { title: 'Security Shield PE - Tutorial - Chatbot', url: 'https://www.youtube.com/embed/d1kDt_G105A' },
    { title: 'Security Shield PE - Tutorial - Plan de Seguridad', url: 'https://www.youtube.com/embed/xHfanf6DO5g' },
    { title: 'Security Shield PE - Tutorial - Agente de Búsqueda de Información', url: 'https://www.youtube.com/embed/rWdd7CShdug' },
    { title: 'Security Shield PE - Tutorial - Chat de Zona', url: 'https://www.youtube.com/embed/ocrWd7LwHiE' },
    { title: 'Security Shield PE - Tutorial - Mapa de Geolocalización', url: 'https://www.youtube.com/embed/oC9o2AAlFd8' },
];

const Tutorials: React.FC = () => {
    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Tutoriales de Security Shield PE</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {tutorials.map((tutorial, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4 text-center">{tutorial.title}</h2>
                            <div className="w-full h-0 pb-[56.25%] relative overflow-hidden rounded-lg">
                                <iframe
                                    src={tutorial.url}
                                    title={tutorial.title}
                                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Tutorials;
