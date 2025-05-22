'use client';

import { useUser } from '@/app/context/userContext';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Send, Heart } from 'lucide-react';
import { useState } from 'react';

interface TestimonialFormData {
    rating: number;
    content: string;
}

export default function TestimonialForm() {
    const [formData, setFormData] = useState<TestimonialFormData>({
        rating: 0,
        content: ''
    });
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleRatingClick = (rating: number) => {
        setFormData(prev => ({ ...prev, rating }));
    };

    const { user } = useUser();

    const addTestimonial = async () => {
        try {
            const response = await fetch('/api/testimonial/addTestemonial', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: user?.id,
                    rating: formData.rating,
                    content: formData.content
                }),
            })

            const data = await response.json();
            if (!response.ok || !data.success) throw new Error(data.message);
        } catch (error) {
            console.error(error);
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        if(!user) return;
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        await addTestimonial();

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ rating: 0, content: '' });
        }, 3000);
    };

    if (isSubmitted) {
        return (
            <div className="py-16 bg-violet-950/20">
                <div className="container mx-auto px-4 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-br from-violet-950/50 to-indigo-950/50 p-8 rounded-lg shadow-lg shadow-violet-900/30 border border-violet-800/30 backdrop-blur-sm text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="bg-green-800/50 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center"
                        >
                            <Heart className="h-8 w-8 text-green-300 fill-current" />
                        </motion.div>
                        <motion.h3
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl font-bold text-white mb-4"
                        >
                            Thank You!
                        </motion.h3>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-violet-200"
                        >
                            Your testimonial has been submitted successfully. We appreciate your feedback!
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <section className="py-4 bg-violet-950/20">
            <div className="container mx-auto px-4 max-w-2xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex justify-center mb-4"
                    >
                        <div className="bg-gradient-to-r from-fuchsia-800/50 to-violet-800/50 p-3 rounded-full">
                            <MessageSquare className="h-8 w-8 text-fuchsia-300" />
                        </div>
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                        Share Your Experience
                    </h2>
                    <p className="text-violet-200 max-w-xl mx-auto">
                        We'd love to hear about your experience with FunToolHub. Your feedback helps us improve and inspires others to join our community.
                    </p>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-violet-950/50 to-indigo-950/50 p-8 rounded-lg shadow-lg shadow-violet-900/30 border border-violet-800/30 backdrop-blur-sm"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Rating Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className="block text-white font-semibold mb-3">
                                How would you rate your experience?
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <motion.button
                                        key={star}
                                        type="button"
                                        onClick={() => handleRatingClick(star)}
                                        onMouseEnter={() => setHoveredRating(star)}
                                        onMouseLeave={() => setHoveredRating(0)}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="focus:outline-none"
                                    >
                                        <Star
                                            className={`h-8 w-8 transition-colors duration-200 ${star <= (hoveredRating || formData.rating)
                                                    ? 'text-fuchsia-400 fill-current'
                                                    : 'text-gray-400'
                                                }`}
                                        />
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Content Textarea */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <label htmlFor="content" className="block text-white font-semibold mb-3">
                                Tell us about your experience
                            </label>
                            <textarea
                                id="content"
                                value={formData.content}
                                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                placeholder="Share what you love about FunToolHub, how it has helped you, or any suggestions you might have..."
                                rows={6}
                                className="w-full px-4 py-3 bg-indigo-900/30 border border-violet-700/50 rounded-lg text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all duration-300 resize-none"
                                maxLength={500}
                            />
                            <div className="text-right text-sm text-violet-300 mt-1">
                                {formData.content.length}/500
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className=""
                        >
                            <motion.button
                                type="submit"
                                disabled={!formData.rating || !formData.content.trim() || isSubmitting}
                                whileHover={{ scale: formData.rating && formData.content.trim() ? 1.05 : 1 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${formData.rating && formData.content.trim()
                                        ? 'bg-gradient-to-r from-fuchsia-700 to-violet-800 hover:from-fuchsia-600 hover:to-violet-700 text-white shadow-lg hover:shadow-xl'
                                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                        />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-5 w-5" />
                                        Submit Testimonial
                                    </>
                                )}
                            </motion.button>
                        </motion.div>
                    </form>
                </motion.div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-8"
                >
                    <p className="text-violet-300 text-sm">
                        Your testimonial will be featured on our website to help others discover FunToolHub.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}