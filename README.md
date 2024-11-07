# MarkVault and MarkVault Site Starter

A minimalist, markdown-powered platform designed for long-term content preservation. Built with vanilla React and zero build configuration.

## Features

- 📝 **Markdown-First**: Native support for markdown content with frontmatter
- 🌓 **Dark Mode**: Seamless light/dark theme switching
- ⚡ **Zero Build**: No npm, no build step, just pure HTML/JS
- 📱 **Responsive**: Mobile-first design approach
- 🎨 **Modern UI**: Clean, minimal interface with Tailwind CSS
- 🔍 **SEO Ready**: Semantic HTML and metadata support
- 📊 **Content Types**: Support for posts, pages, and custom content
- 🚀 **Fast Loading**: Minimal dependencies, maximum performance

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/markvault-starter.git
```

2. Navigate to the site directory:
```bash
cd markvault-starter/site
```

3. Serve the directory with any static server:
```bash
# Using Python
python -m http.server 8000

# Using PHP
php -S localhost:8000

# Using Node.js
npx serve

# Using VS Code
Use the "Live Server" extension and right-click on index.html to "Open with Live Server"
```

4. Open `http://localhost:8000` in your browser (port may vary depending on your server)

> **Note**: Make sure you're serving from the `site` directory, not the project root, as this contains the `index.html` file.

## Project Structure

```
markvault/
├── site/             # Main site files
│   ├── index.html    # Main application file
│   └── content/      # Markdown content
│       ├── posts/    # Blog posts
│       └── pages/    # Static pages
├── editor/           # Content editor files
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

