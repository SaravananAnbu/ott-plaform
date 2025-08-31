# Tailwind CSS Usage Guide

This project uses Tailwind CSS 3.4.17 with custom component styles for consistent UI design.

## Custom Component Classes

### Button Styles

The following button classes are available:

- `.btn` - Base button styles with padding, rounded corners, and focus states
- `.btn-primary` - Blue primary button (background: blue-600, hover: blue-700)
- `.btn-secondary` - Gray secondary button (background: gray-200, hover: gray-300)

**Example usage:**
```jsx
<button className="btn btn-primary">Primary Action</button>
<button className="btn btn-secondary">Secondary Action</button>
```

### Heading Styles

Custom heading classes with responsive typography:

- `.h1` - Largest heading (4xl/5xl on mobile/desktop)
- `.h2` - Second level heading (3xl/4xl on mobile/desktop) 
- `.h3` - Third level heading (2xl/3xl on mobile/desktop)
- `.h4` - Fourth level heading (xl/2xl on mobile/desktop)
- `.h5` - Fifth level heading (lg/xl on mobile/desktop)
- `.h6` - Sixth level heading (base/lg on mobile/desktop)

**Example usage:**
```jsx
<h1 className="h1">Main Page Title</h1>
<h2 className="h2">Section Header</h2>
<h3 className="h3">Subsection Header</h3>
<h4 className="h4">Content Header</h4>
<h5 className="h5">Minor Header</h5>
<h6 className="h6">Small Header</h6>
```

## Regular Tailwind Utility Classes

You can also use any standard Tailwind utility classes alongside these custom components:

```jsx
<div className="bg-gray-50 p-6 rounded-lg shadow-md">
  <h2 className="h2 text-center mb-4">Card Title</h2>
  <button className="btn btn-primary w-full">Full Width Button</button>
</div>
```

## Configuration

The Tailwind configuration is located in `tailwind.config.js` and includes:

- Content paths for React components
- Custom component definitions using the `addComponents` plugin
- Responsive breakpoints and theme extensions

## Development

When making changes to Tailwind classes:

1. The development server will automatically rebuild CSS with Vite's HMR
2. New utility classes are processed on-demand
3. Custom component styles are always included
4. Use `npm run build` to generate production-optimized CSS