import { VerificationForm } from '@/components/form/verification-form';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';


export default async function VerifyPage() {

  const cookieStore = await cookies()
  const verificationEmail = cookieStore.get('verificationEmail')?.value

  if(!verificationEmail){
    redirect("/sign-up")
  }

  function maskEmail(email:string) {
    if(email){
      const [localPart, domain] = email?.split("@");
      const maskedLocalPart = localPart.slice(0, 3) + "*".repeat(localPart.length - 2);
      return `${maskedLocalPart}@${domain}`;
    }
  }

  return (
    <div className="min-h-screen">
      <main className="max-w-md mx-auto mt-10">
        <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-center mb-6">Verify your email</h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Enter the 8 digit code you have received on<br />
            {maskEmail(verificationEmail as string) || "Check Your Email"}
          </p>
          <VerificationForm/>
        </div>
      </main>
    </div>
  )
}