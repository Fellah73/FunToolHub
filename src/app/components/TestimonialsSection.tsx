'use client';
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useEffect, useState } from "react";
import { testimonials as staticTestimonials } from "@/data/providedServices";
interface Testimonial {
    name: string,
    rating: number,
    content: string,
    image: string,
    date : string
}
export function TestimonialSection() {

    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);


    useEffect(() => {
        const getTestimonials = async () => {
            try {
                const response = await fetch('/api/testimonial/getTestemonials', { method: 'GET' });
                const data = await response.json();
                if (!response.ok || !data.success) throw new Error(data.message);
                setTestimonials(data.testimonials);
            } catch (error) {
                console.error(error);
            }
        }

        getTestimonials();

    }, []);

    useEffect(() => {
        console.log(testimonials);
    }, [testimonials]);

    if(testimonials.length === 0) return 

    return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />;
}