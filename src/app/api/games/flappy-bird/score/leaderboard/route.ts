import { db } from "@/app/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

    if (!limit)
      return new Response(JSON.stringify({ message: "ID is required" }), {
        status: 404,
      });
      
    const scores = await db.flappyScore.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profileImage: true,
          },
        },
      },
      orderBy: {
        score: "desc",
      },
      distinct: ["userId"],
      take: limit ? parseInt(limit) : 10,
    });

    if (!scores || scores.length === 0)
      return new Response(JSON.stringify({ message: "there is no game" }), {
        status: 404,
      });

    // array containing the scores to return
    const scoresArray = scores.map((scoreRow) => ({
      id: scoreRow.id,
      image: scoreRow.user.profileImage,
      name: scoreRow.user.name.split(" ")[0],
      score: scoreRow.score,
      date: scoreRow.playedAt.toISOString().split("T")[0],
    }));

    scoresArray.sort((a, b) => b.score - a.score);

    return new Response(
      JSON.stringify({ globalBestScores: scoresArray, success: true }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
