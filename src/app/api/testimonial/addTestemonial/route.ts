import { db } from "@/app/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { id, rating, content } = body;

   
    const existingTestimonial = await db.testimonial.findFirst({
      where: { userId: id },
    });

    let responseMessage;

    if (existingTestimonial) {
      
      await db.testimonial.update({
        where: { id: existingTestimonial.id },
        data: {
          content: content,
          rating: rating,
        },
      });
      responseMessage = "Testimonial Updated successfully.";
    } else {
      
      await db.testimonial.create({
        data: {
          userId: id,
          content: content,
          rating: rating,
          title: "test",
        },
      });
      responseMessage = "Testimonial added successfully.";
    }

    return new Response(JSON.stringify({ success: true, message: responseMessage }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Erreur interne du serveur", { status: 500 });
  }
}