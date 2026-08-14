import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "What kind of wax do you use?",
    a: "Every COLOR & SCENT candle is made with 100% natural soy wax. Soy wax burns cleaner and longer than paraffin, is biodegradable, and supports sustainable farming. No paraffin, no petroleum, no compromises.",
  },
  {
    q: "How long do the candles burn?",
    a: "Our 8oz candles burn for approximately 45-55 hours. The 12oz size burns for 65-80 hours. To maximize burn time, always let the wax melt to the edges of the jar on the first burn (about 2-3 hours), and trim the wick to 1/4 inch before each lighting.",
  },
  {
    q: "How should I care for my candle?",
    a: "Trim the wick to 1/4 inch before each burn. Burn for 2-4 hours at a time to prevent tunneling. Keep away from drafts, children, and pets. Never leave a burning candle unattended. Stop using when 1/2 inch of wax remains.",
  },
  {
    q: "How long does shipping take?",
    a: "Orders ship within 2-4 business days from our US fulfillment center. Standard delivery is 5-7 business days within the US. Free shipping on all orders over $75.",
  },
  {
    q: "What's your return policy?",
    a: "We offer hassle-free 30-day returns. If you're not happy with your scent for any reason — wrong scent, not what you expected, changed your mind — we'll make it right with a full exchange or refund. No questions, no drama.",
  },
  {
    q: "Are your candles really vegan?",
    a: "Yes. Every COLOR & SCENT candle is 100% vegan and cruelty-free. We use plant-based soy wax, lead-free cotton wicks, and phthalate-free fragrance oils. Never tested on animals. Ever.",
  },
  {
    q: "Where are the candles made?",
    a: "Every candle is hand-poured in small batches in the USA. We don't outsource to mass production facilities. Each batch is hand-poured, hand-labeled, and hand-inspected before it ships to you.",
  },
]

export function ProductFAQ() {
  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-serif font-extrabold tracking-tight mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card border border-border rounded-xl px-5 data-[state=open]:border-primary/30"
            >
              <AccordionTrigger className="text-sm font-semibold text-left py-4 hover:no-underline hover:text-primary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}