import {
  Suspense,
  lazy,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, MapPin, Move3d, Rotate3d } from "lucide-react";
import {
  gsap,
  ScrollTrigger,
  splitWords,
  reduceMotion,
  scrollToEl,
} from "../lib/motion";
import { asset } from "../lib/asset";
import { products, categories, bySlug, fmt } from "../data/products";
import { testimonials, reasons, articles } from "../data/content";
import ProductCard from "../components/ProductCard";
import { useCart } from "../lib/cart";

const Jar3D = lazy(() => import("../components/Jar3D"));
const Tour360 = lazy(() => import("../components/Tour360"));

/* ---------------- HERO ---------------- */
// Phones: three products across the top, butter beside the headline, tincture by the buttons.
// md and up: the original scattered desktop layout.
const floaters = [
  {
    src: "img/cut/honey.webp",
    cls: "left-[6%] top-[12%] w-[26vw] short-phone:top-[11%] short-phone:w-[16vw] md:left-auto md:right-[20%] md:top-[18%] md:w-[22vw] max-w-[360px] md:min-w-[130px]",
    depth: 1.2,
    r: -4,
  },
  {
    src: "img/cut/wine.webp",
    cls: "left-[45%] top-[15%] w-[13vw] short-phone:hidden md:left-auto md:right-[3%] md:top-[12%] md:w-[14vw] max-w-[230px] md:min-w-[90px]",
    depth: 0.8,
    r: 6,
  },
  {
    src: "img/cut/butter.webp",
    cls: "right-[4%] bottom-[420px] w-[19vw] md:bottom-auto md:right-[33%] md:top-[46%] md:w-[12vw] max-w-[250px] md:min-w-[110px]",
    depth: 1.6,
    r: -8,
  },
  {
    src: "img/cut/tincture.webp",
    cls: "right-[10%] bottom-[96px] w-[8vw] md:right-[9%] md:bottom-[11%] md:w-[6vw] max-w-[100px] md:min-w-[46px]",
    depth: 2,
    r: 10,
  },
  {
    src: "img/cut/nuts.webp",
    cls: "right-[5%] top-[11%] w-[22vw] short-phone:w-[15vw] short-phone:right-[18%] md:right-[42%] md:top-[13%] md:w-[11vw] max-w-[190px] md:min-w-[80px]",
    depth: 0.6,
    r: 8,
  },
  {
    src: "img/cut/leatherbag.webp",
    cls: "right-[14%] bottom-[-4%] w-[17vw] max-w-[280px] min-w-[120px] hidden md:block",
    depth: 1.4,
    r: -6,
  },
];

