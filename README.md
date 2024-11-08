# MarkVault Starter

A lightweight starter template for building knowledge bases, websites, and blogs with pure React and Markdown. See it in action: [Live Demo](https://univault-org.github.io/MarkVault/)

## Why MarkVault?

- 🎯 **Purpose-Built**: Designed specifically for knowledge bases and technical blogs
- 🛠 **Developer-Friendly**: Uses familiar tools - React, Markdown, and simple HTML/JS
- 🔒 **Future-Proof**: Simple tech stack ensures long-term maintainability

## Quick Start

1. Use this template:
```bash
git clone https://github.com/univault-org/MarkVault.git
cd MarkVault
```

2. Create a new repository on GitHub

3. Update your remote:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

4. Deploy to GitHub Pages:
```bash
# Create and switch to deploy branch
git checkout -b deploy/gh-pages

# Push to GitHub
git push -u origin deploy/gh-pages
```

5. Enable GitHub Pages:
- Go to your repository settings
- Navigate to "Pages"
- Under "Build and deployment":
  - Source: Deploy from a branch
  - Branch: deploy/gh-pages
  - Folder: / (docs)
- Click Save

Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## Local Development

1. Install dependencies (optional, for development):
```bash
pnpm install
```

2. Start development server:
```bash
pnpm dev
# or use any static server:
npx serve site
```

3. Open `http://localhost:3000` in your browser

## Project Structure

```
markvault/
├── site/             # Main site files
│   ├── index.html    # Main application file
│   └── content/      # Markdown content
│       ├── posts/    # Blog posts
│       └── pages/    # Static pages
└── README.md         # This file
```

## Content Management

### Creating Posts

Add markdown files to `site/content/posts/` with frontmatter:

```markdown
---
title: My First Post
date: 2024-01-20
author: Your Name
excerpt: A brief description
---

Your markdown content here...
```

### Creating Pages

Add markdown files to `site/content/pages/` with frontmatter:

```markdown
---
title: About
lastUpdated: 2024-01-20
---

Your page content here...
```

## Deployment Updates

After making changes:
```bash
# Switch to deploy branch
git checkout deploy/gh-pages

# Add and commit changes
git add .
git commit -m "update: your changes description"

# Push to GitHub
git push origin deploy/gh-pages
```

Your changes will be live in a few minutes at your GitHub Pages URL.

## Customization

- **Themes**: Modify Tailwind configuration in `index.html`
- **Components**: Edit React components in `index.html`
- **Content**: Add markdown files to `site/content/` directory

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Bootstrap Icons](https://icons.getbootstrap.com/)
- Markdown parsing by [React Markdown](https://github.com/remarkjs/react-markdown)

---

Made with ❤️ by Univault Technologies
```

