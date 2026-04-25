import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Wallet, LogOut, PartyPopper, Loader2, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import confetti from "canvas-confetti";

export const Route = createFileRoute("/userdashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Your Kodbank Dashboard" }] }),
});

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [balance, setBalance] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [checking, setChecking] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate({ to: "/login" });
      }
    });
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        navigate({ to: "/login" });
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("user_id", data.session.user.id)
        .maybeSingle();
      setUsername(profile?.username ?? data.session.user.email ?? "Customer");
      setAuthChecked(true);
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const checkBalance = async () => {
    setChecking(true);
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      toast.error("Session expired. Please log in again.");
      navigate({ to: "/login" });
      return;
    }
    const { data, error } = await supabase
      .from("profiles")
      .select("balance")
      .eq("user_id", sessionData.session.user.id)
      .maybeSingle();
    setChecking(false);
    if (error || !data) {
      toast.error("Could not fetch balance.");
      return;
    }
    setBalance(Number(data.balance));
    setRevealed(true);
    // Confetti party!
    const fire = (particleRatio: number, opts: confetti.Options) =>
      confetti({
        origin: { y: 0.6 },
        ...opts,
        particleCount: Math.floor(200 * particleRatio),
      });
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.9 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Toaster richColors position="top-center" />

      <header className="container mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Wallet className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold">Kodbank</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </header>

      <main className="container mx-auto flex flex-col items-center px-6 py-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-muted-foreground"
        >
          Welcome back,
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display text-4xl font-bold sm:text-5xl"
        >
          {username} 👋
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, type: "spring" }}
          className="relative mt-12 w-full max-w-md"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 text-left shadow-elegant">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-primary-foreground/70">
                  Available Balance
                </p>
                <div className="mt-2 h-12">
                  <AnimatePresence mode="wait">
                    {revealed && balance !== null ? (
                      <motion.p
                        key="balance"
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="font-display text-4xl font-bold text-primary-foreground"
                      >
                        ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </motion.p>
                    ) : (
                      <motion.p
                        key="hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-display text-4xl font-bold text-primary-foreground/50"
                      >
                        ₹ • • • • •
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <Wallet className="h-8 w-8 text-primary-foreground/80" />
            </div>
            <div className="mt-12 flex items-end justify-between">
              <p className="font-mono text-sm text-primary-foreground/80">•••• •••• •••• 0420</p>
              <p className="font-display text-lg font-bold text-primary-foreground">Kodbank</p>
            </div>
          </div>
        </motion.div>

        <motion.button
          onClick={checkBalance}
          disabled={checking}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition disabled:opacity-60"
        >
          {checking ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : revealed ? (
            <>
              <PartyPopper className="h-5 w-5" />
              Check again
            </>
          ) : (
            <>
              <Eye className="h-5 w-5" />
              Check Balance
            </>
          )}
        </motion.button>

        {revealed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-sm text-muted-foreground"
          >
            🎉 Your balance is{" "}
            <span className="text-gradient font-bold">
              ₹{balance?.toLocaleString("en-IN")}
            </span>
          </motion.p>
        )}
      </main>
    </div>
  );
}
