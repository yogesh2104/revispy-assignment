
"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export const login = async (formData: FormData) => {
    const rawData = {
        email:formData.get("email"),
        password:formData.get("password"),
        redirectTo:"/categories"
    }

    try {
        await signIn("credentials", rawData)
    } catch (error:any) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return { error:"Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }
        throw error
    }

    // redirect("/categories")
};