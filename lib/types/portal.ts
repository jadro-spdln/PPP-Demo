"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlobalSearch } from "@/components/layout/global-search";
import { RequestWizardModal } from "@/components/requests/request-wizard-modal";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/materials", label: "Resources" },
  { href: "/open-work", label: "Requests" },
  { href: "/activity", label: "Activity" },
  { href: "/search", label: "Search" },
  { href: "/review-cycles", label: "Op Reviews" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:gap-8">
          <Link href="/" className="text-lg font-semibold text-slate-900">
            SageSure PPP Demo
          </Link>

          <nav className="flex flex-wrap gap-5">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition ${
                    isActive
                      ? "text-slate-900"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <GlobalSearch />
          <RequestWizardModal
            triggerLabel="Ask SageSure"
            triggerClassName="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          />
        </div>
      </div>
    </header>
  );
}