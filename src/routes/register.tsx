import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Wallet, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  head: () => ({ meta: [{ title: "Create your Kodbank account" }] }),
});

function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/userdashboard`,
        data: { username: form.username, phone: form.phone, role: "Customer" },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created! Please log in.");
    navigate({ to: "/login" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <Toaster richColors position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Wallet className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold">Kodbank</span>
        </Link>

        <div className="rounded-3xl glass p-8 shadow-elegant">
          <h1 className="font-display text-3xl font-bold">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Get a <span className="text-primary font-semibold">100,000</span> welcome balance
            instantly.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Field label="Username" value={form.username} onChange={onChange("username")} required />
            <Field label="Email" type="email" value={form.email} onChange={onChange("email")} required />
            <Field label="Phone" value={form.phone} onChange={onChange("phone")} />
            <Field
              label="Password"
              type="password"
              value={form.password}
              onChange={onChange("password")}
              required
              minLength={6}
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-4 py-3 font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02] disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <input
        {...props}
        className="mt-1.5 w-full rounded-xl border border-border bg-input/40 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </label>
  );
}
