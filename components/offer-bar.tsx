import { ChevronLeft, ChevronRight } from "lucide-react"

const OfferBar=()=>{
    return(
        <div className="bg-gray-200 py-2">
            <div className="max-w-sm mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <ChevronLeft className="h-5 w-5 text-gray-500" />
            <p className="text-sm text-gray-700">Get 10% off on business sign up</p>
            <ChevronRight className="h-5 w-5 text-gray-500" />
            </div>
        </div>
    )
}

export default OfferBar