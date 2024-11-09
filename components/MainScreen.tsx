import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { MapIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
import { ChatBubbleLeftRightIcon, ExclamationCircleIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const Home = () => {
    return (
        <Layout>
            <section className="text-center py-12 bg-gray-700 dark:bg-gray-800 text-white">
                <div className="flex justify-center items-center space-x-3">
                    <h1 className="text-5xl font-bold">Bienvenido a Security Shield PE</h1>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Peru.svg"
                        alt="Bandera de Perú"
                        className="w-10 h-8 rounded-sm"
                    />
                </div>
                <p className="mt-4 text-lg">Tu plataforma integral para la seguridad ciudadana en Perú.</p>
                <p className="mt-1 text-sm text-gray-300">Gestiona, monitorea y colabora para mejorar la seguridad en tu comunidad.</p>
            </section>

            <section id="services" className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                <ServiceCard
                    title="Chatbot de Asesoría"
                    icon={<ChatBubbleLeftRightIcon className="w-10 h-10 text-green-500" />}
                    description="Consulta sobre temas de seguridad en tu comunidad con un asesor virtual alimentado por la API Gemini."
                    buttonText="Usar"
                />
                <ServiceCard
                    title="Plan de Seguridad"
                    icon={<DocumentTextIcon className="w-10 h-10 text-yellow-500" />}
                    description="Elabora planes de acción personalizados y estrategias de seguridad ciudadana."
                    buttonText="Usar"
                />
                <ServiceCard
                    title="Agente de Búsqueda"
                    icon={<GlobeAltIcon className="w-10 h-10 text-red-500" />}
                    description="Accede a información actualizada sobre incidentes y datos de seguridad en tu zona de interés."
                    buttonText="Usar"
                />
                <ServiceCard
                    title="Chat según Zona"
                    icon={<ExclamationCircleIcon className="w-10 h-10 text-purple-500" />}
                    description="Conéctate con usuarios cercanos y emite alertas en tiempo real para mejorar la seguridad."
                    buttonText="Usar"
                />
                <ServiceCard
                    title="Mapa de Geolocalización"
                    icon={<MapIcon className="w-10 h-10 text-indigo-500" />}
                    description="Visualiza un mapa interactivo con incidentes y puntos de interés de seguridad en tu área."
                    buttonText="Usar"
                />
            </section>
        </Layout>
    );
};

type ServiceCardProps = {
    title: string;
    description: string;
    buttonText: string;
    icon: JSX.Element;
};

const ServiceCard = ({ title, description, buttonText, icon }: ServiceCardProps) => (
    <motion.div
        className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md transform transition-all hover:scale-105 flex flex-col justify-between"
        whileHover={{ scale: 1.05 }}
    >
        <div className="flex items-center space-x-3 mb-4">
            {icon}
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        <button className="mt-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
            {buttonText}
        </button>
    </motion.div>
);

export default Home;
