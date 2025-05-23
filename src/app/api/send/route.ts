import { NextResponse } from "next/server";
import { Resend } from "resend";
export async function GET() {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  try {
    const { data } = await resend.emails.send({
      from: `saci@moh-shop.vercel.app`,
      to: `akeamsf7@gmail.com`,
      subject: `Fun Tool Hub`,
      text: `<h1>Wesh Akram Kesh jdid</h1>`,
    });

    return NextResponse.json({ success: true, id: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
