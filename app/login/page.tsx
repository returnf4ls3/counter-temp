'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import Button from "../components/Button";
import Link from "next/link";
import Input from "../components/input/Input";
import useSettings from "../hooks/useSettings";

const LoginPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();

    const darkMode = useSettings((state) => state.darkMode);

    useEffect(() => {
      if (darkMode) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }, [darkMode]);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            username: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                //toast.success('Logged in');
                router.push("/")
            }

            if (callback?.error) {
                //toast.error(callback.error);
            }
        })
    }

    if (session){
        return (
            <div className='flex justify-center items-center min-h-screen dark:bg-black dark:text-white'>
                <div className='text-center'>
                    <h1 className='text-3xl font-bold p-4'>Already logged in</h1>
                    <Link className='text-blue-500 hover:underline focus:text-blue-700' href="/">
                        Go back to home
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen dark:bg-black dark:text-white bg-opacity-75">
            <div className="w-full max-w-md rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <Input id="username" label="Username" disabled={isLoading} register={register} errors={errors} required />
                    <hr />
                    <Input id="password" type="password" label="Password" disabled={isLoading} register={register} errors={errors} required />
                    <Button label="Login" />
                </form>
            </div>
        </div>
    );
}

export default LoginPage;