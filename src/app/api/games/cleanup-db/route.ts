import { db } from "@/app/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const today = new Date().toISOString().split("T")[0]; 

    // check if cleanup already done
    const cleanupExists = await db.cleanupLog.findUnique({
      where: { cleanupDate: new Date(today) },
    });

    if (cleanupExists) {
      return NextResponse.json(
        {
          message: "Cleanup already done today",
          date: today,
          success : true
        },
        { status: 200 }
      );
    }

    // get users with more than 10 scores
    const flappyUsersWithScores = await db.user.findMany({
      include: {
        flappyScores: {
          orderBy: { score: "desc" },
        },
      },
    });

    // for each user delete scores if more than 10 (flappy)
    for (const user of flappyUsersWithScores) {
      if (user.flappyScores.length > 10) {
        
        const scoresASupprimer = user.flappyScores.slice(10);
        const idsASupprimer = scoresASupprimer.map((score) => score.id);

        await db.flappyScore.deleteMany({
          where: {
            id: { in: idsASupprimer },
          },
        });
      }
    }

    // get users with more than 10 scores
    const snakeUsersWithScores = await db.user.findMany({
      include: {
        snakeScores: {
          orderBy: { score: "desc" },
        },
      },
    });

    // for each user delete scores if more than 10 (snake)
    for (const user of snakeUsersWithScores) {
      if (user.snakeScores.length > 10) {
       
        const scoresASupprimer = user.snakeScores.slice(10);
        const idsASupprimer = scoresASupprimer.map((score) => score.id);

        await db.snakeScore.deleteMany({
          where: {
            id: { in: idsASupprimer },
          },
        });
      }
    }

    // create a new cleanup log
    await db.cleanupLog.create({
      data: { cleanupDate: new Date(today) },
    });

    
    const flappyCount = await db.flappyScore.count();
    const snakeCount = await db.snakeScore.count();

    return NextResponse.json(
      {
        success: true,
        message: "Cleanup completed successfully",
        date: today,
        remainingScores: {
          flappy: flappyCount,
          snake: snakeCount,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cleanup error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to cleanup scores",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } 
}


