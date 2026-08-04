"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  Mail,
  Settings,
  BarChart3,
  LogOut,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/collections", label: "Collections", icon: Layers },
  { href: "/admin/discounts", label: "Discounts", icon: Tag },
  { href: "/admin/email", label: "Subscribers", icon: Mail },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/seo", label: "SEO", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" })
    router.push("/admin/login")
  }

  return (
    <aside className="w-56 border-r border-border bg-card flex flex-col shrink-0">
      {/* Logo */}
      <div className="p-5 border-b border-border/80 bg-gradient-to-b from-primary/5 via-transparent to-transparent">
        <Link href="/admin" className="group block">
          <motion.div
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-background via-card to-background px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_45%),linear-gradient(135deg,transparent,rgba(255,255,255,0.06),transparent)] opacity-80" />
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/10 blur-2xl" />
            <div className="relative flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 8, 0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
              >
                <Sparkles className="h-5 w-5" />
              </motion.div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Mission</span>
                  <motion.span
                    animate={{ opacity: [0.35, 1, 0.35] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary"
                  >
                    Live
                  </motion.span>
                </div>
                <span className="block text-lg font-black tracking-[0.22em] text-foreground">CONTROL</span>
                <span className="block text-[11px] text-muted-foreground">Command center</span>
              </div>
            </div>
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-3 top-3 text-primary/70"
            >
              <Zap className="h-4 w-4" />
            </motion.div>
          </motion.div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href, item.exact)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Store link + Logout */}
      <div className="p-3 border-t border-border space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          View Store ↗
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
