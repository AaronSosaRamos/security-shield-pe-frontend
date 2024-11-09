import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import Layout from '../components/Layout';
import { MapIcon, PencilIcon } from '@heroicons/react/24/outline';
import { ClipboardDocumentCheckIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

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
    console.log("Datos del Plan de Seguridad:", data);
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
      </div>
    </Layout>
  );
};

export default SecurityPlanGenerator;