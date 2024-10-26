"use client"

import { useState, useRef, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'


export const VerificationForm = () =>{
    const [code, setCode] = useState(['', '', '', '', '', '', '', ''])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const [message,setMessage] = useState("")
    const router = useRouter()

    const [verifying,setverifying] = useState(false)
    
    useEffect(() => {
      inputRefs.current[0]?.focus()
    }, [])
  
    const handleChange = (index: number, value: string) => {
      if (value.length <= 1) {
        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)
        if (value !== '' && index < 7) {
          inputRefs.current[index + 1]?.focus()
        }
      }
    }
  
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && index > 0 && code[index] === '') {
        inputRefs.current[index - 1]?.focus()
      }
    }
  
    const handleVerify = async (e: React.FormEvent) => {
      setverifying(true)
      e.preventDefault()
      const verificationCode = code.join('')
      
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verificationCode }),
      });

      const data = await res.json();

      setverifying(false)
      if(data?.message == "Email verified successfully!"){
        router.push('/login')
      }else{
        setMessage(data?.message || "Invalid or expired verification code.")
      }

    }

    return(
        <form onSubmit={handleVerify}>
            <div className="mb-4">
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">Code</label>
              <div className="flex justify-between">
              {code.map((digit, index) => (
                <Input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="w-10 h-10 text-center"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => { inputRefs.current[index] = el }}
                    aria-label={`Digit ${index + 1}`}
                />
                ))}
              </div>
              {message && <p className='text-center text-red-600 mt-3 text-sm'>{message}</p>}
            </div>
            <Button type="submit" className="w-full bg-black text-white">{verifying ? <Loader2 className='animate-spin'/> :"VERIFY"}</Button>
          </form>
    )
}