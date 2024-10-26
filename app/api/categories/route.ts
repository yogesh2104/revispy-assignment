import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { faker } from '@faker-js/faker'


const CATEGORIES_COUNT = 100
const PER_PAGE = 10

async function seedCategories() {
    const existingCategories = await db.category.findMany()
    if (existingCategories.length === 0) {
      const categories = Array.from({ length: CATEGORIES_COUNT }, () => ({
        name: faker.commerce.productName(),
      }))
      await db.category.createMany({ data: categories })
    }
}

export async function POST(req: NextRequest ) {
    await seedCategories()

    const { page=1 } = await req.json();
    
    try {

        const categories = await db.category.findMany({
            skip: (page - 1) * PER_PAGE,
            take: PER_PAGE,
        })
        const total = await db.category.count()
    
        return NextResponse.json({ message: "Categories List!", 
            data :{
                    categories,
                    total,
                    page,
                    totalPages: Math.ceil(total / PER_PAGE),
                }
            },
            {status:200}
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong. Please try again." }, {status:500});
    }
}
