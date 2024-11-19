import { JWTPayload } from "jose";
import { NextResponse } from "next/server";
import { verifyToken } from "./app/utils/jwt";

export async function middleware(req: any) {
  console.log("middlware entered");

  {
    /*recupreation du token depuis cookie*/
  }

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

  {
    /*si le time est fini du token on le tue*/
  }
  if (!payload || !token) {
    if (!payload) {
      console.log("payload expired");
    } else {
      console.log("token n'existe pas");
    }
    const message = "desconnect";
    const respone = NextResponse.redirect(new URL(`/redirect?message=${message}`, req.url));
    respone.cookies.set("authToken", "", { maxAge: 0, path: "/" });
    return respone;
  }

  {
    /* le jwt exist dnoc passer a la page suivante */
  }
  console.log("check finished verification success");
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
