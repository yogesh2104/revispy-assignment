"use server";

import { hash } from "bcryptjs";
import { db } from "@/db";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { cookies } from "next/headers";


export const signUp = async (formData: FormData) => {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // Validate input
        if (!name || !email || !password) {
            return { error: "All Fields Required!" };
        }

        // Check if the user already exists
        const existingUser = await db.user.findUnique({ where: { email } });
        if (existingUser) return { error: "Email already exists" };

        // Hash password
        const hashPassword = await hash(password, 10);

        // Create the new user
        const newUser = await db.user.create({
            data: { name, email, password: hashPassword }
        });

        // Generate a 8-digit random verification code
        const verificationCode = crypto.randomInt(10000000, 99999999).toString();
        console.log("verificationCode",verificationCode)
        const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiration

        // Store verification code in database
        await db.verificationToken.create({
            data: {
                identifier: email,
                token: verificationCode,
                expires,
                userId: newUser.id
            }
        });

        // set email in cookies for verify screen and expires in 10 minutes
        cookies().set({
            name: "verificationEmail",
            value: email,
            maxAge: 10 * 60, 
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
        });

        // Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        // Send email with the verification code
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your Verification Code",
            text: `Your verification code is: ${verificationCode}`,
            html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`,
        });

        return {
            success: true,
            message: "Verification code sent to your email. Please check your inbox."
        };

    } catch (error) {
        console.error(error);
        return { error: "Something went wrong! Please try again." };
    }
};
