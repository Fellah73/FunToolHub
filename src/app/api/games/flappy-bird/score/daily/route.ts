import { db } from "@/app/db";

export async function GET(request: Request) {
  try {
    console.log("score daily route entred");
    const { searchParams } = new URL(request.url);
    const playerId = searchParams.get("playerId"); // ✅ Correct pour récupérer un query param

    if (!playerId)
      return new Response(JSON.stringify({ message: "ID is required" }), {
        status: 404,
      });

    console.log(
      "the playerId from /api/games/flappy-bird/score/daily ",
      playerId
    );

    const today = new Date().toISOString().split("T")[0];

    const scores = await db.flappyScore.findMany({
      where: {
        userId: playerId!,
        playedAt: {
          gte: new Date(`${today}T00:00:00.000Z`),
          lte: new Date(`${today}T23:59:59.999Z`),
        },
      },
      orderBy: {
        playedAt: "desc",
      },
    });

    if (!scores || scores.length === 0)
      return new Response(
        JSON.stringify({ message: "Player didn't play today" }),
        { status: 404 }
      );

    console.log('the scores are ', scores.map((scoreRow) => scoreRow.score));

    // array containing the scores to return
    const scoresArray = scores.map((scoreRow) => ({
      score: scoreRow.score,
      playedAt: scoreRow.playedAt.toISOString().split("T")[1].split(".")[0].split(":").slice(0, 2).join(':'),
    }));

    return new Response(JSON.stringify({ scores: scoresArray, success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
