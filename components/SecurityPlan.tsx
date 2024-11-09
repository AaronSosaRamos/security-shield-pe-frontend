import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Layout from '../components/Layout';
import { MapIcon, PencilIcon } from '@heroicons/react/24/outline';
import { ClipboardDocumentCheckIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import SecurityPlanDetail from './SecurityPlanResults';

type PlanFormInputs = {
    department: string;
    province: string;
    district: string;
    mainTopic: string;
    additionalDescription: string;
};

const SecurityPlanGenerator = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<PlanFormInputs>();
    const [isLoading, setIsLoading] = useState(true);
    const [submittedData, setSubmittedData] = useState<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedToken = localStorage.getItem('token');
            if (savedToken) {
                const decodedToken: any = jwtDecode(savedToken);

                setValue('department', decodedToken.department || '');
                setValue('province', decodedToken.province || '');
                setValue('district', decodedToken.district || '');
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        }
    }, [setValue]);

    const onSubmit = (data: PlanFormInputs) => {
        const mockResponse = {
            plan_id: "SJT-2024",
            name: "Plan de Seguridad Integral para San Jerónimo de Tunán 2024: Integridad Personal ante Robos",
            creation_date: "2024-10-27",
            revision_date: "2025-10-27",
            risk_identifications: [
                {
                    risk_id: "R1",
                    description: "Robo a personas en la vía pública, especialmente en zonas con poca iluminación y baja afluencia de personas durante la noche.",
                    impact: "Alto (pérdida de bienes, lesiones físicas, trauma psicológico)",
                    likelihood: 4,
                    mitigation_measures: "Mejorar la iluminación pública, aumentar la presencia policial, fomentar la organización vecinal para vigilancia comunitaria."
                },
                {
                    risk_id: "R2",
                    description: "Robos en viviendas, principalmente durante la ausencia de los residentes.",
                    impact: "Medio (pérdida de bienes, sensación de inseguridad)",
                    likelihood: 3,
                    mitigation_measures: "Promover la instalación de sistemas de alarma, fortalecer la comunicación entre vecinos, campañas de concientización sobre seguridad en el hogar."
                },
                {
                    risk_id: "R3",
                    description: "Arrebato de celulares y carteras en lugares concurridos como mercados y paraderos de transporte público.",
                    impact: "Bajo (pérdida de bienes)",
                    likelihood: 5,
                    mitigation_measures: "Incrementar la presencia policial en zonas de alta concurrencia, campañas de sensibilización a la población sobre medidas de autoprotección, instalación de cámaras de vigilancia."
                }
            ],
            roles_and_responsibilities: [
                {
                    role_id: "ROL1",
                    title: "Municipalidad Distrital de San Jerónimo de Tunán",
                    responsibilities: "Coordinar e implementar el plan, gestionar recursos, promover la participación ciudadana, mantener la infraestructura de seguridad (iluminación, cámaras)."
                },
                {
                    role_id: "ROL2",
                    title: "Comisaría de San Jerónimo de Tunán",
                    responsibilities: "Patrullaje preventivo, respuesta a incidentes, investigación de delitos, trabajo conjunto con la comunidad en programas de seguridad ciudadana."
                },
                {
                    role_id: "ROL3",
                    title: "Juntas Vecinales",
                    responsibilities: "Organizar rondas de vigilancia, participar en programas de capacitación en seguridad, comunicación constante con la policía y la municipalidad."
                }
            ],
            assets: [
                {
                    asset_id: "A1",
                    asset_name: "Residentes de San Jerónimo de Tunán",
                    asset_type: "Humano",
                    protection_measures: "Capacitación en seguridad, promoción de la cultura de denuncia.",
                    potential_impact: "Lesiones físicas, pérdidas económicas, trauma psicológico."
                },
                {
                    asset_id: "A2",
                    asset_name: "Viviendas",
                    asset_type: "Físico",
                    protection_measures: "Sistemas de alarma, rejas de seguridad.",
                    potential_impact: "Pérdida de bienes, daños a la propiedad."
                }
            ],
            incident_response_procedures: [
                {
                    procedure_id: "IRP1",
                    title: "Respuesta a Robos",
                    steps: "Llamar a la policía, brindar la mayor cantidad de información posible, no tocar la escena del crimen, presentar la denuncia.",
                    responsible_roles: "Comisaría de San Jerónimo de Tunán",
                    communication_plan: "Comunicación directa con la víctima, reportes a la municipalidad."
                }
            ],
            training_plan: [
                {
                    training_id: "T1",
                    topic: "Prevención de Robos",
                    target_audience: "Residentes de San Jerónimo de Tunán",
                    schedule: "Trimestral",
                    objectives: "Concientizar sobre medidas de seguridad, fomentar la participación ciudadana en la prevención del delito."
                }
            ],
            security_policies: [
                {
                    policy_id: "SP1",
                    title: "Política de Seguridad Ciudadana",
                    purpose: "Establecer lineamientos para la prevención y atención de la delincuencia.",
                    scope: "Distrito de San Jerónimo de Tunán",
                    enforcement: "Monitoreo por parte de la municipalidad, evaluación periódica del plan.",
                    review_date: "Anual"
                }
            ]
        };
        setSubmittedData(mockResponse);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
            </div>
        );
    }

    return (
        <Layout>
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mt-12">
                <div className="text-center mb-6">
                    <ShieldCheckIcon className="w-12 h-12 text-blue-600 inline-block" />
                    <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200">
                        Generador de Plan de Seguridad 🛡️
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">Completa los detalles de tu plan de seguridad para tu comunidad.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex items-center space-x-2">
                        <MapIcon className="w-6 h-6 text-green-500" />
                        <label htmlFor="department" className="text-lg font-medium text-gray-700 dark:text-gray-300">Departamento</label>
                    </div>
                    <input
                        type="text"
                        id="department"
                        {...register("department", { required: "El campo Departamento es obligatorio" })}
                        className="mt-1 p-3 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ejemplo: Lima"
                    />
                    {errors.department && <p className="text-sm text-red-500">{errors.department.message}</p>}

                    <div className="flex items-center space-x-2 mt-6">
                        <MapIcon className="w-6 h-6 text-yellow-500" />
                        <label htmlFor="province" className="text-lg font-medium text-gray-700 dark:text-gray-300">Provincia</label>
                    </div>
                    <input
                        type="text"
                        id="province"
                        {...register("province", { required: "El campo Provincia es obligatorio" })}
                        className="mt-1 p-3 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ejemplo: Lima"
                    />
                    {errors.province && <p className="text-sm text-red-500">{errors.province.message}</p>}

                    <div className="flex items-center space-x-2 mt-6">
                        <MapIcon className="w-6 h-6 text-purple-500" />
                        <label htmlFor="district" className="text-lg font-medium text-gray-700 dark:text-gray-300">Distrito</label>
                    </div>
                    <input
                        type="text"
                        id="district"
                        {...register("district", { required: "El campo Distrito es obligatorio" })}
                        className="mt-1 p-3 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ejemplo: Miraflores"
                    />
                    {errors.district && <p className="text-sm text-red-500">{errors.district.message}</p>}

                    <div className="flex items-center space-x-2 mt-6">
                        <ClipboardDocumentCheckIcon className="w-6 h-6 text-blue-500" />
                        <label htmlFor="mainTopic" className="text-lg font-medium text-gray-700 dark:text-gray-300">Tema Principal</label>
                    </div>
                    <input
                        type="text"
                        id="mainTopic"
                        {...register("mainTopic", { required: "El campo Tema Principal es obligatorio" })}
                        className="mt-1 p-3 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ejemplo: Seguridad en la comunidad"
                    />
                    {errors.mainTopic && <p className="text-sm text-red-500">{errors.mainTopic.message}</p>}

                    <div className="flex items-center space-x-2 mt-6">
                        <PencilIcon className="w-6 h-6 text-blue-500" />
                        <label htmlFor="additionalDescription" className="text-lg font-medium text-gray-700 dark:text-gray-300">Descripción Adicional</label>
                    </div>
                    <textarea
                        id="additionalDescription"
                        {...register("additionalDescription", { required: "La Descripción Adicional es obligatoria" })}
                        className="mt-1 p-3 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Agrega detalles adicionales sobre el plan de seguridad"
                        rows={4}
                    ></textarea>
                    {errors.additionalDescription && <p className="text-sm text-red-500">{errors.additionalDescription.message}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 mt-6 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition duration-200"
                    >
                        🚀 Generar Plan de Seguridad
                    </button>
                </form>

                {submittedData && (
                    <div className="mt-10 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200">Plan Generado:</h3>
                        <SecurityPlanDetail planData={submittedData}  />
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default SecurityPlanGenerator;
