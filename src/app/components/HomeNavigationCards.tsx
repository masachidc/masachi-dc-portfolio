import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { EMAIL } from '../data/site';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';
import { SiteLink } from './SiteLink';

type NavigationCard = {
  title: string;
  description: string;
  /** Card fill; `textClassName` is the text colour that reads on it. */
  color: string;
  textClassName: string;
  /** Internal path or mailto: — SiteLink renders the right element. */
  href: string;
};

const CARDS: NavigationCard[] = [
  {
    title: 'About me',
    description: 'From architecture to product design, and the experiences that shaped my career.',
    color: '#001047',
    textClassName: 'text-white',
    href: '/about',
  },
  {
    title: 'Resume',
    description: "A closer look at my experience, skills, and the work I've delivered.",
    color: '#c69a27',
    textClassName: 'text-ink',
    href: '/resume',
  },
  {
    title: 'Get in touch',
    description: "Have a role, project, or idea in mind? Let's talk.",
    color: '#006b70',
    textClassName: 'text-white',
    href: `mailto:${EMAIL}`,
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
        <h3 className="font-display text-title lg:whitespace-nowrap">{card.title}</h3>
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
      <ul className="mx-auto grid w-full max-w-[22rem] grid-cols-1 gap-6 md:mx-0 md:max-w-none md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-16">
        {CARDS.map((card) => (
          <motion.li key={card.title} variants={fadeUp} className="flex w-full">
            <div className="work-stage w-full">
              <span aria-hidden="true" className="work-shadow" />
              <SiteLink href={card.href} className="work-card group relative flex aspect-[3/2] w-full overflow-hidden">
                <CardContent card={card} />
              </SiteLink>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
