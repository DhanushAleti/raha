import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppNav } from "@/components/app/app-nav";
import { signOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware already gates /app/*; this is defense in depth.
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-raha-cream">
      <header className="sticky top-0 z-30 border-b border-raha-ink/8 bg-white/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/app" className="font-display text-xl text-raha-ink">
            Raha
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-raha-ink/55 sm:inline">
              {user.email}
            </span>
            <form action={signOut}>
              <Button variant="ghost" size="sm" type="submit">
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </header>
      <div className="flex">
        <AppNav />
        <main className="min-w-0 flex-1 px-4 pb-24 pt-6 sm:px-8 sm:pb-10">
          {children}
        </main>
      </div>
    </div>
  );
}
