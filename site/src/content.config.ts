import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * caseStudies — one MDX file per project. All structured content lives in
 * typed frontmatter; the single template at src/pages/work/[slug].astro
 * renders the full V4 case-study spine from these fields.
 *
 * Adding a project = adding an MDX file + images. No component code.
 */
const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/case-studies' }),
  schema: z.object({
    // Identity
    title: z.string(),
    client: z.string(),
    location: z.string().optional(),
    // `year` is optional on purpose: never invent a date. Fill when confirmed.
    year: z.string().optional(),
    role: z.string(),

    // Ordering / prominence
    order: z.number().default(99),
    featured: z.boolean().default(false),
    tier: z.enum(['flagship', 'secondary', 'archive']).default('flagship'),

    // Per-project glow accent (hex)
    glow: z.string().default('#e0794a'),

    // Hero + metric bar
    summary: z.string(),
    focus: z.string().optional(),
    metric: z.string().optional(),
    metricLabel: z.string().optional(),
    tags: z.array(z.string()).default([]),
    links: z
      .array(
        z.object({
          label: z.string(),
          icon: z.string().optional(),
          url: z.string(),
        }),
      )
      .default([]),

    // Narrative spine
    overview: z.string(),
    problem: z.string(),
    goals: z
      .array(z.object({ title: z.string(), body: z.string() }))
      .default([]),
    methods: z.array(z.string()).default([]),
    processImage: z.string().optional(),
    processCaption: z.string().optional(),

    insightHeading: z.string().default('Gathering insights'),
    insight: z.string(),
    insightImage: z.string().optional(),

    // The highlighted "key decision" block
    decisionHeading: z.string().default('The key decision'),
    decision: z.string(),

    // Feature grid
    features: z
      .array(
        z.object({
          title: z.string(),
          icon: z.string().optional(),
          body: z.string(),
          image: z.string().optional(),
        }),
      )
      .default([]),

    // Screens gallery
    gallery: z
      .array(z.object({ image: z.string(), caption: z.string().optional() }))
      .default([]),

    // Close
    outcome: z.string(),
    next: z.string().optional(),
  }),
});

export const collections = { caseStudies };
