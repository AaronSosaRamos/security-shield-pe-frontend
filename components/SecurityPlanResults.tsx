import { ExclamationTriangleIcon, BuildingOfficeIcon, ShieldCheckIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid';

type SectionProps = {
    title: string;
    icon: JSX.Element;
    children: React.ReactNode;
};

const Section = ({ title, icon, children }: SectionProps) => (
    <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg mb-6">
        <div className="flex items-center space-x-2 mb-4">
            {icon}
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
        </div>
        {children}
    </div>
);

type SecurityPlanDetailProps = {
    planData: any;
};

const SecurityPlanDetail = ({ planData }: SecurityPlanDetailProps) => {
    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mt-12">
            <h1 className="text-3xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">{planData.name}</h1>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Creación: {planData.creation_date} | Revisión: {planData.revision_date}</p>

            <Section title="Identificación de Riesgos" icon={<ExclamationTriangleIcon className="w-8 h-8 text-red-600" />}>
                {planData.risk_identifications.map((risk: any) => (
                    <div key={risk.risk_id} className="mb-4">
                        <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100">🛑 {risk.description}</h4>
                        <p className="text-gray-600 dark:text-gray-300">Impacto: {risk.impact}</p>
                        <p className="text-gray-600 dark:text-gray-300">Probabilidad: {risk.likelihood}/5</p>
                        <p className="text-gray-600 dark:text-gray-300">Medidas de mitigación: {risk.mitigation_measures}</p>
                    </div>
                ))}
            </Section>

            <Section title="Roles y Responsabilidades" icon={<BuildingOfficeIcon className="w-8 h-8 text-blue-600" />}>
                {planData.roles_and_responsibilities.map((role: any) => (
                    <div key={role.role_id} className="mb-4">
                        <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100">👔 {role.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300">Responsabilidades: {role.responsibilities}</p>
                    </div>
                ))}
            </Section>

            <Section title="Activos" icon={<ShieldCheckIcon className="w-8 h-8 text-green-600" />}>
                {planData.assets.map((asset: any) => (
                    <div key={asset.asset_id} className="mb-4">
                        <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100">🏠 {asset.asset_name}</h4>
                        <p className="text-gray-600 dark:text-gray-300">Tipo: {asset.asset_type}</p>
                        <p className="text-gray-600 dark:text-gray-300">Medidas de protección: {asset.protection_measures}</p>
                        <p className="text-gray-600 dark:text-gray-300">Impacto potencial: {asset.potential_impact}</p>
                    </div>
                ))}
            </Section>

            <Section title="Procedimientos de Respuesta a Incidentes" icon={<ClipboardDocumentCheckIcon className="w-8 h-8 text-yellow-600" />}>
                {planData.incident_response_procedures.map((proc: any) => (
                    <div key={proc.procedure_id} className="mb-4">
                        <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100">📋 {proc.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300">Pasos: {proc.steps}</p>
                        <p className="text-gray-600 dark:text-gray-300">Roles responsables: {proc.responsible_roles}</p>
                        <p className="text-gray-600 dark:text-gray-300">Plan de comunicación: {proc.communication_plan}</p>
                    </div>
                ))}
            </Section>

            <Section title="Plan de Capacitación" icon={<ShieldCheckIcon className="w-8 h-8 text-purple-600" />}>
                {planData.training_plan.map((training: any) => (
                    <div key={training.training_id} className="mb-4">
                        <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100">📚 {training.topic}</h4>
                        <p className="text-gray-600 dark:text-gray-300">Audiencia objetivo: {training.target_audience}</p>
                        <p className="text-gray-600 dark:text-gray-300">Cronograma: {training.schedule}</p>
                        <p className="text-gray-600 dark:text-gray-300">Objetivos: {training.objectives}</p>
                    </div>
                ))}
            </Section>

            <Section title="Políticas de Seguridad" icon={<ClipboardDocumentCheckIcon className="w-8 h-8 text-indigo-600" />}>
                {planData.security_policies.map((policy: any) => (
                    <div key={policy.policy_id} className="mb-4">
                        <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100">📜 {policy.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300">Propósito: {policy.purpose}</p>
                        <p className="text-gray-600 dark:text-gray-300">Alcance: {policy.scope}</p>
                        <p className="text-gray-600 dark:text-gray-300">Aplicación: {policy.enforcement}</p>
                        <p className="text-gray-600 dark:text-gray-300">Revisión: {policy.review_date}</p>
                    </div>
                ))}
            </Section>
        </div>
    );
};

export default SecurityPlanDetail;
