import React from 'react';

type InfoAgentProps = {
    data: any;
};

const InfoAgentResults: React.FC<InfoAgentProps> = ({ data }) => {
    return (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-6">
                Información de Seguridad - {data.district}, {data.province}, {data.department}
            </h2>

            <Section title="Contactos de Emergencia">
                {data.emergency_contacts.map((contact: any, index: number) => (
                    <div key={index} className="mb-4">
                        <h3 className="text-lg font-semibold">📞 {contact.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">Teléfono: {contact.phone_number}</p>
                        <p className="text-gray-600 dark:text-gray-400">Descripción: {contact.description}</p>
                    </div>
                ))}
            </Section>

            <Section title="Botones de Activación de Alarmas">
                {data.alarm_activation_buttons.map((button: any, index: number) => (
                    <div key={index} className="mb-4">
                        <h3 className="text-lg font-semibold">🚨 Ubicación: {button.location}</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Tiempo de Respuesta: {button.response_time} minutos
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Estado: {button.active_status ? "Activo" : "Inactivo"}
                        </p>
                    </div>
                ))}
            </Section>

            <Section title="Canales de Comunicación Vecinal">
                {data.neighborhood_communication_channels.map((channel: any, index: number) => (
                    <div key={index} className="mb-4">
                        <h3 className="text-lg font-semibold">💬 Plataforma: {channel.platform}</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Participantes: {channel.contact_list.join(", ")}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">Descripción: {channel.description}</p>
                    </div>
                ))}
            </Section>

            <Section title="Contactos Clave">
                {data.key_contacts.map((contact: any, index: number) => (
                    <div key={index} className="mb-4">
                        <h3 className="text-lg font-semibold">🔑 Rol: {contact.role}</h3>
                        <p className="text-gray-600 dark:text-gray-400">Nombre: {contact.name}</p>
                        <p className="text-gray-600 dark:text-gray-400">Teléfono: {contact.phone_number}</p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Horario Disponible: {contact.available_hours}
                        </p>
                    </div>
                ))}
            </Section>

            <Section title="Centros de Ayuda">
                {data.help_centers.map((center: any, index: number) => (
                    <div key={index} className="mb-4">
                        <h3 className="text-lg font-semibold">🏥 {center.center_name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">Dirección: {center.address}</p>
                        <p className="text-gray-600 dark:text-gray-400">Teléfono: {center.contact_number}</p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Servicios: {center.services_provided.join(", ")}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">Horario: {center.opening_hours}</p>
                    </div>
                ))}
            </Section>

            <Section title="Información de Seguridad">
                {data.security_information.map((info: any, index: number) => (
                    <div key={index} className="mb-4">
                        <h3 className="text-lg font-semibold">🛡️ {info.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">Descripción: {info.description}</p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Última Actualización: {info.last_updated}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">Relevancia: {info.relevance}</p>
                    </div>
                ))}
            </Section>
        </div>
    );
};

type SectionProps = {
    title: string;
    children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">{title}</h2>
        <div className="space-y-4">{children}</div>
    </div>
);

export default InfoAgentResults;
