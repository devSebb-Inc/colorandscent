import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "FAQ — COLOR & SCENT",
  description: "Frequently asked questions about COLOR & SCENT candles — soy wax, burn time, shipping, returns, and more.",
}

const faqs = [
  {
    question: "What kind of wax do you use?",
    answer: "We use 100% natural soy wax — no paraffin, no petroleum, no compromises. Soy wax is biodegradable, burns cleaner, and lasts longer than traditional paraffin wax.",
  },
  {
    question: "How long does a candle burn?",
    answer: "Our 8oz candles burn for 45-55 hours, and our 12oz candles burn for 65-80 hours. For the best burn, let the wax melt to the edges of the jar on the first burn (2-3 hours), and trim the wick to 1/4 inch before each lighting.",
  },
  {
    question: "Do you offer free shipping?",
    answer: "Yes! Orders over $75 qualify for free standard shipping within the USA.",
  },
  {
    question: "What's your return policy?",
    answer: "We offer 30-day hassle-free returns. If you're not happy with your scent for any reason, contact us and we'll sort it out — exchange, store credit, or refund, your choice.",
  },
  {
    question: "How should I care for my candle?",
    answer: "Trim the wick to 1/4 inch before each burn. Burn for 2-4 hours at a time to prevent tunneling. Keep away from drafts, children, and pets. Never leave a burning candle unattended. Stop using when 1/2 inch of wax remains at the bottom.",
  },
  {
    question: "Are your candles really vegan and eco-friendly?",
    answer: "Absolutely. Every candle is 100% vegan, cruelty-free, and made with eco-friendly ingredients. Soy wax, cotton wicks, phthalate-free fragrance oils, and recyclable packaging. No animal testing, no synthetic shortcuts.",
  },
  {
    question: "Can I use a discount code?",
    answer: "Absolutely! Enter your code in the cart or at checkout. First-time customers can use code SCENT15 for 15% off. You can also join our newsletter to get an exclusive welcome code.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently we ship to the USA, Canada, UK, Australia, and New Zealand. International shipping is calculated at checkout. We're working on expanding to more countries — stay tuned.",
  },
]

export default function FAQPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-extrabold tracking-tight mb-4">FAQ</h1>
          <p className="text-muted-foreground">
            Everything you need to know about our candles. Can&apos;t find your answer?{" "}
            <a href="/contact" className="text-primary hover:underline">
              Contact us
            </a>
            .
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card border border-border rounded-2xl px-6"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}