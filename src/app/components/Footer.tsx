const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/masachi.dc/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nathanmasachi/' },
  { label: 'X', href: 'https://x.com/MasachiDC' },
];

export function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-ink-deep">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between sm:px-10 lg:px-16">
        <div className="flex items-center gap-2.5">
          <span className="block h-1.5 w-1.5 shrink-0 bg-accent" />
          <span className="font-display text-[13px] font-bold uppercase leading-none tracking-[-0.01em] text-bone/70">
            Masachi
          </span>
          <span className="text-[9px] font-semibold uppercase leading-none tracking-[0.28em] text-bone/30">
            DC
          </span>
          <span className="ml-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-bone/25">
            © 2026
          </span>
        </div>

        <div className="flex items-center gap-7">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] font-semibold uppercase tracking-[0.22em] text-bone/35 transition-colors duration-300 hover:text-bone/70"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
