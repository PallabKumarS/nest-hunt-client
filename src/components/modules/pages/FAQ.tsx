"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Search,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category:
    | "general"
    | "renting"
    | "listing"
    | "account"
    | "payment"
    | "property";
}

const allFaqData: FAQItem[] = [
  // General Questions
  {
    id: "1",
    category: "general",
    question: "What is Nest Hunt?",
    answer:
      "Nest Hunt is a comprehensive real estate platform that connects property owners and tenants. Whether you're looking to rent a home or list your property, our platform provides a secure, user-friendly environment for all your real estate needs.",
  },
  {
    id: "2",
    category: "general",
    question: "How do I get started on Nest Hunt?",
    answer:
      "Getting started is easy! Simply create an account by clicking the 'Sign Up' button. You can then browse rental properties as a tenant or start listing your properties as a landlord. Our onboarding process will guide you through setting up your profile.",
  },
  {
    id: "3",
    category: "general",
    question: "Is Nest Hunt free to use?",
    answer:
      "Yes, creating an account and browsing properties is completely free. For landlords, we charge a small commission only when you successfully rent out a property. There are no upfront fees or monthly charges.",
  },

  // Renting Questions
  {
    id: "4",
    category: "renting",
    question: "How do I search for rental properties?",
    answer:
      "You can search for properties using our search bar at the top of the page. Use filters to narrow down results by location, price range, number of bedrooms, and more. Our advanced search helps you find exactly what you're looking for.",
  },
  {
    id: "5",
    category: "renting",
    question: "How do I contact a landlord?",
    answer:
      "Once you find a property you're interested in, click on the listing to view details. You'll find contact options to message the landlord directly through our secure messaging system or view their contact information if provided.",
  },
  {
    id: "6",
    category: "renting",
    question: "What if I have issues with a property after moving in?",
    answer:
      "We encourage tenants and landlords to communicate clearly about property conditions and expectations. If issues arise, you can contact our support team who will help mediate and find a fair resolution.",
  },

  // Listing Questions
  {
    id: "7",
    category: "listing",
    question: "How do I list a property for rent?",
    answer:
      "Navigate to your dashboard and click 'Create Listing'. Fill in the property details, upload high-quality photos, set your rental price, and publish. Make sure to write detailed descriptions and highlight key features to attract more potential tenants.",
  },
  {
    id: "8",
    category: "listing",
    question: "What fees do landlords pay?",
    answer:
      "Landlords pay a small commission fee only when a property is successfully rented. There are no listing fees or monthly charges - you only pay when you secure a tenant.",
  },
  {
    id: "9",
    category: "listing",
    question: "How do I manage my property listings?",
    answer:
      "Use your landlord dashboard to view, edit, or delete your listings. You can update rental prices, modify descriptions, add more photos, or mark properties as rented. The dashboard provides analytics on views and inquiries too.",
  },
  // Account Questions
  {
    id: "10",
    category: "account",
    question: "How do I update my profile information?",
    answer:
      "Go to your account settings from the user menu. Here you can update your personal information, contact details, profile picture, and preferences. Keep your information current for better user experience.",
  },
  {
    id: "11",
    category: "account",
    question: "Can I have both tenant and landlord accounts?",
    answer:
      "Yes! A single account allows you to both rent and list properties on our platform. You can switch between tenant and landlord modes easily from your dashboard.",
  },
  {
    id: "12",
    category: "account",
    question: "How do I delete my account?",
    answer:
      "If you wish to delete your account, please contact our support team. We'll help you through the process and ensure all your data is handled according to our privacy policy.",
  },

  // Payment Questions
  {
    id: "13",
    category: "payment",
    question: "What payment methods do you accept?",
    answer:
      "We support various payment methods including credit/debit cards, digital wallets, and bank transfers. All payments are processed securely through our encrypted payment system.",
  },
  {
    id: "14",
    category: "payment",
    question: "When do landlords receive payment?",
    answer:
      "Landlords receive payment after successful lease signing and any applicable waiting period for tenant protection. Payment processing typically takes 2-5 business days depending on the payment method.",
  },
  {
    id: "15",
    category: "payment",
    question: "Are my payment details secure?",
    answer:
      "Absolutely! We use industry-standard encryption and security measures to protect all payment information. We never store your complete payment details on our servers.",
  },

  // Property Questions
  {
    id: "16",
    category: "property",
    question: "How are property inspections handled?",
    answer:
      "Property inspections are typically arranged between landlords and potential tenants. Some landlords offer virtual tours, while others may require in-person visits. Check the listing details for specific viewing information.",
  },
  {
    id: "17",
    category: "property",
    question: "Can I request additional property information?",
    answer:
      "Yes, you can request additional details about any property through our messaging system. We encourage landlords to provide comprehensive information and respond promptly to inquiries.",
  },
  {
    id: "18",
    category: "property",
    question: "What if a property doesn't match its description?",
    answer:
      "If you find significant discrepancies between a property listing and the actual property, please contact our support team. We take listing accuracy very seriously and will investigate any reported issues.",
  },
];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const categories = [
    { id: "all", label: "All Questions", icon: HelpCircle },
    { id: "general", label: "General", icon: HelpCircle },
    { id: "renting", label: "Renting", icon: Search },
    { id: "listing", label: "Listing", icon: MessageCircle },
    { id: "account", label: "Account", icon: HelpCircle },
    { id: "payment", label: "Payment", icon: HelpCircle },
    { id: "property", label: "Property", icon: HelpCircle },
  ];

  const filteredFAQs = allFaqData.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="py-16 lg:py-24">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Help Center
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about using Nest Hunt. Can&apos;t
            find what you&apos;re looking for? Contact our support team for
            personalized assistance.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-border rounded-xl bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border"
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* FAQ Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredFAQs.map((faq) => (
            <motion.div
              key={faq.id}
              variants={itemVariants}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                    openItems.includes(faq.id) ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openItems.includes(faq.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No questions found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse different categories.
            </p>
          </motion.div>
        )}
        {/* Contact Support */}
        <motion.div
          className="bg-card border border-border rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Still Need Help?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Our support team
            is here to help you with any questions or concerns you may have.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col items-center p-6 bg-background rounded-xl border border-border hover:shadow-md transition-all">
              <MessageCircle className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Get instant help from our support team
              </p>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Start Chat
              </button>
            </div>

            <div className="flex flex-col items-center p-6 bg-background rounded-xl border border-border hover:shadow-md transition-all">
              <Mail className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">
                Email Support
              </h3>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Send us an email and we&apos;ll respond within 24 hours
              </p>
              <a
                href="mailto:support@nesthunt.com"
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
              >
                Send Email
              </a>
            </div>

            <div className="flex flex-col items-center p-6 bg-background rounded-xl border border-border hover:shadow-md transition-all sm:col-span-2 lg:col-span-1">
              <Phone className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">
                Phone Support
              </h3>
              <p className="text-sm text-muted-foreground mb-4 text-center">
                Call us during business hours for immediate assistance
              </p>
              <a
                href="tel:+15551234567"
                className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00
              PM (EST)
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
