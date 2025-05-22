import { db } from "@/app/db";

export async function GET(request: Request) {
  try {

    const allTestimonials = await db.testimonial.findMany({
      distinct: ["userId"],
      select: {
      rating: true,
      content: true,
      createdAt: true,
      user: {
        include: {
        },
      },
      },
    });

    if (!allTestimonials)
      return new Response(
        "impossible d'ecrire le score dans la base de donées",
        { status: 500 }
      );

      const finamTestimonials = allTestimonials.map((testimonial) => ({
        name: testimonial.user.name,
        rating: testimonial.rating,
        content: testimonial.content,
        image: testimonial.user.profileImage,
        date : testimonial.createdAt
      }));

    return new Response(JSON.stringify({ testimonials : finamTestimonials, success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
