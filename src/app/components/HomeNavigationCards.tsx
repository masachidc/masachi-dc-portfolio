import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { EMAIL } from '../data/site';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';

type NavigationCard = {
  label: string;
  title: string;
  description: string;
  color: string;
  textClassName: string;
  href: string;
  external?: boolean;
};

const CARDS: NavigationCard[] = [
  {
    label: 'About',
    title: 'About me',
    description: 'From architecture to product design, and the experiences that shaped my career.',
    color: '#001047',
    textClassName: 'text-white',
    href: '/about',
  },
  {
    label: 'Resume',
    title: 'Resume',
    description: "A closer look at my experience, skills, and the work I've delivered.",
    color: '#c69a27',
    textClassName: 'text-ink',
    href: '/resume',
  },
  {
    label: 'Get in touch',
    title: 'Get in touch',
    description: "Have a role, project, or idea in mind? Let's talk.",
    color: '#006b70',
    textClassName: 'text-white',
    href: `mailto:${EMAIL}`,
    external: true,
  },
];

function CardContent({ card }: { card: NavigationCard }) {
  return (
    <div
      className={`relative flex size-full flex-col justify-between p-6 lg:p-7 ${card.textClassName}`}
      style={{ backgroundColor: card.color }}
    >
      <div className="flex justify-end">
        <ArrowUpRight
          aria-hidden
          size={18}
          strokeWidth={1.5}
          className="shrink-0 transition-transform duration-300 ease-out md:group-hover:-translate-y-0.5 md:group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      </div>
      <div>
        <h3 className="whitespace-nowrap font-display text-title">{card.title}</h3>
        <p className="mt-4 max-w-[28ch] text-body opacity-80">{card.description}</p>
      </div>
    </div>
  );
}

/** Homepage destinations rendered with the Resume discipline-card rhythm and project-card visual language. */
export function HomeNavigationCards() {
  return (
    <motion.section
      aria-labelledby="where-to-next-title"
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(0, 0.08)}
      className="container-site section-y"
    >
      <motion.h2 id="where-to-next-title" variants={fadeUp} className="mb-8 font-display text-kicker text-fg-faint">
        Where to next
      </motion.h2>
      <ol className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12 lg:gap-16">
        {CARDS.map((card) => (
          <motion.li
            key={card.label}
            variants={fadeUp}
            className="flex w-full max-w-[19rem] md:max-w-[17rem] md:justify-self-center lg:max-w-[18.5rem]"
          >
            <div className="work-stage w-full">
              <span aria-hidden="true" className="work-shadow" />
              {card.external ? (
                <a
                  href={card.href}
                  className="work-card group relative flex aspect-[4/5] w-full overflow-hidden"
                >
                  <CardContent card={card} />
                </a>
              ) : (
                <Link
                  to={card.href}
                  className="work-card group relative flex aspect-[4/5] w-full overflow-hidden"
                >
                  <CardContent card={card} />
                </Link>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </motion.section>
  );
}
