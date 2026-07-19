"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  IndianRupee,
  Landmark,
  FileText,
  FolderLock,
} from "lucide-react";

const LINKS = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/app/income", label: "Income", icon: IndianRupee, exact: false },
  { href: "/app/firc", label: "FIRC", icon: Landmark, exact: false },
  { href: "/app/invoices", label: "Invoices", icon: FileText, exact: false },
  { href: "/app/vault", label: "Vault", icon: FolderLock, exact: false },
] as const;

export function AppNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <nav
        aria-label="App navigation"
        className="hidden w-52 shrink-0 border-r border-raha-ink/8 bg-white p-4 sm:block"
      >
        <ul className="space-y-1">
          {LINKS.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-raha-green-soft text-raha-green"
                      : "text-raha-ink/65 hover:bg-raha-cream hover:text-raha-ink"
                  }`}
                >
                  <Icon className="size-4" aria-hidden />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile bottom tab bar */}
      <nav
        aria-label="App navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-raha-ink/10 bg-white/95 backdrop-blur sm:hidden"
      >
        <ul className="flex">
          {LINKS.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <li key={href} className="flex-1">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${
                    active ? "text-raha-green" : "text-raha-ink/50"
                  }`}
                >
                  <Icon className="size-5" aria-hidden />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
