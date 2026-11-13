# DetectVision website

Marketing site for DetectVision, built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and Framer Motion.

## Run it locally

Requires Node.js 20.9 or newer (22 recommended).

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts: `npm run build` (production build), `npm start` (serve the build), `npm run typecheck`.

## Deploy to Vercel

1. Push this folder to a GitHub, GitLab or Bitbucket repository.
2. In Vercel, choose **Add New → Project** and import the repository. Vercel detects Next.js automatically; keep the default settings.
3. Under **Environment Variables**, add `NEXT_PUBLIC_SITE_URL` (your live domain, e.g. `https://detectvision.ai`) and, optionally, `DEMO_WEBHOOK_URL` (see below).
4. Deploy, then add your domain under **Settings → Domains**.

## Where to change things

| What | Where |
| --- | --- |
| Products, pricing, solutions, industries, FAQ, stats | `lib/content.ts` |
| Navigation, phone, email, office addresses, site URL | `lib/site.ts` |
| Colors and fonts | `app/globals.css` (`@theme` block) |
| Home page sections | `app/page.tsx` and `components/sections/` |
| Free business analysis demo (hero) | `components/demo/AnalyzeDemo.tsx` |
| Product demos (D-Vision, D-Voice, D-ROBOT, D-Camera) | `components/demo/ModuleMocks.tsx` |
| Pricing cards and Base/Pro switch | `components/sections/Pricing.tsx` |

Text in `[square brackets]` is a placeholder that needs real content before launch (client logos, stats, quote, team, FAQ answers, legal pages, contact email). Search the project for `[` to find them all.

## Business analysis tool

The hero's "Free business analysis" is a front-end demo: it shows the analysis steps and an example report (Sample Bistro), then sends the visitor's business name to the contact form. To show real reports, connect it to your existing analysis backend in `components/demo/AnalyzeDemo.tsx`.

## Demo request form

The form posts to `app/api/demo/route.ts`, which validates the request on the server. If `DEMO_WEBHOOK_URL` is set, each request is forwarded there as JSON (works with Slack incoming webhooks, Zapier, Make, n8n, or a CRM endpoint). Without it, requests are only written to the server log, so set it before launch.

## Project structure

```
app/                 pages (one folder per route) + API route, sitemap, robots
components/layout/   header, footer, motion settings
components/ui/       buttons, container, headings, placeholders
components/sections/ page sections shared across pages
components/demo/     interactive product demos
lib/                 content and site settings
```

## Motion

Reusable motion pieces live in `components/motion/`:

| Component | What it does |
| --- | --- |
| `Reveal`, `Stagger` / `StaggerItem` | Fade-and-rise on scroll; lists arrive one item at a time |
| `WipeReveal` | Wipes an image in left to right, like a feed coming online |
| `CountUp` | Counts a stat up from zero (placeholders like `[X]%` display as written) |
| `DrawIcon` | Line icons that draw themselves |
| `ScrollLine` | A progress line that fills as you scroll |
| `Marquee` | Endless logo scroll, pauses on hover |
| `WordFill` | Paragraph whose words light up one by one as you scroll |

Product-specific motion lives in `components/demo/` (floor plan, product mock screens, hero tilt). The stacking product panels on the home page are in `components/sections/StackedPanels.tsx`; on phones they stack in normal flow instead of pinning. Every animation plays once, and all of them turn off when a visitor has "reduce motion" switched on in their device settings.

## Notes

- The font (Hanken Grotesk) is self-hosted from npm, so there are no external font requests. To use a different typeface, change `--font-display` and `--font-sans` in `app/globals.css`.
- All animations respect the visitor's "reduce motion" setting.
- Every page except the form API is statically pre-rendered for speed.
