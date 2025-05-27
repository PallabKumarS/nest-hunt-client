"use client";

import { logout, userSelector } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Testimonials = () => {
  const router = useRouter();
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Tenant",
      image:
        "https://res.cloudinary.com/dchqfpvjb/image/upload/v1735564183/cld-sample.jpg",
      content:
        "Found my dream apartment within days! The platform's search features made it incredibly easy to filter and find exactly what I was looking for in my ideal neighborhood.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Property Owner",
      image:
        "https://res.cloudinary.com/dchqfpvjb/image/upload/v1735564182/samples/woman-on-a-football-field.jpg",
      content:
        "As a landlord, I've had great success listing my properties on Nest Hunt. The process is streamlined and the support team is excellent at helping me find reliable tenants.",
      rating: 5,
    },
    {
      name: "Emma Davis",
      role: "First-time Renter",
      image:
        "https://res.cloudinary.com/dchqfpvjb/image/upload/v1735564179/samples/two-ladies.jpg",
      content:
        "The detailed property descriptions and virtual tours saved me so much time. I could explore multiple apartments from home before scheduling in-person viewings.",
      rating: 5,
    },
    {
      name: "David Rodriguez",
      role: "Real Estate Investor",
      image:
        "https://res.cloudinary.com/dchqfpvjb/image/upload/v1735564182/samples/man-portrait.jpg",
      content:
        "Nest Hunt has transformed my rental business! I've expanded my tenant base significantly and the secure payment system makes rent collection hassle-free.",
      rating: 5,
    },
    {
      name: "Lisa Thompson",
      role: "Long-term Tenant",
      image:
        "https://res.cloudinary.com/dchqfpvjb/image/upload/v1735564181/samples/people/smiling-man.jpg",
      content:
        "Amazing customer service and quality properties. I've rented multiple homes through Nest Hunt over the years, and each experience has been better than the last. Highly recommended!",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "Urban Apartment Hunter",
      image:
        "https://res.cloudinary.com/dchqfpvjb/image/upload/v1735564180/samples/people/boy-snow-hoodie.jpg",
      content:
        "The user interface is intuitive and modern. Finding apartments with specific amenities has never been easier. The virtual tours and detailed floor plans were incredibly helpful!",
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-primary" />
            Resident Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            What Our <span className="text-primary">Residents Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover why thousands of people trust Nest Hunt for their housing
            needs. Real stories from real residents who found their perfect home.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <Quote className="w-8 h-8 text-primary/30 flex-shrink-0 mt-1" />
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
              </div>

              <blockquote className="text-muted-foreground mb-6 leading-relaxed italic">
                &quot;{testimonial.content}&quot;
              </blockquote>

              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/10">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistics Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12"
          variants={itemVariants}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Average Property Rating</p>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <p className="text-sm text-muted-foreground">Happy Residents</p>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <p className="text-sm text-muted-foreground">Tenant Satisfaction Rate</p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div className="text-center" variants={itemVariants}>
          <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Find Your Dream Home Today
            </h3>
            <p className="text-muted-foreground mb-6">
              Experience the difference that quality properties and exceptional
              service can make. Start your home search with Nest Hunt today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user?.role !== "tenant" && (
                <button
                  onClick={() => router.push("/listings")}
                  className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Browse Properties
                </button>
              )}
              {user?.role !== "landlord" && (
                <button
                  onClick={() => {
                    dispatch(logout());
                    router.push(
                      `/login?redirectPath=/dashboard/landlord/create-listing`
                    );
                  }}
                  className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors"
                >
                  Become a Landlord
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