function Hero() {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>(".hero-char");
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-frame", {
        scale: 0.92,
        borderRadius: 60,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
      })
        .from(
          chars,
          {
            yPercent: 120,
            rotate: 6,
            duration: 1.1,
            stagger: 0.035,
            ease: "power4.out",
          },
          "-=0.9",
        )
        .from(
          ".hero-sub > *",
          {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.7",
        )
        .from(
          ".floater",
          {
            y: 160,
            scale: 0.6,
            opacity: 0,
            rotate: (i) => (i % 2 ? 25 : -25),
            stagger: 0.09,
            duration: 1.4,
            ease: "expo.out",
          },
          "-=1.1",
        )
        .from(
          ".hero-bee",
          {
            x: "-40vw",
            y: "30vh",
            rotate: -30,
            opacity: 0,
            duration: 2.2,
            ease: "power2.out",
          },
          "-=1.2",
        );
      // bee keeps wandering
      gsap.to(".hero-bee", {
        x: "+=60",
        y: "-=40",
        rotate: 8,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 3,
      });
      // scroll: content lifts, products scatter at different speeds, frame expands
      const st = {
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      gsap.to(".hero-copy", {
        yPercent: -40,
        opacity: 0,
        ease: "none",
        scrollTrigger: st,
      });
      gsap.to(".hero-frame", {
        inset: 0,
        borderRadius: 0,
        ease: "none",
        scrollTrigger: { ...st, end: "40% top" },
      });
      gsap.utils.toArray<HTMLElement>(".floater").forEach((el) => {
        const d = Number(el.dataset.depth);
        gsap.to(el, { yPercent: -60 * d, ease: "none", scrollTrigger: st });
      });
    }, root);
    // pointer parallax
    const move = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5,
        y = e.clientY / window.innerHeight - 0.5;
      root.current
        ?.querySelectorAll<HTMLElement>(".floater-inner")
        .forEach((el) => {
          const d = Number(el.dataset.depth);
          gsap.to(el, {
            x: -x * 40 * d,
            y: -y * 30 * d,
            duration: 1.2,
            ease: "power3.out",
          });
        });
    };
    window.addEventListener("pointermove", move);
    return () => {
      ctx.revert();
      window.removeEventListener("pointermove", move);
    };
  }, []);

  const word = (w: string) =>
    w.split("").map((c, i) => (
      <span key={i} className="mask-line">
        <span className="hero-char inline-block">{c}</span>
      </span>
    ));

  return (
    <section
      ref={root}
      className="relative h-[100svh] min-h-[680px] bg-cocoa overflow-hidden"
    >
      <div className="hero-frame absolute inset-2 md:inset-4 rounded-[28px] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={asset("media/hero.mp4")}
          poster={asset("media/hero-poster.jpg")}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cocoa via-cocoa/65 to-cocoa/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa/90 via-transparent to-cocoa/40" />
      </div>

      {floaters.map((f, i) => (
        <div
          key={i}
          className={`floater absolute z-10 pointer-events-none ${f.cls}`}
          data-depth={f.depth}
        >
          <div className="floater-inner" data-depth={f.depth}>
            <img
              src={asset(f.src)}
              alt=""
              className="w-full drop-shadow-[0_30px_40px_rgba(0,0,0,.55)]"
              style={{
                animation: `floaty ${5 + i}s ease-in-out ${i * 0.4}s infinite`,
                ["--r" as string]: `${f.r}deg`,
              }}
            />
          </div>
        </div>
      ))}
      <img
        src={asset("img/cut/bee.webp")}
        alt=""
        className="hero-bee absolute z-20 left-[46%] top-[58%] w-[9vw] min-w-[70px] max-w-[150px] pointer-events-none drop-shadow-2xl hidden sm:block"
      />

      <div className="hero-copy relative z-20 h-full mx-auto max-w-[1400px] px-6 md:px-12 flex flex-col justify-end pb-24 md:pb-20 text-white">
        <div className="hero-sub">
          <div className="eyebrow !text-amber mb-5">
            Kenyan organics · Handcrafted luxury
          </div>
        </div>
        <h1 className="display-xl">
          <span className="block whitespace-nowrap">{word("BOSCO")}</span>
          <span className="block whitespace-nowrap text-amber">
            {word("ESQUIRE")}
          </span>
        </h1>
        <div className="hero-sub mt-6 flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
          <p className="max-w-md text-lg text-white/85 leading-relaxed">
            <b className="text-white">Organically & Bespokely You.</b> Raw honey
            from Kenyan hives, body care, banana-honey wines and leather made by
            hand — all in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/shop" className="btn btn-amber">
              Shop the collection <ArrowRight size={18} />
            </Link>
            <Link to="/visit" className="btn btn-ghost text-white">
              <Rotate3d size={18} /> Visit our shop in 360°
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute z-20 inset-x-0 bottom-0 border-t border-white/10 bg-cocoa/60 backdrop-blur">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-3 flex gap-8 overflow-x-auto no-scrollbar text-[13px] font-semibold text-white/80 whitespace-nowrap">
          <span>Pay with M-Pesa</span>
          <span className="text-amber">●</span>
          <span>Delivery across Nairobi & Kenya</span>
          <span className="text-amber">●</span>
          <span>Shop at The Imaara Mall</span>
          <span className="text-amber">●</span>
          <span>Made by Kenyan hands</span>
          <span className="text-amber">●</span>
          <span>Real people on WhatsApp</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        onUpdate: (s) => {
          const v = gsap.utils.clamp(-12, 12, s.getVelocity() / 300);
          gsap.to(".mq-track", {
            skewX: -v,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  const items = [
    "Raw Honey",
    "Propolis",
    "Body Butters",
    "Banana-Honey Wine",
    "Handcrafted Leather",
    "Aromatherapy Candles",
    "Macadamia",
    "Coffee Brandy",
  ];
  return (
    <div ref={ref} className="bg-amber text-cocoa py-6 overflow-hidden">
      <div className="mq-track flex w-max animate-marquee">
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-8 pr-8 font-display font-extrabold uppercase text-[clamp(28px,4.6vw,64px)] leading-none"
          >
            {t}
            <svg width="26" height="30" viewBox="0 0 26 30">
              <path d="M13 0l13 7.5v15L13 30 0 22.5v-15z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- shared heading reveal ---------------- */
function useReveal(scope: React.RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context(() => {
      scope
        .current!.querySelectorAll<HTMLElement>("[data-split]")
        .forEach((el) => {
          const w = splitWords(el);
          gsap.from(w, {
            yPercent: 115,
            duration: 1,
            stagger: 0.05,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });
      scope
        .current!.querySelectorAll<HTMLElement>("[data-rise]")
        .forEach((el) => {
          gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });
    }, scope);
    return () => ctx.revert();
  }, [scope]);
}

/* ---------------- CATEGORIES ---------------- */
function Worlds() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".world", {
        clipPath: "inset(100% 0 0 0 round 24px)",
        duration: 1.3,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".worlds", start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  const spans = [
    "md:col-span-2 md:row-span-2",
    "",
    "",
    "md:row-span-2",
    "",
    "md:col-span-2",
  ];
  return (
    <section ref={ref} className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow">Shop by world</div>
            <h2 className="display-l mt-3 max-w-3xl" data-split>
              Everything good, in one place.
            </h2>
          </div>
          <Link to="/shop" className="btn btn-dark" data-rise>
            See all {products.length} products <ArrowRight size={18} />
          </Link>
        </div>
        <div className="worlds mt-12 grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[260px] gap-3 md:gap-4">
          {categories.map((c, i) => (
            <Link
              key={c.name}
              to={`/shop?cat=${encodeURIComponent(c.name)}`}
              className={`world group relative overflow-hidden rounded-[24px] ${spans[i]}`}
            >
              <img
                src={asset(c.image)}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition duration-[1.4s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/90 via-cocoa/20 to-transparent" />
              <div className="absolute left-5 right-5 bottom-5 text-white">
                <div className="text-[11px] tracking-[.25em] uppercase font-bold text-amber">
                  {c.collection === "atelier"
                    ? "Bosco Atelier"
                    : "Bosco Naturals"}
                </div>
                <div className="font-display font-extrabold text-2xl md:text-3xl leading-tight mt-1">
                  {c.name}
                </div>
                <div className="text-sm text-white/75 mt-1 flex items-center gap-2">
                  {c.blurb}
                  <ArrowRight
                    size={16}
                    className="transition -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- BESTSELLERS ---------------- */
function Bestsellers() {
  const ref = useRef<HTMLElement>(null);
  const [tab, setTab] = useState<"naturals" | "atelier">("naturals");
  useReveal(ref);
  const list = products
    .filter((p) => p.collection === tab && p.images.length)
    .sort((a, b) => Number(!!b.bestseller) - Number(!!a.bestseller))
    .slice(0, 8);
  useEffect(() => {
    gsap.fromTo(
      ".best-grid > *",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.8, ease: "power3.out" },
    );
  }, [tab]);
  return (
    <section ref={ref} className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow">Loved at the market</div>
            <h2 className="display-l mt-3" data-split>
              Our best sellers
            </h2>
          </div>
          <div className="flex p-1.5 bg-white rounded-full shadow-sm">
            {(["naturals", "atelier"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition ${tab === t ? "bg-cocoa text-white" : "text-bark"}`}
              >
                {t === "naturals" ? "Bosco Naturals" : "Bosco Atelier"}
              </button>
            ))}
          </div>
        </div>
        <div className="best-grid mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">
          {list.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHY BUY FROM US (pinned) ---------------- */
// Pinned image wipe on every screen size. Laptops show the full list beside the image;
// phones stack heading, image, then the current reason, so it all fits one screen.
function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [motion] = useState(() => !reduceMotion());
  useReveal(ref);
  useLayoutEffect(() => {
    if (!motion) return;
    const ctx = gsap.context(() => {
      const imgs = gsap.utils.toArray<HTMLElement>(".why-img");
      gsap.set(imgs.slice(1), { clipPath: "inset(100% 0 0 0)" });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".why-pin",
          start: "top top",
          end: `+=${reasons.length * 80}%`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (s) =>
            setActive(
              Math.min(
                reasons.length - 1,
                Math.floor(s.progress * reasons.length * 0.999),
              ),
            ),
        },
      });
      imgs.slice(1).forEach((img, i) => {
        tl.to(
          img,
          { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "none" },
          i + 0.5,
        ).fromTo(
          img.querySelector("img"),
          { scale: 1.3 },
          { scale: 1, duration: 1, ease: "none" },
          i + 0.5,
        );
      });
      tl.to({}, { duration: 0.5 });
    }, ref);
    return () => ctx.revert();
  }, [motion]);
  return (
    <section ref={ref} id="why-us" className="bg-cocoa text-white relative">
      <div
        className={`why-pin mx-auto max-w-[1400px] px-5 md:px-10 pt-24 pb-8 flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center lg:h-screen ${motion ? "h-[100svh] min-h-[600px]" : "pb-24"}`}
      >
        <div className="lg:hidden">
          <div className="eyebrow !text-amber">Why buy from us</div>
          <h2 className="display-m mt-2" data-split>
            Good things, honestly made.
          </h2>
        </div>
        <div
          className={`relative rounded-[28px] overflow-hidden lg:flex-none lg:h-[76vh] ${motion ? "flex-1 min-h-[180px]" : "h-[52vh] shrink-0"}`}
        >
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className="why-img absolute inset-0"
              style={{ zIndex: i }}
            >
              <img
                src={asset(r.image)}
                alt={r.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/70 to-transparent" />
            </div>
          ))}
          <img
            src={asset("img/logo.png")}
            alt=""
            className="absolute z-10 right-4 bottom-4 lg:right-5 lg:bottom-5 w-12 h-12 lg:w-16 lg:h-16"
          />
        </div>

        {/* phones: one reason at a time, swapping as the images wipe */}
        {motion && (
          <div className="lg:hidden">
            <div className="grid">
              {reasons.map((r, i) => (
                <div
                  key={r.title}
                  aria-hidden={i !== active}
                  className={`[grid-area:1/1] transition-all duration-500 ${i === active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}
                >
                  <h3 className="font-display font-extrabold text-2xl leading-tight">
                    {r.title}
                  </h3>
                  <p className="text-white/75 mt-2 text-[15px] leading-relaxed">
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              {reasons.map((r, i) => (
                <span
                  key={r.title}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-amber" : "w-3 bg-white/25"}`}
                />
              ))}
            </div>
          </div>
        )}

        <div className={motion ? "hidden lg:block" : ""}>
          <div className="eyebrow !text-amber hidden lg:block">
            Why buy from us
          </div>
          <h2 className="display-m mt-3 hidden lg:block" data-split>
            Good things, honestly made.
          </h2>
          <div className="lg:mt-10 space-y-2">
            {reasons.map((r, i) => (
              <div
                key={r.title}
                className={`border-t border-white/15 py-5 transition-all duration-500 ${i === active || !motion ? "opacity-100" : "lg:opacity-35"}`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`h-3 w-3 rotate-45 transition-colors ${i === active ? "bg-amber" : "bg-white/30"}`}
                  />
                  <h3 className="font-display font-extrabold text-2xl md:text-3xl">
                    {r.title}
                  </h3>
                </div>
                <p
                  className={`text-white/75 mt-3 pl-7 max-w-lg transition-all duration-500 overflow-hidden ${i === active || !motion ? "lg:max-h-40" : "lg:max-h-0"}`}
                >
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 3D JAR ---------------- */
function JarSection() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const honey = bySlug("raw-honey")!;
  const [v, setV] = useState(1);
  const { add, setOpen } = useCart();
  const [show3d, setShow3d] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow3d(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      className="relative bg-cream overflow-hidden py-24 md:py-32 honeycomb-bg"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
        <div className="relative h-[460px] md:h-[620px] rounded-[32px] bg-gradient-to-b from-amber/25 to-honey/10">
          {show3d && (
            <Suspense
              fallback={
                <img
                  src={asset("img/cut/honey.webp")}
                  alt=""
                  className="absolute inset-0 m-auto h-3/4"
                />
              }
            >
              <Jar3D size={honey.variants[v].label} />
            </Suspense>
          )}
          <div className="absolute left-5 bottom-5 flex items-center gap-2 bg-white/90 backdrop-blur rounded-full px-4 py-2 text-sm font-bold text-cocoa shadow">
            <Move3d size={18} /> Drag to turn the jar
          </div>
        </div>
        <div>
          <div className="eyebrow">See it in 3D</div>
          <h2 className="display-l mt-3" data-split>
            Turn it. Read it. Taste it.
          </h2>
          <p className="mt-5 text-lg text-bark max-w-lg" data-rise>
            Spin our raw honey jar the way you would on a market table. Every
            jar carries the Bosco mark, its source and its batch — and lab
            results appear here as each batch is tested.
          </p>
          <div className="mt-8 flex flex-wrap gap-2" data-rise>
            {honey.variants.map((x, i) => (
              <button
                key={x.label}
                onClick={() => setV(i)}
                className={`px-5 py-3 rounded-2xl border-2 text-left transition ${i === v ? "border-cocoa bg-cocoa text-white" : "border-cocoa/15 bg-white hover:border-cocoa/40"}`}
              >
                <div className="font-bold">{x.label}</div>
                <div
                  className={`text-sm ${i === v ? "text-amber" : "text-honey"}`}
                >
                  {fmt(x.price)}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3" data-rise>
            <button
              className="btn btn-amber"
              onClick={() => {
                add(
                  honey.slug,
                  honey.variants[v].label,
                  honey.variants[v].price,
                );
                setOpen(true);
              }}
            >
              Add {honey.variants[v].label} to basket —{" "}
              {fmt(honey.variants[v].price)}
            </button>
            <Link to="/product/raw-honey" className="btn btn-ghost">
              Full details
            </Link>
          </div>
          <ul className="mt-8 grid sm:grid-cols-3 gap-3 text-sm" data-rise>
            {[
              ["Source", "Bosco Farms & partner beekeepers"],
              ["Batch", "Printed on every jar"],
              ["Lab results", "Added as each batch is tested"],
            ].map(([a, b]) => (
              <li key={a} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="text-honey font-bold text-xs uppercase tracking-widest">
                  {a}
                </div>
                <div className="font-semibold mt-1">{b}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- HIVE TO HAND (horizontal) ---------------- */
const story = [
  {
    img: "img/products/bee-flower.jpg",
    title: "It starts with a bee",
    text: "Foraging Kenyan blooms from first light.",
  },
  {
    img: "img/products/bee-hive.jpg",
    title: "Thousands of tiny hands",
    text: "Comb is capped only when the honey is ready.",
  },
  {
    img: "img/products/honey.jpg",
    title: "Straight into the jar",
    text: "Strained, never cooked, sealed with the Bosco mark.",
  },
  {
    img: "img/products/market-stall.jpg",
    title: "Poured for you at the market",
    text: "The Hub Karen and the Organic Farmers Market, every weekend.",
  },
  {
    img: "img/products/apparel-crew.jpg",
    title: "Crafted by Kenyan artisans",
    text: "Leather, canvas and knit — made to last decades.",
  },
  {
    img: "img/products/customers.jpg",
    title: "Loved across Nairobi",
    text: "And now delivered to your door.",
  },
];
// Pinned horizontal scroll on every screen size (phones included); with reduced
// motion the cards simply stack vertically.
function HiveToHand() {
  const ref = useRef<HTMLElement>(null);
  const [motion] = useState(() => !reduceMotion());
  useLayoutEffect(() => {
    if (!motion) return;
    const ctx = gsap.context(() => {
      const track = ref.current!.querySelector<HTMLElement>(".h-track")!;
      const dist = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: () => "+=" + dist(),
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (s) => {
            gsap.set(".h-bee", {
              x: s.progress * (window.innerWidth - (window.innerWidth < 1024 ? 80 : 140)),
              y: Math.sin(s.progress * 16) * 30,
              rotate: Math.cos(s.progress * 16) * 14,
            });
            gsap.set(".h-bar", { scaleX: s.progress });
          },
        },
      });
      gsap.utils.toArray<HTMLElement>(".h-card img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.35 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [motion]);
  return (
    <section
      ref={ref}
      className={`relative bg-white overflow-hidden ${motion ? "h-[100svh] min-h-[560px] lg:h-screen" : "lg:h-screen"}`}
    >
      {motion && (
        <img
          src={asset("img/cut/bee.webp")}
          alt=""
          className="h-bee absolute z-20 top-[8vh] lg:top-[9vh] left-4 w-14 lg:w-24 pointer-events-none"
        />
      )}
      <div
        className={`h-track flex items-stretch gap-4 md:gap-6 px-5 md:px-10 ${motion ? "flex-row h-full w-max pt-[16vh] pb-[12vh] lg:py-[14vh]" : "flex-col lg:flex-row lg:h-full lg:w-max py-24 lg:py-[14vh]"}`}
      >
        <div
          className={`shrink-0 flex flex-col justify-center pr-6 lg:w-[34vw] ${motion ? "w-[84vw] sm:w-[60vw]" : ""}`}
        >
          <div className="eyebrow">Our roots</div>
          <h2 className="display-l mt-3">
            From hive
            <br />
            <span className="text-honey">to hand.</span>
          </h2>
          <p className="mt-5 text-lg text-bark max-w-md">
            Bosco Farms and the Kenyan makers we work with — follow a jar, and a
            bag, from where they begin to where they end up.
          </p>
          <Link to="/about" className="btn btn-dark mt-8 self-start">
            Read our story <ArrowRight size={18} />
          </Link>
        </div>
        {story.map((s) => (
          <figure
            key={s.title}
            className={`h-card shrink-0 lg:w-[40vw] lg:max-w-[620px] flex flex-col ${motion ? "w-[78vw] sm:w-[60vw]" : ""}`}
          >
            <div
              className={`relative overflow-hidden rounded-[28px] lg:h-auto lg:flex-1 ${motion ? "flex-1 min-h-0" : "h-[52vh]"}`}
            >
              <img
                src={asset(s.img)}
                alt={s.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <figcaption className="pt-5">
              <div className="font-display font-extrabold text-2xl md:text-3xl leading-tight">
                {s.title}
              </div>
              <div className="text-bark mt-1">{s.text}</div>
            </figcaption>
          </figure>
        ))}
        {motion && <div className="shrink-0 w-[4vw] lg:w-[10vw]" />}
      </div>
      {motion && (
        <div className="absolute left-5 right-5 md:left-10 md:right-10 bottom-[5vh] lg:bottom-8 h-1 bg-cocoa/10 rounded">
          <div className="h-bar h-full bg-amber origin-left scale-x-0 rounded" />
        </div>
      )}
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useReveal(ref);
  const go = (d: number) =>
    setI((x) => (x + d + testimonials.length) % testimonials.length);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 6500);
    return () => clearInterval(t);
  }, [paused]);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".t-card");
      cards.forEach((c, k) => {
        const pos = (k - i + cards.length) % cards.length;
        gsap.to(c, {
          x: pos === 0 ? 0 : pos * 46,
          y: pos * -26,
          rotate: pos === 0 ? 0 : pos * 4,
          scale: 1 - pos * 0.07,
          zIndex: 10 - pos,
          opacity: pos > 2 ? 0 : 1 - pos * 0.25,
          duration: 1.1,
          ease: "expo.out",
        });
      });
      const words = ref.current!.querySelectorAll(
        `.t-card[data-k="${i}"] .t-w`,
      );
      gsap.fromTo(
        words,
        { opacity: 0.12, y: 12 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.25,
        },
      );
      gsap.fromTo(
        `.t-bg[data-k="${i}"]`,
        { opacity: 0, scale: 1.15 },
        { opacity: 1, scale: 1, duration: 1.6, ease: "power3.out" },
      );
      gsap.to(`.t-bg:not([data-k="${i}"])`, { opacity: 0, duration: 1 });
      gsap.fromTo(
        ".t-mark path",
        { strokeDashoffset: 400 },
        { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" },
      );
    }, ref);
    return () => ctx.revert();
  }, [i]);
  return (
    <section
      ref={ref}
      className="relative bg-ink text-white overflow-hidden py-24 md:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {testimonials.map((t, k) => (
        <img
          key={k}
          data-k={k}
          src={asset(t.image)}
          alt=""
          className="t-bg absolute inset-0 w-full h-full object-cover opacity-0"
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
        <div>
          <div className="eyebrow !text-amber">The Bosco experience</div>
          <h2 className="display-l mt-3" data-split>
            In their own words.
          </h2>
          <p className="mt-5 text-white/70 max-w-md">
            Real words from real customers, as posted on our site. Bought from
            us? Tell Nairobi how it went.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              aria-label="Previous review"
              className="w-14 h-14 rounded-full border-2 border-white/30 grid place-items-center hover:bg-white hover:text-ink transition"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next review"
              className="w-14 h-14 rounded-full bg-amber text-cocoa grid place-items-center hover:scale-105 transition"
            >
              <ArrowRight />
            </button>
            <div className="flex gap-2 ml-4">
              {testimonials.map((_, k) => (
                <span
                  key={k}
                  className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-10 bg-amber" : "w-4 bg-white/30"}`}
                />
              ))}
            </div>
          </div>
          <a
            href="https://www.google.com/search?q=Bosco+Esquire+Nairobi+reviews"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-8 text-sm font-bold underline decoration-amber decoration-2 underline-offset-4"
          >
            Leave us a review on Google
          </a>
        </div>
        <div className="relative h-[400px] md:h-[440px]">
          {testimonials.map((t, k) => (
            <figure
              key={k}
              data-k={k}
              className="t-card absolute inset-0 rounded-[30px] bg-white text-ink p-8 md:p-12 shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)] flex flex-col"
            >
              <svg
                className="t-mark w-16 h-12 text-amber"
                viewBox="0 0 64 48"
                fill="none"
              >
                <path
                  d="M4 44V26C4 12 12 4 26 4M36 44V26c0-14 8-22 22-22"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray="400"
                />
              </svg>
              <blockquote className="mt-6 font-display font-extrabold text-2xl md:text-[34px] leading-[1.15] flex-1">
                {t.quote.split(" ").map((w, n) => (
                  <span key={n} className="t-w inline-block mr-[.25em]">
                    {w}
                  </span>
                ))}
              </blockquote>
              <figcaption className="flex items-center gap-4 pt-6 border-t">
                <span className="w-12 h-12 rounded-full bg-cocoa text-amber font-display font-extrabold text-xl grid place-items-center">
                  {t.name[0]}
                </span>
                <span>
                  <b className="block">{t.name}</b>
                  <span className="text-sm text-bark/70">{t.product}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- VISIT (360 teaser) ---------------- */
function Visit() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [on, setOn] = useState(false);
  const big =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 1024px)").matches;
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
        <div
          className="relative h-[420px] md:h-[560px] rounded-[32px] overflow-hidden bg-cocoa"
          data-rise
        >
          {on && big && (
            <Suspense fallback={null}>
              <Tour360 showSpots={false} />
            </Suspense>
          )}
          {!big && (
            <img
              src={asset("img/tour-preview.jpg")}
              alt="Preview of the Bosco shop tour"
              className="absolute inset-0 w-full h-full object-cover object-[60%_50%]"
            />
          )}
          <div className="absolute inset-x-0 bottom-0 p-6 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-t from-cocoa/90 to-transparent pointer-events-none">
            <span className="flex items-center gap-2 text-white font-bold">
              <Rotate3d className="text-amber" /> Drag to look around
            </span>
            <Link to="/visit" className="btn btn-amber pointer-events-auto">
              Enter the 360° tour
            </Link>
          </div>
        </div>
        <div>
          <div className="eyebrow">Visit the shop</div>
          <h2 className="display-l mt-3" data-split>
            Step inside before you step in.
          </h2>
          <p className="mt-5 text-lg text-bark" data-rise>
            Look around our shop at The Imaara Mall from your phone, tap a
            product to open it, then come and taste it in person.
          </p>
          <div className="mt-8 space-y-4" data-rise>
            <div className="flex gap-3">
              <MapPin className="text-honey shrink-0" />
              <div>
                <b>The Imaara Mall</b>
                <br />
                <span className="text-bark">
                  Off Mombasa Road, Nairobi, Kenya
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="text-honey shrink-0" />
              <div>
                <b>Weekend pop-ups</b>
                <br />
                <span className="text-bark">
                  The Hub Karen · Organic Farmers Market
                </span>
              </div>
            </div>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=The+Imaara+Mall+Mombasa+Road+Nairobi"
            target="_blank"
            rel="noreferrer"
            className="btn btn-dark mt-8"
          >
            Get directions <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ATELIER ---------------- */
function Atelier() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".at-bag",
        { rotate: -14, yPercent: 20 },
        {
          rotate: 8,
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      gsap.fromTo(
        ".at-word",
        { xPercent: 10 },
        {
          xPercent: -25,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={ref}
      className="relative bg-bark text-white overflow-hidden py-24 md:py-32"
    >
      <div className="at-word absolute top-10 left-0 whitespace-nowrap font-display font-extrabold text-[20vw] leading-none text-white/[.05] select-none">
        BOSCO ATELIER BOSCO ATELIER
      </div>
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10 grid lg:grid-cols-3 gap-10 items-center">
        <div>
          <div className="eyebrow !text-amber">Bosco Atelier</div>
          <h2 className="display-m mt-3" data-split>
            Leather that remembers you.
          </h2>
          <p className="mt-5 text-white/75" data-rise>
            Totes, laptop bags, duffels and wallets, hand-stitched by Kenyan
            artisans in full-grain leather and hair-on cowhide.
          </p>
          <Link to="/shop?c=atelier" className="btn btn-amber mt-8">
            Shop the Atelier <ArrowRight size={18} />
          </Link>
        </div>
        <div className="relative h-[380px] md:h-[520px] lg:-mx-6">
          <img
            src={asset("img/cut/leatherbag.webp")}
            alt="Bosco Esquire leather laptop bag"
            className="at-bag absolute inset-0 m-auto max-h-full drop-shadow-[0_40px_50px_rgba(0,0,0,.5)]"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            "leather-tote-bag",
            "cowhide-leather-bag",
            "laptop-sleeve",
            "canvas-tote",
          ].map((s) => {
            const p = bySlug(s)!;
            return (
              <Link
                key={s}
                to={`/product/${s}`}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden"
                data-rise
              >
                <img
                  src={asset(p.images[0])}
                  alt={p.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute left-3 bottom-3 right-3">
                  <div className="font-bold text-sm leading-tight">
                    {p.name}
                  </div>
                  <div className="text-amber text-xs font-bold">
                    {fmt(p.variants[0].price)}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- JOURNAL + TRADE ---------------- */
function JournalTeaser() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow">The Bosco Journal</div>
            <h2 className="display-l mt-3" data-split>
              Stories from the hive.
            </h2>
          </div>
          <Link to="/journal" className="btn btn-dark">
            All stories <ArrowRight size={18} />
          </Link>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {articles.map((a) => (
            <Link
              key={a.slug}
              to={`/journal/${a.slug}`}
              className="group"
              data-rise
            >
              <div className="aspect-[4/3] rounded-[24px] overflow-hidden">
                <img
                  src={asset(a.image)}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <div className="mt-4 text-xs font-bold tracking-widest uppercase text-honey">
                {a.category} · {a.read}
              </div>
              <h3 className="font-display font-extrabold text-2xl mt-2 group-hover:text-honey transition">
                {a.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TradeBand() {
  return (
    <section className="bg-amber text-cocoa">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-16 md:py-20 grid md:grid-cols-[1fr_auto] gap-8 items-center">
        <div>
          <div className="eyebrow !text-cocoa/70">
            Trade & corporate gifting
          </div>
          <h2 className="display-m mt-3">
            Hotels, offices and gifting — supplied in volume, quoted in a day.
          </h2>
        </div>
        <Link to="/trade" className="btn btn-dark">
          Request a quote <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  // Nav links like "Why Buy From Us" arrive here with { scrollTo: 'why-us' }
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const target = (state as { scrollTo?: string } | null)?.scrollTo;
  useEffect(() => {
    if (!target) return;
    // wait for the page curtain and ScrollTrigger's layout refresh before jumping
    const t = setTimeout(() => {
      const el = document.getElementById(target);
      if (el) scrollToEl(el, 0);
      navigate(pathname, { replace: true, state: null });
    }, 700);
    return () => clearTimeout(t);
  }, [target, pathname, navigate]);
  return (
    <>
      <Hero />
      <Marquee />
      <Worlds />
      <Bestsellers />
      <WhyUs />
      <JarSection />
      <HiveToHand />
      <Testimonials />
      <Atelier />
      <Visit />
      <JournalTeaser />
      <TradeBand />
    </>
  );
}
