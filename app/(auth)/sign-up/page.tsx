import SignUpForm from "@/components/form/sign-up-form"
import Link from "next/link"


const LoginPage=()=>{

    return(
        <main className="max-w-md mx-auto mt-10">
            <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-center mb-6">Create your account</h2>
            <SignUpForm/>
            <p className="mt-4 text-center text-sm text-gray-600">
                Have an Account? <Link href="/login" className="font-medium text-black hover:underline">LOGIN</Link>
            </p>
            </div>
        </main>
    )
}

export default LoginPage