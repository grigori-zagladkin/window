'use client'

import { FC } from "react";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

const formSchema = z.object({
    email: z.string().email({
        message: "email must be at least 2 characters.",
    }),
    password: z.string().min(2, {
        message: "password must be at least 2 characters.",
    }),
})

const AuthPage: FC = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ''
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await signIn('credentials', {
            ...values,
            redirect: true,
            callbackUrl: '/'
        })
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='flex flex-col gap-2 min-w-[450px]'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>password</FormLabel>
                                    <FormControl>
                                        <Input type='password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='w-full'>Авторизация</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default AuthPage;