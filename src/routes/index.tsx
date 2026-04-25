import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Wallet, ArrowRight, Lock, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="container mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Wallet className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold">Kodbank</span>
        </div>
        <nav className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
          >
            Get started
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 pb-24 pt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          New customers get a 100,000 welcome balance
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display mx-auto mt-6 max-w-3xl text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl"
        >
          Banking that feels
          <br />
          <span className="text-gradient">effortlessly modern.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
        >
          Sign up in seconds, log in securely, and check your balance with a delightful celebration every time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
          >
            Open an account
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 text-base font-semibold text-foreground transition hover:bg-secondary"
          >
            I already have an account
          </Link>
        </motion.div>

        {/* Floating card preview */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
          className="mx-auto mt-20 max-w-md"
        >
          <div className="relative rounded-3xl bg-gradient-primary p-8 text-left shadow-elegant">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-primary-foreground/70">
                  Available Balance
                </p>
                <p className="font-display mt-2 text-4xl font-bold text-primary-foreground">
                  ₹100,000.00
                </p>
              </div>
              <Wallet className="h-8 w-8 text-primary-foreground/80" />
            </div>
            <div className="mt-12 flex items-end justify-between">
              <p className="font-mono text-sm text-primary-foreground/80">•••• •••• •••• 0420</p>
              <p className="font-display text-lg font-bold text-primary-foreground">Kodbank</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto grid gap-6 px-6 pb-24 sm:grid-cols-3">
        {[
          { icon: Lock, title: "Bank-grade security", desc: "Encrypted passwords & verified sessions on every request." },
          { icon: Zap, title: "Instant access", desc: "Log in and view your balance with zero friction." },
          { icon: ShieldCheck, title: "Customer first", desc: "Built around the customer experience from day one." },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl glass p-6 transition hover:shadow-glow">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-display mt-4 text-lg font-bold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </section>

      <footer className="container mx-auto border-t border-border px-6 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Kodbank. Built with care.
      </footer>
    </div>
  );
}
