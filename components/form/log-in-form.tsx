"use client"

import { useState, useTransition } from "react"
import { Button } from "../ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { login } from "@/app/action/sign-in-action"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"


export const LoginForm=()=>{
    const [isPending, startTransition] = useTransition();
    const router = useRouter()

    const handleSubmit = (formData: FormData) => {
      try {
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        if (!email || !password) {
            toast.error("Please Enter Email and Password.")
            return
        }

        try {
            startTransition(async() => {
                await login(formData);
                router.refresh()
                router.push("/categories");
            })
            toast.success("Login Successful");
        } catch (error: any) {
            router.refresh()
            toast.error(error.message || "Something went wrong.");
        }
        
    } catch (error) {
        console.error("Login error:", error)
        toast.error("Something went wrong! Please try again.")
    } 
    }

    const [showPassword, setShowPassword] = useState(true)

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    return(
        <form action={handleSubmit}>
            <div className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter"
                        name="email"
                        required
                        autoComplete="off"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">

                    <Input
                        id="password"
                        type={showPassword ? 'password' : 'text'}
                        placeholder="Enter"
                        name="password"
                        required
                        autoComplete="off"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="rounded-none absolute right-2 underline top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={togglePasswordVisibility} 
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? (
                        "Show"
                        ) : (
                        "Hide"
                        )}
                    </Button>
                    </div>
                </div>
                <Button type="submit" disabled={isPending} className="w-full bg-black text-white">
                {isPending ? <Loader2 className="animate-spin"/> : "LOGIN"}
                </Button>
            </div>
        </form>
    )
}