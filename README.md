# Srinidhi Jagannathan — Portfolio

Professional portfolio website for AI Product Management job applications.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Dark Mode**: next-themes

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── about/          # About page
│   ├── contact/        # Contact page
│   ├── projects/       # Projects page
│   ├── fonts/          # Local font files
│   ├── globals.css     # Global styles & Tailwind
│   ├── layout.tsx      # Root layout (Navbar, Footer, Theme)
│   ├── loading.tsx     # Loading skeleton
│   ├── not-found.tsx   # 404 page
│   ├── page.tsx        # Home / Landing page
│   ├── robots.ts       # SEO robots.txt
│   └── sitemap.ts      # SEO sitemap.xml
├── components/
│   ├── Footer.tsx
│   ├── MotionWrapper.tsx
│   ├── Navbar.tsx
│   ├── SectionHeading.tsx
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
└── lib/
    └── constants.ts    # Site config, projects, skills data
```

## Customization

- **Personal Info**: Edit `src/lib/constants.ts` to update your name, links, projects, skills, and experience.
- **Colors**: Modify the `navy` and `accent` color palettes in `tailwind.config.ts`.
- **Contact Form**: Replace the Formspree placeholder in `src/app/contact/page.tsx` with your form endpoint.
- **Resume**: Add your `resume.pdf` to the `public/` directory.
- **Domain**: Update `siteConfig.url` in `src/lib/constants.ts` with your actual domain.

## Deployment

Deploy to [Vercel](https://vercel.com) for the best Next.js experience:

```bash
npx vercel
```

Or use any Node.js hosting platform that supports Next.js.
