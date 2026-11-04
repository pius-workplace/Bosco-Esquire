import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../lib/cart";
import { scrollToEl, scrollToTop } from "../lib/motion";
import { asset } from "../lib/asset";

// `section` links jump to a part of the home page; `short` is used on smaller laptops.
const links: { to: string; label: string; short?: string; section?: string }[] = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/", label: "Why Buy From Us", short: "Why Us", section: "why-us" },
  { to: "/about", label: "About Us" },
  { to: "/visit", label: "Visit the Shop" },
  { to: "/journal", label: "Journal" },
  { to: "/trade", label: "Trade & Gifting" },
  { to: "/faq", label: "FAQs" },
];

export default function Nav() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const overHero = pathname === "/" && !scrolled;
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setMenu(false), [pathname]);
  // Clicking a link to the page you're already on would otherwise do nothing
  // (and leave the mobile menu open) — close the menu and go back to the top.
  const go = (to: string, section?: string) => (e: React.MouseEvent) => {
    setMenu(false);
    if (section) {
      e.preventDefault();
      const el = pathname === to && document.getElementById(section);
      if (el) scrollToEl(el, 0);
      else navigate(to, { state: { scrollTo: section } });
      return;
    }
    if (to === pathname) scrollToTop(false);
  };
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${overHero ? "py-5 text-white" : "py-3 text-ink bg-white/85 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,.06)]"}`}
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 flex items-center justify-between gap-6">
          <Link
            to="/"
            onClick={go("/")}
            className="flex items-center gap-3 shrink-0"
            aria-label="Bosco Esquire home"
          >
            <img src={asset("img/logo.png")} alt="" className="w-11 h-11" />
            <span className="leading-none">
              <span className="block font-display font-extrabold text-xl lg:text-lg xl:text-xl tracking-tight">
                BOSCO ESQUIRE
              </span>
              <span
                className={`block lg:hidden xl:block text-[10px] tracking-[.3em] uppercase mt-1 ${overHero ? "text-amber" : "text-honey"}`}
              >
                Organically & Bespokely You
              </span>
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 text-[13px] xl:text-[14px] font-semibold whitespace-nowrap">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                end
                onClick={go(l.to, l.section)}
                className={({ isActive }) =>
                  `relative py-1 after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-amber after:transition-all ${isActive && !l.section ? "after:w-full" : "after:w-0 hover:after:w-full"}`
                }
              >
                {l.short ? (
                  <>
                    <span className="xl:hidden">{l.short}</span>
                    <span className="hidden xl:inline">{l.label}</span>
                  </>
                ) : (
                  l.label
                )}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="relative w-12 h-12 rounded-full grid place-items-center bg-amber text-cocoa hover:scale-105 transition"
              aria-label={`Cart, ${count} items`}
            >
              <ShoppingBag size={20} strokeWidth={2.2} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full bg-cocoa text-amber text-[11px] font-bold grid place-items-center">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenu(true)}
              className="lg:hidden w-12 h-12 grid place-items-center"
              aria-label="Open menu"
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-[60] bg-cocoa text-white transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${menu ? "[clip-path:circle(150%_at_100%_0)]" : "[clip-path:circle(0%_at_100%_0)]"}`}
      >
        <button
          onClick={() => setMenu(false)}
          className="absolute right-5 top-5 w-12 h-12 grid place-items-center"
          aria-label="Close menu"
        >
          <X />
        </button>
        <nav className="h-full flex flex-col justify-center px-8 gap-3 overflow-y-auto py-20">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={go(l.to, l.section)}
              className="display-m hover:text-amber"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
