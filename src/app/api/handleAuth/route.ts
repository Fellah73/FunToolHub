import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("handleAuth entred");
  try {
    const cookieHeader = request.headers.keys();
    console.log("Cookie header:", cookieHeader); // Affiche le contenu brut de l'en-tête 'cookie'

    // Utilisation de l'API cookies() de Next.js pour obtenir authToken directement
    const authToken = (await cookies()).get("authToken")?.value;
    console.log("Auth Token:", authToken); // Doit affi

    if (!authToken) {
      console.log("error token inexistant");
      return NextResponse.json(
        { loggedIn: false, success: false },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { loggedIn: true, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json({ loggedIn: false }, { status: 500 });
  }
}
