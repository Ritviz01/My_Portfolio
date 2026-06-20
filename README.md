# 🌀 Quantum Swarm — Interactive 3D Portfolio

An interactive, scroll-driven personal portfolio built with **React**, **TypeScript**, and **Three.js**. The centerpiece is a GPU-instanced particle swarm (20,000+ tetrahedrons) rendered as an animated torus-knot, whose shape, density, and motion continuously morph as you scroll — each section of the site blends into its own unique "swarm preset."

**🔗 Live Demo:** [my-portfolio-ruby-three-49.vercel.app](https://my-portfolio-ruby-three-49.vercel.app/)
**📦 Repository:** [github.com/Ritviz01/My_Portfolio](https://github.com/Ritviz01/My_Portfolio)

---

## ✨ Features

- **Animated 3D particle background** — A custom `THREE.InstancedMesh` swarm (20k particles) following a parametric torus-knot path, post-processed with `UnrealBloomPass` for a glowing, neon look.
- **Scroll-reactive visuals** — As you scroll, the swarm's radius, twist, loop count, and flow speed smoothly interpolate (lerp) between per-section presets (`hero`, `about`, `skills`, `projects`, `experience`, `contact`), so the background visually echoes the content above it.
- **Buttery-smooth scrolling** — Powered by [Lenis](https://github.com/darkroomengineering/lenis) for inertia-based, frame-synced scrolling.
- **Single source of content** — All personal info, skills, projects, experience, education, publications, and certifications live in one typed data file (`src/data/portfolioData.ts`), making the site easy to update without touching component code.
- **Fully typed** — Strict TypeScript interfaces (`src/types/portfolio.ts`) define the shape of every content block and the swarm's animation parameters.
- **Resume download** — One-click resume download served straight from `public/`.
- **Zero backend** — Contact section links directly via `mailto:`; no server or form service required.

## 🧱 Tech Stack

| Category | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Build tool | [Vite](https://vite.dev/) |
| 3D / WebGL | [Three.js](https://threejs.org/) (`InstancedMesh`, `EffectComposer`, `UnrealBloomPass`) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Smooth scroll | [Lenis](https://github.com/darkroomengineering/lenis) |
| Icons | [Lucide React](https://lucide.dev/) |
| Linting | ESLint + `typescript-eslint` |
| Deployment | [Vercel](https://vercel.com/) |

## 📁 Project Structure

```
My_Portfolio/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── Ritviz_Tiwari_Resume_Optimized.docx
├── src/
│   ├── assets/                  # Static images (hero, etc.)
│   ├── components/
│   │   ├── ParticlesBackground.tsx   # Three.js scene, swarm class, render loop
│   │   └── Overlay2D.tsx             # All 2D UI: nav, hero, sections, contact
│   ├── data/
│   │   └── portfolioData.ts     # ⭐ All editable content lives here
│   ├── types/
│   │   └── portfolio.ts         # Shared TypeScript interfaces
│   ├── App.tsx                  # Scroll tracking + swarm param interpolation
│   ├── main.tsx                 # React entry point
│   ├── App.css / index.css      # Global styling
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig*.json
```

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- npm (or yarn/pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/Ritviz01/My_Portfolio.git
cd My_Portfolio

# Install dependencies
npm install

# Start the dev server (with HMR)
npm run dev
```

The app will be available at `http://localhost:5173` (Vite's default port).

### Other scripts

```bash
npm run build      # Type-check (tsc -b) and build for production
npm run preview     # Preview the production build locally
npm run lint        # Run ESLint
```

## 🧩 Site Sections

The page is a single continuous scroll divided into six sections, each with its own particle-swarm "mood":

1. **Hero** — Name, role, and tagline
2. **About** — Bio and background
3. **Skills** — Programming languages, statistical/analytical methods, BI tools, and data pipeline/cloud skills
4. **Projects** — Featured data analytics dashboards with tech stacks and GitHub links
5. **Experience** — Work history, research authorship, education, publications, and certifications
6. **Contact** — Social links and direct email contact

## ✏️ Customizing the Content

Almost everything on the site is data-driven. To make it your own:

1. Open `src/data/portfolioData.ts`.
2. Update `personalDetails`, `skillsData`, `projectsData`, `experienceData`, `educationData`, `publicationsData`, and `certificationsData` with your own information.
3. Drop your resume file into `public/` and update `personalDetails.resumeUrl`.
4. (Optional) Tweak `defaultSwarmParams` and `sectionPresets` to change how the particle swarm looks and animates per section.

## 🌐 Deployment

The live site is deployed on **Vercel** and redeploys automatically from the `main` branch. To deploy your own copy:

1. Push the repo to your own GitHub account.
2. Import it into [Vercel](https://vercel.com/new).
3. Use the default Vite build settings (`npm run build`, output directory `dist`).

## 📄 License

This project is open for reference and learning. Please don't reuse personal content (name, bio, resume, etc.) — feel free to fork the codebase and swap in your own data.

## 👤 Author

**Ritviz Tiwari**
- GitHub: [@Ritviz01](https://github.com/Ritviz01)
- LinkedIn: [Ritviz Tiwari](https://www.linkedin.com/in/ritviz-tiwari-a26111289/)
- Email: ritviztiwari07@gmail.com
