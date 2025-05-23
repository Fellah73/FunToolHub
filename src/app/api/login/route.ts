import { db } from "@/app/db";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const userExists: User | null = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      return new Response(
        JSON.stringify({ message: `${email} don't existe`, success: false }),
        { status: 400 }
      );
    }

    const isSamePassword = await bcrypt.compare(password, userExists.password);

    if (!isSamePassword) {
      return new Response(
        JSON.stringify({ message: `Wrong password`, success: false }),
        { status: 400 }
      );
    }

    const token = jwt.sign({ email: email }, process.env?.AUTH_SECRET_KEY!, {
      expiresIn: "20m",
    });

    const { password: _, ...userWithouPass } = userExists;

    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `authToken=${token}; HttpOnly; Path=/; Max-Age=1200; SameSite=Strict; Secure`
    );

    return new Response(JSON.stringify({ userWithouPass, success: true }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
