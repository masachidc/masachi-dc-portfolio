import { Bullets, Hl, Points, Sequence } from '../../components/caseStudy';
import type { CaseStudy } from './types';

// Source: Nathan's final STEM Xposure case-study copy (Oct 2026). Facts match profile.ts: 500+ students, the U.S. and
// six African countries (seven in all), three consecutive years, 14 volunteer instructors.
// Media slots await the existing project images (brief graphic, sketches, SketchUp models, partners, final student
// work) and render as labelled placeholders until then.
export const stemxposure: CaseStudy = {
  slug: 'stemxposure',
  status: 'published',
  title: ['STEM Xposure'],
  tagline:
    'Designing a two-week architecture program that 14 volunteer instructors could deliver across seven countries.',
  facts: [
    ['Role', 'Lead Instructor · Curriculum Designer'],
    ['Duration', '3 consecutive years'],
    ['Reach', '500+ high school students · 7 countries'],
    ['Team', '14 volunteer instructors recruited'],
  ],
  glance: [
    {
      label: 'Challenge',
      text: 'Teach architecture and design to high school students in two weeks, many of them learning the software as they used it.',
    },
    {
      label: 'System',
      text: 'A repeatable curriculum moved students from a design brief through ideation, 3D prototyping and final presentation.',
    },
    {
      label: 'Impact',
      text: 'The program reached 500+ students in the U.S. and six African countries across three consecutive years.',
    },
  ],
  cover: {
    slot: 'STEM Xposure cover',
    // the cover's own proportions, so nothing is cropped
    ratio: '1564/768',
    src: '/img/works/stemxposure.webp',
    alt: 'Global STEM Virtual Summer Camp: "Become a STEM Champ!" beside a fan of national flags, over the line Curriculum Design, Program Leadership, Stakeholder Partnerships.',
  },
  overview: (
    <>
      <p>
        STEM Xposure was a two-week architecture and design program for high school students. I designed the
        curriculum, recruited and onboarded 14 classmates as volunteer instructors, and took part in negotiations that
        secured a one-year professional SketchUp license for every student.
      </p>
      <p>Across three consecutive years, the program reached 500+ students in the United States and six African countries.</p>
      <p>
        The harder design problem wasn’t simply deciding what to teach. It was creating a program that{' '}
        <Hl>other people could teach</Hl>, within a limited schedule, across different cohorts, while giving students
        enough room to think, make and present.
      </p>
    </>
  ),
  description:
    'STEM Xposure: a two-week architecture and design curriculum that 14 volunteer instructors delivered to 500+ high school students across seven countries over three years.',
  blocks: [
    {
      kind: 'section',
      kicker: 'The challenge',
      title: 'Two weeks to make architecture tangible',
      body: (
        <>
          <p>
            Architecture can become abstract quickly: drawings, software, rules and theory. The camp needed to make it
            concrete for students who were encountering much of it for the first time.
          </p>
          <p>
            Rather than teach design and software as separate subjects, I centered each cohort around a{' '}
            <Hl>focused design brief</Hl>. Students had something real to solve, and every lesson helped move that
            project forward.
          </p>
          <p>
            In the featured tiny-house brief, that meant going from an affordable-housing problem to an idea on paper,
            then a three-dimensional proposal they could explain and defend.
          </p>
        </>
      ),
    },
    {
      kind: 'insight',
      label: 'Insight',
      statement: 'Students didn’t need to learn SketchUp before they could design. They could learn SketchUp by designing.',
    },
    {
      kind: 'section',
      kicker: 'Curriculum',
      title: 'The schedule forced the curriculum to choose',
      body: (
        <>
          <p>
            Students had four hours a day, and many were learning SketchUp while using it. There wasn’t room to teach
            everything.
          </p>
          <p>I structured the program around a simple progression:</p>
          <Sequence arrow rows={[{ label: 'Two weeks', items: ['Brief', 'Ideate', 'Prototype', 'Present'] }]} />
          <p>
            The opening days stayed primarily on paper so students could explore ideas before software narrowed them.
            Prototyping then moved into SketchUp, with instructors teaching tools in the context of each student’s
            project rather than as a standalone software course.
          </p>
          <p>The final stage required students to turn the work into something they could present to other people.</p>
          <p>
            The constraint made the curriculum better: <Hl>teach what moves the project forward, leave out what doesn’t.</Hl>
          </p>
        </>
      ),
    },
    {
      kind: 'media',
      items: [
        { slot: 'Design brief graphic', ratio: '4/3' },
        { slot: 'Hand sketches', ratio: '4/3' },
      ],
    },
    {
      kind: 'media',
      items: [
        { slot: 'Early SketchUp models', ratio: '4/3' },
        { slot: 'Developed SketchUp models', ratio: '4/3' },
      ],
    },
    {
      kind: 'section',
      kicker: 'Delivery system',
      title: 'The curriculum had to work without me in the room',
      body: (
        <>
          <p>I recruited and onboarded 14 classmates as volunteer instructors.</p>
          <p>
            That changed the problem. I wasn’t designing a class that only I needed to understand. The curriculum had to
            be <Hl>structured enough for multiple instructors to deliver it</Hl> while still leaving room to adapt to
            different students and cohorts.
          </p>
        </>
      ),
    },
    {
      kind: 'insight',
      label: 'What changed',
      statement: 'My role expanded from teaching architecture to designing a system through which other people could teach it.',
    },
    {
      kind: 'section',
      kicker: 'Partnerships',
      title: 'Bring the profession into the classroom',
      body: (
        <>
          <p>
            The program combined hands-on design work with exposure to the tools and people students might encounter
            beyond the camp.
          </p>
          <Points
            items={[
              {
                label: 'SketchUp',
                body: 'I took part in negotiations that secured a one-year professional SketchUp license for every student, giving them access to the same class of tool used in professional architecture and design.',
              },
              { label: 'Dr. Gladys B. West', body: 'Joined as an annual guest of honor and mentor.' },
              { label: 'Zack Giffin, Tiny House Nation', body: 'Participated as a speaker and final-day judge.' },
            ]}
          />
          <p>
            The goal wasn’t to decorate the program with recognizable names. It was to{' '}
            <Hl>make the profession feel less distant.</Hl>
          </p>
        </>
      ),
    },
    {
      kind: 'section',
      kicker: 'From sketch to presentation',
      title: 'Every student finished by making something they could explain',
      body: (
        <>
          <p>
            Students moved from rough sketches into 3D models and then final presentations within the two-week program.
          </p>
          <p>
            On the final day, they presented their work to a judging panel. Standout projects were recognized, and all
            participating students received certificates.
          </p>
          <p>
            What mattered wasn’t only the final render. The progression showed students <Hl>learning to make decisions</Hl>:
          </p>
          <Bullets
            items={[
              'What problem am I solving?',
              'What should the space do?',
              'How does the idea become a model?',
              'How do I explain why I designed it this way?',
            ]}
          />
        </>
      ),
    },
    {
      kind: 'media',
      wide: true,
      items: [
        { slot: 'Final student work', ratio: '4/3' },
        { slot: 'Final student work', ratio: '4/3' },
      ],
    },
    {
      kind: 'outcomes',
      kicker: 'Outcomes',
      items: [
        { value: '500+', label: 'High school students reached' },
        { value: '7', label: 'Countries' },
        { value: '3', label: 'Consecutive years' },
        { value: '14', label: 'Volunteer instructors recruited' },
      ],
    },
    {
      kind: 'section',
      kicker: 'Reflection',
      title: 'I wasn’t only designing what students learned',
      body: (
        <>
          <p>STEM Xposure was the first time I designed something at this scale that other people had to deliver.</p>
          <p>
            Schedules changed. Students entered with different levels of experience. Instructors had to adapt while
            keeping the program moving. A curriculum that looked clear on paper still had to survive contact with real
            people.
          </p>
          <p>That exposed a distinction I still use in product work:</p>
          <p>
            <Hl>
              Designing the experience is one problem. Designing the conditions that let other people deliver it is
              another.
            </Hl>
          </p>
          <p>
            The work isn’t finished when the system makes sense to its creator. It has to remain understandable when
            someone else picks it up and runs it.
          </p>
        </>
      ),
    },
  ],
};
