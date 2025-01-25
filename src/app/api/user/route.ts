import { db } from "@/app/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const id = searchParams.get('id');

      if (!id) {
        return new Response(JSON.stringify({ message: "ID is required" }), { status: 404 });
      }

      console.log('the user id ', id)
      const user = await db.user.findFirst({
        where: {
           id: id
        }
      })
      

      if (!user) {
          return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
      }

      return new Response(JSON.stringify({user : user , message : "User fetched successfully"}), { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ message: "Error fetching data" }), { status: 500 });
  }
}