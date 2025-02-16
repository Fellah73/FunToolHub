import { db } from "@/app/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

    if (!limit)
      return new Response(JSON.stringify({ message: "ID is required" }), {
        status: 404,
      });
   
      // update the db request later cause i've only 2 players so i made this wrong request to increase the leaderboard list
      // get the best score for each player
    {
      /*
    const scores = await db.user.findMany({
      include: {
        flappyScores: {
          orderBy: {
            score: "desc",
          },
          take: 1,
        },
      },
      distinct: ["id"],
      take: limit ? parseInt(limit) : 10,
    });*/
    }

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
    
     console.log('returning the response');
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
