import { LoginForm } from "@/components/form/log-in-form"
import Link from "next/link"

const LoginPage=()=>{

    return(
        <main className="max-w-md mx-auto mt-10">
            <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-sm">
            <div className="p-6 text-center text-2xl font-bold">Login</div>
            <h4 className="text-xl font-bold text-center ">Welcome back to ECOMMERCE</h4>
            <p className="text-sm text-center mb-6">The next gen business marketplace</p>
            <LoginForm/>
            <hr className="mt-4 bg-[#C1C1C1] h-[1.5px]"/>
            <p className="mt-2 text-center text-sm text-gray-600">
                Don&apos;t have an Account? ? <Link href="/sign-up" className="font-medium text-black hover:underline">SIGN UP</Link>
            </p>
            </div>
        </main>
    )
}

export default LoginPage