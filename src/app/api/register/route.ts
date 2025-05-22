import { db } from "@/app/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    const userExists = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return new Response(
        JSON.stringify({ message: `${email} already exists`, success: false }),
        { status: 400 }
      );
    }

    
    const saltRounds = process.env.HASH_DEPTH
      ? parseInt(process.env.HASH_DEPTH)
      : 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const token = jwt.sign({ email: email }, process.env?.AUTH_SECRET_KEY!, {
      expiresIn: "15m",
    });

    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        pseudoname: `@${name.toLowerCase().split(" ")[0]}${Math.floor(
          Math.random() * 1000
        )}`,
      },
    });

    const { password: _, ...userWithouPass } = user;

    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `authToken=${token}; HttpOnly; Path=/; Max-Age=900`
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
