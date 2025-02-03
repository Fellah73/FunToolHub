import { db } from "@/app/db";
import bcrypt from "bcryptjs";
import { revalidateTag } from "next/cache";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, email, name, password, bio, backgroundImage, profileImage } =
      body;

    console.log("the user id ", id);
    console.log("the user email ", email);
    console.log("the user name ", name);
    console.log("the user password ", password);
    console.log("the user bio ", bio);
    console.log("the user backgroundImage ", backgroundImage);
    console.log("the user profileImage ", profileImage);

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
    console.log("the depth from register ", saltRounds);

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("the hashed password from register ", hashedPassword);

    const updatedUser = await db.user.update({
      where: {
        email,
      },
      data: {
        name,
        password: hashedPassword,
        bio,
        backgroundImage,
        profileImage,
      },
    });

    if (!updatedUser) {
      return new Response(JSON.stringify({ message: "User not updated" }), {
        status: 500,
      });
    }

    updatedUser.password = "";

    console.log("User updated successfully", updatedUser);

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
