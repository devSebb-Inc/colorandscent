import Image from "next/image"
import Link from "next/link"
import { products } from "@/lib/data/products"

export function GiftBundleTeaser() {
  const set = products.find((p) => p.slug === "essentials-collection") ?? products[0]

  return (
    <section className="bg-[#F6F0E7] px-4 pb-20 md:pb-24">
      <div className="mx-auto grid max-w-[1400px] overflow-hidden rounded-[2rem] border border-black/10 bg-[#FFF8EF] shadow-[0_24px_90px_rgba(23,20,18,0.08)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="p-6 text-[#171412] md:p-10 lg:p-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#74725F]">Gift path</p>
          <h2 className="mt-4 max-w-lg font-serif text-4xl font-semibold leading-[0.95] tracking-tight md:text-6xl">Make gifting feel personal.</h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-[#74725F]">Choose a small set for the rooms they love most, or start with the Essentials Collection as an easy, elegant first gift.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/products/${set.slug}`} className="rounded-full bg-[#171412] px-5 py-3 text-sm font-semibold text-[#F6F0E7] transition hover:bg-[#2A211B]">Shop starter set</Link>
            <Link href="/products?category=Gift%20Sets" className="rounded-full border border-black/15 px-5 py-3 text-sm font-semibold text-[#171412] transition hover:border-black/35">Browse gifts</Link>
          </div>
        </div>
        <div className="relative min-h-[320px] bg-[#171412] p-6 text-[#F6F0E7] md:p-10">
          <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-[#B98235]/80 blur-3xl" />
          <div className="absolute bottom-12 right-16 h-28 w-28 rounded-full bg-[#B58A8B]/50 blur-3xl" />
          <div className="relative ml-auto flex max-w-sm flex-col gap-4 rounded-[1.75rem] border border-white/12 bg-white/[0.08] p-4 shadow-2xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-white/10">
              <Image src={set.image} alt={set.name} fill className="object-cover" sizes="420px" />
            </div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{set.subtitle}</p>
                <h3 className="mt-1 font-serif text-2xl font-semibold">{set.name}</h3>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold">${set.price}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
