import { db } from "@/app/db";
import bcrypt from "bcryptjs";
import { revalidateTag } from "next/cache";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, email, name, password, bio, backgroundImage, profileImage } =
      body;

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    //hash password
    const saltRounds = process.env.HASH_DEPTH
      ? parseInt(process.env.HASH_DEPTH)
      : 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const updatedUser = await db.user.update({
      where: {
        email,
      },
      data: {
        name,
        password: hashedPassword,
        bio,
        backgroundImage  : backgroundImage || existingUser.backgroundImage, 
        profileImage : profileImage || existingUser.profileImage,
      },
    });

    if (!updatedUser) {
      return new Response(JSON.stringify({ message: "User not updated" }), {
        status: 500,
      });
    }

    updatedUser.password = "";

    

    // every update will delete the cache and refresh the profil page fetch
    revalidateTag("user-profile");

    //response
    return new Response(
      JSON.stringify({ message: `${name} updated successfully`, updatedUser }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
