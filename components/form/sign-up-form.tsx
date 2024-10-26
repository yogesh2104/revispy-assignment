"use client"

import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { signUp } from "@/app/action/signup-action"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"


const SignUpForm = ()=>{
    const router = useRouter()
    const [isPending, startTransition] = useTransition();

    async function handleSubmit(formData: FormData) {
        startTransition(async() => {
            await signUp(formData)
            toast.success("Verification code sent to your email. Please check your inbox!")
            router.push("/verify")
        })
    }


    return(
        <form action={handleSubmit}>
            <div className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Enter"
                    name="name"
                    required
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Enter"
                    name="email"
                     autoComplete="off"
                    required
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Enter"
                    name="password" 
                    required
                    autoComplete="off"
                />
            </div>
            <Button type="submit" disabled={ isPending ? true : false } size={"lg"} className="w-full bg-black text-white">
                {isPending ? <Loader2 className="animate-spin"/>:"CREATE ACCOUNT"} 
            </Button>
            </div>
        </form>
    )
}

export default SignUpForm