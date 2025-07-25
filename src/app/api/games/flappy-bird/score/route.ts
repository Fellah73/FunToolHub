import { db } from "@/app/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { id, score } = body;

    const newScore = await db.flappyScore.create({
      data: {
        userId: id,
        score: score,
      },
    });

    if (!newScore)
      return new Response("Internal Server Error", { status: 500 });

    return new Response(JSON.stringify({ newScore, success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
