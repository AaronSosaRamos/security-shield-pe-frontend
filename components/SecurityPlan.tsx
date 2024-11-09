import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import Layout from '../components/Layout';

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
        <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-gray-200 mb-6">
          Generador de Plan de Seguridad
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Departamento</label>
            <input
              type="text"
              id="department"
              {...register("department", { required: "El campo Departamento es obligatorio" })}
              className="mt-1 p-3 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa el departamento"
            />
            {errors.department && <p className="mt-2 text-sm text-red-500">{errors.department.message}</p>}
          </div>

          <div>
            <label htmlFor="province" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Provincia</label>
            <input
              type="text"
              id="province"
              {...register("province", { required: "El campo Provincia es obligatorio" })}
              className="mt-1 p-3 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa la provincia"
            />
            {errors.province && <p className="mt-2 text-sm text-red-500">{errors.province.message}</p>}
          </div>

          <div>
            <label htmlFor="district" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Distrito</label>
            <input
              type="text"
              id="district"
              {...register("district", { required: "El campo Distrito es obligatorio" })}
              className="mt-1 p-3 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa el distrito"
            />
            {errors.district && <p className="mt-2 text-sm text-red-500">{errors.district.message}</p>}
          </div>

          <div>
            <label htmlFor="mainTopic" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tema Principal</label>
            <input
              type="text"
              id="mainTopic"
              {...register("mainTopic", { required: "El campo Tema Principal es obligatorio" })}
              className="mt-1 p-3 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa el tema principal"
            />
            {errors.mainTopic && <p className="mt-2 text-sm text-red-500">{errors.mainTopic.message}</p>}
          </div>

          <div>
            <label htmlFor="additionalDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción Adicional</label>
            <textarea
              id="additionalDescription"
              {...register("additionalDescription", { required: "La Descripción Adicional es obligatoria" })}
              className="mt-1 p-3 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Agrega detalles adicionales"
              rows={4}
            ></textarea>
            {errors.additionalDescription && <p className="mt-2 text-sm text-red-500">{errors.additionalDescription.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition duration-200"
          >
            Generar Plan de Seguridad
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SecurityPlanGenerator;
