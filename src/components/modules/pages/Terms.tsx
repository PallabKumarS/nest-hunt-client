"use client";

import Container from "@/components/shared/Container";
import { motion } from "framer-motion";
import { ScrollText, CheckCircle, AlertCircle, HelpCircle } from "lucide-react";

const Terms = () => {
  const termsData = [
    {
      title: "Account Terms",
      icon: CheckCircle,
      items: [
        "You must be 18 years or older to use this service",
        "You must provide accurate and complete registration information",
        "You are responsible for maintaining your account security",
        "We reserve the right to suspend accounts that violate our terms",
      ],
    },
    {
      title: "Property Listings",
      icon: ScrollText,
      items: [
        "All listings must be accurate and up-to-date",
        "Images must be authentic and represent the actual property",
        "Pricing information must be current and transparent",
        "Sellers must have legal rights to list properties",
      ],
    },
    {
      title: "User Responsibilities",
      icon: AlertCircle,
      items: [
        "Users must not engage in fraudulent activities",
        "Respect other users' privacy and personal information",
        "Report any suspicious or inappropriate content",
        "Follow local real estate laws and regulations",
      ],
    },
    {
      title: "Service Usage",
      icon: HelpCircle,
      items: [
        "The service is provided 'as is' without warranties",
        "We may modify or terminate services at any time",
        "Users agree to receive service-related communications",
        "Usage data may be collected to improve services",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Container>
      <motion.div
        className="py-16 space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">Terms of Service</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using Nest Hunt&apos;s services.
          </p>
        </motion.div>

        {/* Effective Date */}
        <motion.div
          variants={itemVariants}
          className="text-center text-sm text-muted-foreground"
        >
          Effective Date: January 1, 2024
        </motion.div>

        {/* Terms Sections */}
        <motion.div className="grid gap-8 md:grid-cols-2">
          {termsData.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-6 rounded-xl border bg-card hover:shadow-lg transition-all"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <section.icon className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="text-primary">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Agreement Section */}
        <motion.div
          variants={itemVariants}
          className="bg-primary/5 rounded-2xl p-8 text-center space-y-4"
        >
          <h2 className="text-2xl font-semibold">Agreement to Terms</h2>
          <p className="text-muted-foreground">
            By accessing or using Nest Hunt&apos;s services, you agree to be bound by
            these terms and conditions. If you disagree with any part of the
            terms, you may not access our services.
          </p>
        </motion.div>

        {/* Contact Section */}
        <motion.div variants={itemVariants} className="text-center space-y-2">
          <p className="text-muted-foreground">
            Questions about our Terms of Service?
          </p>
          <p className="text-primary font-medium">
            Contact us at legal@nesthunt.com
          </p>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Terms;
