"use client";

import { motion } from "framer-motion";
import { Search, Home, Key, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Search Properties",
      description:
        "Browse our extensive collection of rental properties filtered by your preferences.",
      color: "bg-primary/10",
      textColor: "text-primary",
    },
    {
      icon: Home,
      title: "Schedule Viewings",
      description:
        "Book appointments to visit your favorite properties at your convenience.",
      color: "bg-secondary/10",
      textColor: "text-secondary-foreground",
    },
    {
      icon: CheckCircle,
      title: "Apply for Rental",
      description:
        "Submit your application directly through our platform with all necessary documents.",
      color: "bg-accent/10",
      textColor: "text-accent-foreground",
    },
    {
      icon: Key,
      title: "Move In",
      description:
        "Get approved, sign the lease agreement, and receive keys to your new home.",
      color: "bg-primary/10",
      textColor: "text-primary",
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl my-16">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />

      <div className="container relative mx-auto px-4 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Nest Hunt <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Finding your perfect rental home has never been easier
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all h-full">
                <div className="flex flex-col items-center text-center">
                  <div className={`p-4 rounded-full ${step.color} mb-4`}>
                    <step.icon className={`w-8 h-8 ${step.textColor}`} />
                  </div>

                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-1 bg-primary/30 z-10"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
