# MarkVault Quick Start Guide

This guide will help you get your MarkVault site up and running in minutes.

## Prerequisites

- Basic knowledge of Markdown
- A text editor (VS Code recommended)
- A web browser
- Basic command line familiarity

## Step 1: Get the Template

```bash
# Clone the repository
git clone https://github.com/univault-org/MarkVault.git my-site

# Navigate to your new site directory
cd my-site
```

## Step 2: Site Configuration

1. Open `site/index.html` in your text editor
2. Modify the basic settings:
```html
<head>
  <title>Your Site Name</title>
  <!-- Other meta tags you might want to change -->
</head>
```

## Step 3: Content Structure

Your content lives in `site/content/`:
```
site/content/
├── posts/     # Blog posts go here
│   └── my-first-post.md
└── pages/     # Static pages go here
    ├── about.md
    └── contact.md
```

## Step 4: Writing Content

### Create a Blog Post
1. Create a new `.md` file in `site/content/posts/`
2. Add frontmatter:
```markdown
---
title: My First Post
date: 2024-01-20
author: Your Name
excerpt: A brief description
---

Your content here...
```

### Create a Page
1. Create a new `.md` file in `site/content/pages/`
2. Add frontmatter:
```markdown
---
title: About
lastUpdated: 2024-01-20
---

Your content here...
```

## Step 5: Preview Your Site

```bash
# Navigate to the site directory
cd site

# Start a local server (choose one):
python -m http.server 8000
# or
php -S localhost:8000
# or
npx serve
# or use VS Code Live Server
```

Visit `http://localhost:8000` in your browser (port may vary depending on your server).

## Step 6: Customization

### Theme Colors
Modify the Tailwind configuration in `site/index.html`:
```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your brand colors
        }
      }
    }
  }
};
```

### Components
Major components you might want to customize:
- `Navigation`: Site header and navigation
- `Home`: Landing page layout
- `PostList`: Blog listing page
- `Post`: Individual post layout

## Common Tasks

### Adding Navigation Links
Modify the Navigation component in `site/index.html`:
```javascript
function Navigation() {
  return (
    <nav>
      {/* Add your links here */}
    </nav>
  );
}
```

### Adding New Features
1. Create your component in `site/index.html`
2. Add it to the appropriate section
3. Style using Tailwind CSS classes

## Deployment

1. Push your site to GitHub
2. Deploy using:
   - GitHub Pages
   - Netlify
   - Vercel
   - Any static hosting service

## Need Help?

- Check the [README.md](README.md) for detailed documentation
- Visit our [GitHub repository](https://github.com/univault-org/MarkVault)
- Open an issue for support

---

Happy writing! 🚀