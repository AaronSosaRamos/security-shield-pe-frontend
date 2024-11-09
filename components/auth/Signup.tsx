import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import Layout from '../Layout';

const signupSchema = z
    .object({
        dni: z.string().length(8, "El DNI debe tener 8 dígitos."),
        firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
        lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres."),
        phone: z.string().length(9, "El número telefónico debe tener 9 dígitos."),
        email: z.string().email("Por favor, ingresa un email válido."),
        password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres.")
            .regex(/[A-Z]/, "Debe incluir al menos una letra mayúscula.")
            .regex(/[a-z]/, "Debe incluir al menos una letra minúscula.")
            .regex(/\d/, "Debe incluir al menos un número.")
            .regex(/[^A-Za-z0-9]/, "Debe incluir al menos un carácter especial."),
        confirmPassword: z.string(),
        department: z.string().min(1, "Por favor selecciona un departamento."),
        province: z.string().min(1, "Por favor selecciona una provincia."),
        district: z.string().min(1, "Por favor selecciona un distrito."),
        addressLine1: z.string().min(5, "La dirección debe tener al menos 5 caracteres."),
        birthDate: z.string().refine((val) => {
            const birthDate = new Date(val);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            return age >= 18;
        }, "Debes ser mayor de 18 años."),
        termsAccepted: z.literal(true, {
            errorMap: () => ({ message: "Debes aceptar el envío de tus datos personales." }),
        }),
        ipSignup: z.string().optional(),
        signupDate: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden.",
        path: ["confirmPassword"],
    });

type SignupFormInputs = z.infer<typeof signupSchema>;

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            ipSignup: "",
            signupDate: new Date().toISOString(),
        },
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = (data: SignupFormInputs) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            console.log("Datos registrados:", data);
        }, 2000);
    };

    return (
        <Layout>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-10 max-w-3xl w-full"
                >
                    <div className="flex items-center justify-center mb-8 space-x-3">
                        <ShieldCheckIcon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 dark:text-gray-200 flex items-center">
                            Crear una cuenta
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">DNI</label>
                                <input type="text" {...register("dni")} className="input-large" placeholder="Ingresa tu DNI" />
                                {errors.dni && <p className="text-red-500 mt-1 text-sm">{errors.dni.message}</p>}
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Núm. Telefónico</label>
                                <input type="text" {...register("phone")} className="input-large" placeholder="Ingresa tu número telefónico" />
                                {errors.phone && <p className="text-red-500 mt-1 text-sm">{errors.phone.message}</p>}
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                                <input type="text" {...register("firstName")} className="input-large" placeholder="Ingresa tu nombre" />
                                {errors.firstName && <p className="text-red-500 mt-1 text-sm">{errors.firstName.message}</p>}
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Apellido</label>
                                <input type="text" {...register("lastName")} className="input-large" placeholder="Ingresa tu apellido" />
                                {errors.lastName && <p className="text-red-500 mt-1 text-sm">{errors.lastName.message}</p>}
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Correo Electrónico</label>
                                <input type="email" {...register("email")} className="input-large" placeholder="Ingresa tu correo electrónico" />
                                {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Fecha de Nacimiento</label>
                                <input type="date" {...register("birthDate")} className="input-large" />
                                {errors.birthDate && <p className="text-red-500 mt-1 text-sm">{errors.birthDate.message}</p>}
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
                                <input type="password" {...register("password")} className="input-large" placeholder="Ingresa tu contraseña" />
                                {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>}
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Repetir Contraseña</label>
                                <input type="password" {...register("confirmPassword")} className="input-large" placeholder="Repite tu contraseña" />
                                {errors.confirmPassword && <p className="text-red-500 mt-1 text-sm">{errors.confirmPassword.message}</p>}
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Departamento</label>
                                <input type="text" {...register("department")} className="input-large" placeholder="Departamento" />
                                {errors.department && <p className="text-red-500 mt-1 text-sm">{errors.department.message}</p>}
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Provincia</label>
                                <input type="text" {...register("province")} className="input-large" placeholder="Provincia" />
                                {errors.province && <p className="text-red-500 mt-1 text-sm">{errors.province.message}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <div>
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Distrito</label>
                                    <input type="text" {...register("district")} className="input-large" placeholder="Distrito" />
                                    {errors.district && <p className="text-red-500 mt-1 text-sm">{errors.district.message}</p>}
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Línea 1</label>
                                <input type="text" {...register("addressLine1")} className="input-large" placeholder="Ingresa tu dirección" />
                                {errors.addressLine1 && <p className="text-red-500 mt-1 text-sm">{errors.addressLine1.message}</p>}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type="checkbox" {...register("termsAccepted")} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <label className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                Acepto el envío de mis datos personales.
                            </label>
                            {errors.termsAccepted && <p className="text-red-500 mt-1 text-sm">{errors.termsAccepted.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 mt-4 rounded-lg text-white font-semibold text-lg ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                                } transition duration-200`}
                        >
                            {loading ? 'Registrando...' : 'Registrarse'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </Layout>
    );
};

export default Signup;
