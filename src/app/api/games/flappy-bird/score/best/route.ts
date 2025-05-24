import { db } from "@/app/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const playerId = searchParams.get("playerId");
    const limit = searchParams.get("limit");

    if (!playerId)
      return new Response(JSON.stringify({ message: "ID is required" }), {
        status: 404,
      });

    const scores = await db.flappyScore.findMany({
      where: {
        userId: playerId!,
      },
      orderBy: {
        score: "desc",
      },
      take: limit ? parseInt(limit) : 10,
      distinct: ["score"],
    });

    if (!scores || scores.length === 0)
      return new Response(
        JSON.stringify({ message: "Player didn't play flappy bird" }),
        { status: 404 }
      );

    const scoresArray = scores.map((scoreRow) => ({
      value: scoreRow.score,
      playedAt: scoreRow.playedAt.toISOString().split("T")[0],
    }));

    return new Response(
      JSON.stringify({ bestScores: scoresArray, success: true }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
