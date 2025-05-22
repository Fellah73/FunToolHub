import { db } from "@/app/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { id, rating, content } = body;

    const newTestemonial = await db.testimonial.create({
      data: {
        userId: id,
        content: content,
        rating: rating,
        title: "test",
      },
    });

    if (!newTestemonial)
      return new Response(
        "impossible d'ecrire le score dans la base de donées",
        { status: 500 }
      );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
