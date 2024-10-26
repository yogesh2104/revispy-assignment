import { Search, ShoppingCart } from "lucide-react"
import Link from "next/link"
import OfferBar from "./offer-bar"
import { auth } from "@/auth";

export const Header=async ()=>{
    const session = await auth();
    return(
        <>
        <div className="max-w-7xl mx-auto pt-2 flex justify-end items-center">
            <a href="#" className="text-sm text-gray-700 mr-4">Help</a>
            <a href="#" className="text-sm text-gray-700 mr-4">Orders & Returns</a>
            {session &&<a href="#" className="text-sm text-gray-700">Hi, {session?.user?.name}</a>}
        </div>
        <header >
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between h-16">
                <Link href="/" className="font-bold text-xl">ECOMMERCE</Link>
                <nav className="hidden md:flex flex-1 justify-center">
                    <ul className="flex space-x-6">
                    <li><Link href="/categories" className="transition-colors">Categories</Link></li>
                    <li><Link href="#" className="transition-colors">Sale</Link></li>
                    <li><Link href="#" className="transition-colors">Clearance</Link></li>
                    <li><Link href="#" className="transition-colors">New stock</Link></li>
                    <li><Link href="#" className="transition-colors">Trending</Link></li>
                    </ul>
                </nav>
                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full hover:scale-125 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors">
                    <Search className="h-5 w-5" />
                    </button>
                    <button className="p-2 rounded-full hover:scale-125 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors">
                    <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>
                </div>
            </div>
        </header>
        <OfferBar/>
        </>

    )
}
