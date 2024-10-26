"use client"

import { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2 } from 'lucide-react'

interface Category {
    id: string;
    name: string;
}

export default function CategoriesPage() {

    const [categories, setCategories] = useState<Category[]>([]);
    const [page, setPage] = useState<number>(1);
    const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({});
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading ,setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "page": page
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        const fetchCategories = async () => {
          const res = await fetch(`api/categories`,requestOptions);
          const data = await res.json();
          setCategories(data?.data?.categories);
          setTotalPages(data?.data?.totalPages)
        };
        fetchCategories();

        const savedInterests = JSON.parse(localStorage.getItem("selectedCategories") || "{}") as Record<string, boolean>;
        setSelectedCategories(savedInterests);
        setLoading(false)
    }, [page]);
  

    const handleInterestChange = (categoryId: string) => {
        setSelectedCategories((prev) => {
        const updated = { ...prev, [categoryId]: !prev[categoryId] };
        localStorage.setItem("selectedCategories", JSON.stringify(updated));
        return updated;
        });
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
        if (endPage - startPage + 1 < maxVisiblePages) {
          startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
    
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(
            <Button
              key={i}
              variant={page === i ? "outline" : "link"}
              size="icon"
              onClick={() => setPage(i)}
            >
              {i}
            </Button>
          );
        }
    
        return pageNumbers;
    };
    

  return (
    <div className="min-h-screen ">

      <main className="max-w-md mx-auto mt-10">
        <div className="bg-white p-8 border border-gray-300 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-center mb-2">Please mark your interests!</h2>
            <p className="text-center text-sm text-gray-600 mb-2">We will keep you notified.</p>
            <hr/>
            <div className="space-y-4 mt-3">
                <h3 className="font-semibold">My saved interests!</h3>
                {loading ? <div className='h-72 flex justify-center items-center'>
                    <Loader2 className='animate-spin'/>
                </div>:
                <>
                  {categories.map(({ id, name }) => (
                  <div key={id} className="flex items-center">
                      <Checkbox
                          id={id}
                          checked={selectedCategories[id] || false}
                          onCheckedChange={() => handleInterestChange(id)}
                      />
                      <label htmlFor={id} className="ml-2 text-sm font-medium">
                      {name}
                      </label>
                  </div>
                  ))}
                </>
                }
            </div>

            <div className="flex justify-center items-center mt-4">
                <Button 
                variant="link" 
                onClick={() => setPage(1)}
                disabled={page === 1}
                size="icon"
                >
                <ChevronsLeft className="h-4 w-4" />
                </Button>
                
                <Button 
                variant="link" 
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                size="icon"
                >
                <ChevronLeft className="h-4 w-4" />
                </Button>

                {renderPageNumbers()}

                <Button 
                    variant="link" 
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    size="icon"
                >
                <ChevronRight className="h-4 w-4" />
                </Button>
                
                <Button 
                variant="link" 
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                size="icon"
                >
                <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </main>

    </div>
  )
}