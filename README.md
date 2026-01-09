# Univault.org - Research Lab Website

The official website of [Univault Research Lab](https://univault.org) - the research hub for personal data sovereignty and consciousness-aware AI technologies.

## Overview

Univault.org serves as the central research hub showcasing our work across multiple domains:
- **Consciousness & AI Research** - Complete AI architecture, GLE foundation models, breathing authentication
- **Data Sovereignty Research** - Personal AI systems, privacy architecture, data standards
- **Protocol & Security Research** - SRPT protocol, quantum-safe privacy, secure sharing protocols

This website connects our research to practical applications including [Bagle.com](https://bagle.com), MirrorAI, and RIIF platforms.

## 🚀 Technology Stack

- **Framework:** Next.js 15 (Static Site Generation)
- **Styling:** Tailwind CSS 4.0
- **Content:** Markdown/MDX with `next-mdx-remote`
- **Deployment:** GitHub Pages (static export)
- **Forms:** Cloudflare Workers API (shared with bagle.com)
- **Icons:** React Icons (Bootstrap Icons)
- **Animations:** Framer Motion

## 📁 Project Structure

```
univault-org/
├── content/              # Markdown content
│   ├── pages/           # Main pages (home, about, declaration)
│   └── posts/           # Research updates and publications
├── src/
│   ├── pages/           # Next.js pages
│   ├── components/      # React components
│   │   ├── layout/      # Navigation, Footer, Layouts
│   │   └── utils/       # Utility components
│   ├── lib/             # API utilities, routes
│   └── styles/          # Global CSS
├── public/              # Static assets (fonts, images, videos)
├── scripts/             # Build scripts (sitemap generation)
└── .github/workflows/   # GitHub Actions deployment
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Setup

```bash
# Clone the repository
git clone https://github.com/univault-org/univault-org.git
cd univault-org

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the site.

### Build for Production

```bash
# Build static site
pnpm build

# The output will be in the /out directory
```

## 📝 Content Management

All content is managed through Markdown files:

### Pages (`/content/pages/`)
- `home.md` - Homepage content and metadata
- `about.md` - About page content
- `declaration/` - Universal Declaration of Digital Rights pages

### Posts (`/content/posts/`)
- Research updates and publications
- Technology announcements
- Research findings

### Adding New Content

1. Create a Markdown file in `/content/pages/` or `/content/posts/`
2. Add frontmatter with metadata:
   ```markdown
   ---
   title: "Page Title"
   description: "Page description"
   date: "2025-01-01"
   ---
   ```
3. Content will be automatically available at the corresponding route

## 🌐 Deployment

### GitHub Pages Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `deploy/gh-pages` branch.

**Deployment Process:**
1. Push changes to `main` branch
2. Merge to `deploy/gh-pages` branch (or push directly)
3. GitHub Actions workflow builds and deploys automatically
4. Site is live at [univault.org](https://univault.org)

**Manual Deployment:**
```bash
# Build the site
pnpm build

# The /out directory contains the static site
# Deploy to your hosting provider
```

### Configuration

The site is configured for GitHub Pages with basePath `/md-next` in production. This is set in:
- `next.config.js` - basePath and assetPrefix
- `.github/workflows/static.yml` - Build environment variables

## 🔗 Related Projects

- **[Bagle.com](https://bagle.com)** - Hardware-to-AI transformation platform
- **[MirrorAI](https://mirrorai.me)** - Complete AI applications
- **[RIIF](https://riif.com)** - Audio player platform
- **[EEG Foundation Challenge 2025](https://github.com/paragon-dao/eeg-foundation-challenge-2025)** - Research verification repository

## 📊 Research Areas

### Consciousness & AI Research
- Complete AI Architecture (GPT + Harmonic Frequency - HF Models + Adapter)
- General Learning Encoder (GLE) - Pre-trained foundation model
- Breathing Authentication - 96.8% accuracy (Current Biology 2025)
- EEG Foundation Challenge 2025 - Verified benchmarks exceed winning solutions

### Data Sovereignty Research
- Personal AI Systems
- Privacy Architecture
- Data Standards

### Protocol & Security Research
- Satellite Data Protocol (SRPT)
- Quantum-Safe Privacy
- Secure Sharing Protocols

## 🎯 Key Features

- ✅ Research-focused homepage with video demonstrations
- ✅ Research areas organized by category
- ✅ Publications & findings section
- ✅ Applications section linking to product platforms
- ✅ Universal Declaration of Digital Rights
- ✅ Request Demo form (integrated with Cloudflare Workers)
- ✅ Dark mode support
- ✅ Fully responsive design
- ✅ SEO optimized


## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

For major changes, please open an issue first to discuss.

## 📄 License

[ISC License](LICENSE) - See LICENSE file for details.

## 🌐 Links

- **Website:** [univault.org](https://univault.org)
- **GitHub:** [github.com/univault-org](https://github.com/univault-org)
- **Research Repository:** [github.com/paragon-dao/eeg-foundation-challenge-2025](https://github.com/paragon-dao/eeg-foundation-challenge-2025)

## 👥 About Univault Research Lab

Univault Research Lab is part of Univault Technologies, dedicated to advancing personal data sovereignty and consciousness-aware AI. We research, develop, and publish technologies that put individuals in control of their digital lives.

Our research spans multiple domains, from consciousness-aware AI to secure protocols, all with the goal of enabling personal data sovereignty in the AI era.

---

**Built with ❤️ by the Univault Research Lab team**
