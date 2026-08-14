"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Mail } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        toast.success("You're in! Welcome to the COLOR & SCENT family.", { icon: "🕯️" })
        setEmail("")
      } else {
        const data = await res.json()
        toast.error(data.error ?? "Something went wrong")
      }
    } catch {
      toast.error("Could not subscribe. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#F6F0E7] px-4 py-20 md:py-24">
      <div className="relative z-10 mx-auto max-w-2xl rounded-[2rem] border border-black/10 bg-[#FFF8EF]/80 px-6 py-12 text-center shadow-[0_24px_80px_rgba(23,20,18,0.06)]">
        <span className="text-5xl block mb-6">🕯️</span>
        <h2 className="font-serif font-extrabold tracking-tight leading-none mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
          Never Miss a <span className="gradient-text">Drop.</span>
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto mb-8">
          First access to new scents, gift ideas, cozy room notes, and seasonal candle care.
        </p>

        <form onSubmit={handleSubmit} className="flex items-center gap-3 max-w-md mx-auto">
          <div className="relative flex-1">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full pl-10 pr-4 py-3.5 bg-[#F6F0E7] border border-[#D8CABB] rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3.5 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground font-semibold text-sm rounded-xl transition-colors whitespace-nowrap"
          >
            {loading ? "..." : "Subscribe"}
          </button>
        </form>
        <p className="text-[10px] font-mono text-muted-foreground/50 mt-4 tracking-wider">
          No spam. Unsubscribe anytime. We respect your inbox.
        </p>
      </div>
    </section>
  )
}