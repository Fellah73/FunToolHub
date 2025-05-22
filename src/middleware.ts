import { JWTPayload } from "jose";
import { NextResponse } from "next/server";
import { verifyToken } from "./app/utils/jwt";

export async function middleware(req: any) {
  console.log("middlware entered");

  const token = req.cookies.get("authToken")!;

  if (!token) {
    console.log("token inexistant");
  }

  let payload: JWTPayload | null;
  payload = null;

  try {
    payload = await verifyToken(token);
  } catch (error) {
    console.log("erreur ", error);
  }

  if (!payload || !token) {

    const respone = NextResponse.redirect(
      new URL(`/auth`, req.url)
    );

    respone.cookies.set("authToken", "", { maxAge: 0, path: "/" });
    return respone;
  }

  console.log("request can pass");
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*","/services/:path*","/games/:path*"],
};
