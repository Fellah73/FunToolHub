import { db } from "@/app/db";
import bcrypt from "bcryptjs";
import { console } from "inspector";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    {
      /* check if user exists (email)*/
    }

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

    // Version sécurisée et plus propre
    const saltRounds = process.env.HASH_DEPTH
      ? parseInt(process.env.HASH_DEPTH)
      : 10; // 10 comme valeur par défaut

    console.log("the depth from register ", saltRounds);

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("the hashed password from register ", hashedPassword);

    const token = jwt.sign({ email: email }, process.env?.AUTH_SECRET_KEY!, {
      expiresIn: "10m",
    });
    console.log("the token from register ", token);

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

    console.log("the user from register ", user);

    const { password: _, ...userWithouPass } = user;

    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `authToken=${token}; HttpOnly; Path=/; Max-Age=600`
    );
    console.log("the headers from register ", headers);

    return new Response(JSON.stringify({ userWithouPass, success: true }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
