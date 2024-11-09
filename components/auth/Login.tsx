import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../Layout';
import axiosInstance from '@/utils/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const passwordSchema = z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres.")
    .refine((val) => /[A-Z]/.test(val), {
        message: "La contraseña debe incluir al menos una letra mayúscula.",
    })
    .refine((val) => /[a-z]/.test(val), {
        message: "La contraseña debe incluir al menos una letra minúscula.",
    })
    .refine((val) => /\d/.test(val), {
        message: "La contraseña debe incluir al menos un número.",
    })
    .refine((val) => /[^A-Za-z0-9]/.test(val), {
        message: "La contraseña debe incluir al menos un carácter especial.",
    });

const loginSchema = z.object({
    email: z.string().email("Por favor, ingresa un email válido."),
    password: passwordSchema,
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: LoginFormInputs) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/user/login", data);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('token', response.data.access_token);
                window.location.href = '/';
            }
            toast.success("Inicio de sesión exitoso");
        } catch (error) {
            toast.error("Error en el inicio de sesión");
            console.error("Error en el inicio de sesión:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <ToastContainer />
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full"
                >
                    <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-gray-200 mb-6">
                        Iniciar Sesión
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register("email")}
                                className={`mt-1 p-3 block w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                                    }`}
                                placeholder="Ingresa tu email"
                            />
                            {errors.email?.message && <p className="mt-2 text-sm text-red-500">{String(errors.email.message)}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...register("password")}
                                className={`mt-1 p-3 block w-full rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                                    }`}
                                placeholder="Ingresa tu contraseña"
                            />
                            {errors.password?.message && <p className="mt-2 text-sm text-red-500">{String(errors.password.message)}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-lg text-white font-semibold ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                                } transition duration-200`}
                        >
                            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            ¿No tienes una cuenta?{' '}
                            <Link href="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
};

export default Login;
