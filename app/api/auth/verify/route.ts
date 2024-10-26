import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest ) {

    const { verificationCode } = await req.json();

    try {
        // Find the verification token with the provided verificationCode and check expiration
        const verificationToken = await db.verificationToken.findFirst({
            where: { token: verificationCode, expires: { gte: new Date() } },
        });

        if (!verificationToken) {
            return NextResponse.json({ message: "Invalid or expired verification code." },{status:404});
        }

        // Update the user’s `verified` status to true
        await db.user.update({
            where: { id: verificationToken.userId },
            data: { verified: true },
        });

        // Delete the token after successful verification
        await db.verificationToken.delete({
            where: { id: verificationToken.id },
        });

        return NextResponse.json({ message: "Email verified successfully!" },{status:200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong. Please try again." }, {status:500});
    }
}
