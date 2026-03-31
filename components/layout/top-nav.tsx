"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RequestWizardModal } from "@/components/requests/request-wizard-modal";

const primaryNavItems = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "Resources", href: "/materials" },
  { label: "Requests", href: "/requests" },
  { label: "Activity", href: "/activity" },
  { label: "Op Reviews", href: "/review-cycles" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavItem({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative whitespace-nowrap px-3 py-2 text-sm font-medium transition ${
        isActive ? "text-slate-950" : "text-slate-700 hover:text-slate-950"
      }`}
    >
      <span className="relative inline-block px-[3px] pb-[7px]">
        {label}
        <span
          className={`pointer-events-none absolute left-0 right-0 -bottom-[1px] h-[5px] rounded-[999px] transition ${
            isActive ? "bg-sky-500" : "bg-transparent group-hover:bg-slate-200"
          }`}
        />
      </span>
    </Link>
  );
}

export function TopNav() {
  const pathname = usePathname();
  const [isUtilityTrayOpen, setIsUtilityTrayOpen] = useState(false);
  const trayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!trayRef.current) {
        return;
      }

      if (!trayRef.current.contains(event.target as Node)) {
        setIsUtilityTrayOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsUtilityTrayOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    setIsUtilityTrayOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6">
        <div className="flex min-h-[72px] flex-col justify-center py-3 xl:min-h-[78px] xl:py-2">
          <div className="flex items-center justify-between gap-4 xl:flex-nowrap">
            <Link
              href="/"
              className="shrink-0 whitespace-nowrap text-lg font-semibold text-slate-950 sm:text-xl"
            >
              SageSure PPP Demo
            </Link>

            <nav className="hidden min-w-0 flex-1 items-center justify-center xl:flex">
              <div className="flex min-w-0 flex-nowrap items-center justify-center gap-1.5">
                {primaryNavItems.map((item) => {
                  const isActive = isActivePath(pathname, item.href);
                  return <NavItem key={item.href} href={item.href} label={item.label} isActive={isActive} />;
                })}
              </div>
            </nav>

            <div className="hidden shrink-0 items-center gap-2 xl:flex">
              <Link
                href="/search"
                className="rounded-2xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Search
              </Link>
              <RequestWizardModal
                triggerLabel="Ask SageSure"
                triggerClassName="rounded-2xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              />
            </div>
          </div>

          <div className="mt-3 hidden items-start justify-between gap-4 md:flex xl:hidden">
            <nav className="min-w-0 flex-1 overflow-x-auto">
              <div className="flex min-w-max flex-nowrap items-center gap-1.5 pr-1">
                {primaryNavItems.map((item) => {
                  const isActive = isActivePath(pathname, item.href);
                  return <NavItem key={item.href} href={item.href} label={item.label} isActive={isActive} />;
                })}
              </div>
            </nav>

            <div ref={trayRef} className="relative shrink-0">
              <button
                type="button"
                aria-expanded={isUtilityTrayOpen}
                aria-label="Toggle navigation utilities"
                onClick={() => setIsUtilityTrayOpen((open) => !open)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-700 transition hover:bg-slate-50"
              >
                <span className={`text-base transition-transform ${isUtilityTrayOpen ? "rotate-180" : "rotate-0"}`}>
                  ▾
                </span>
              </button>

              {isUtilityTrayOpen ? (
                <div className="absolute right-0 top-[calc(100%+8px)] w-44 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/search"
                      className="rounded-2xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      Search
                    </Link>
                    <RequestWizardModal
                      triggerLabel="Ask SageSure"
                      triggerClassName="rounded-2xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-3 md:hidden">
            <div className="flex items-center justify-between gap-4">
              <div className="text-lg font-semibold text-slate-950 opacity-0 select-none">SageSure PPP Demo</div>

              <div ref={trayRef} className="relative shrink-0">
                <button
                  type="button"
                  aria-expanded={isUtilityTrayOpen}
                  aria-label="Toggle navigation utilities"
                  onClick={() => setIsUtilityTrayOpen((open) => !open)}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  More
                  <span className={`text-base transition-transform ${isUtilityTrayOpen ? "rotate-180" : "rotate-0"}`}>
                    ▾
                  </span>
                </button>

                {isUtilityTrayOpen ? (
                  <div className="absolute right-0 top-[calc(100%+8px)] z-10 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/search"
                        className="rounded-2xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        Search
                      </Link>
                      <RequestWizardModal
                        triggerLabel="Ask SageSure"
                        triggerClassName="rounded-2xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <nav className="w-full">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {primaryNavItems.map((item) => {
                  const isActive = isActivePath(pathname, item.href);
                  return <NavItem key={item.href} href={item.href} label={item.label} isActive={isActive} />;
                })}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}