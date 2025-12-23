# Svelte Components Library

This directory contains the Svelte components library for the Bend theme. Components are built as standalone bundles that can be integrated into WordPress with stunning performance and advanced interactivity.

## Project Structure

```
src/
├── lib/              # Svelte components library
│   ├── index.js      # Main entry point & component registry
│   ├── stores.js     # Svelte stores for shared state
│   └── components/   # Your Svelte components
├── routes/           # Development/preview app (SvelteKit)
├── app.css           # Main CSS entry point
├── vite.config.js    # Build configuration
└── package.json
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Development

Start the development server:

```sh
npm run dev
# or
yarn dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

This runs the SvelteKit development environment where you can preview and test your components.

## Building for Production

Build the library as a bundle for WordPress integration:

```sh
npm run build:lib
# or
yarn build:bundle
```

This will:
- Bundle all Svelte components from `src/lib`
- Compile Tailwind CSS with Svelte component styles
- Generate IIFE, ES, and UMD formats
- Output JavaScript files to `../assets/js/`
- Output CSS files to `../assets/css/`
- Watch PHP files for changes during development (in watch mode)

### Build Configuration

The build is configured in `vite.config.js` with two modes:

1. **Library mode** (`npm run build:lib`): Bundles components for WordPress
   - Entry: `src/lib/index.js`
   - Output formats: IIFE, ES, UMD
   - JS output: `../assets/js/bundle.[format].js`
   - CSS output: `../assets/css/bundle.css`
   - Watches: `*.php`, `inc/**/*.php`, `templates/**/*.php` (in watch mode)

2. **SvelteKit mode** (`npm run build`): Production build of the preview app

### Output Files

After building, you'll have:

```
../assets/
├── css/
│   └── bundle.css           # Tailwind + component styles
└── js/
    ├── bundle.iife.js       # For <script> tags (recommended)
    ├── bundle.es.js         # ES modules
    └── bundle.umd.js        # Universal module definition
```

## Adding Components

1. Create your component in `src/lib/components/`
2. Register it in `src/lib/index.js` with a CSS selector
3. Run `npm run build:lib` to bundle

Example:

```javascript
// src/lib/index.js
import MyComponent from './components/MyComponent.svelte';

let components = [
	{ selector: '.my-component', component: MyComponent }
];

export { MyComponent };
```

## Component Styling with SASS

Svelte components in this project have full SASS/SCSS support:

```svelte
<script>
	let { count = 0 } = $props();
</script>

<div class="counter">
	<button onclick={() => count++}>
		Count: {count}
	</button>
</div>

<style lang="scss">
.counter {
	padding: 1rem;
	background: #f0f0f0;
	
	button {
		@apply bg-blue-500 text-white px-4 py-2 rounded;
		transition: all 0.2s;
		
		&:hover {
			@apply bg-blue-600;
			transform: scale(1.05);
		}
	}
}
</style>
```

### SASS Features Available:
- **Nesting**: Natural parent-child relationships
- **Variables**: `$primary-color: #blue;`
- **Mixins**: Reusable style blocks
- **Functions**: `lighten()`, `darken()`, `rgba()`, etc.
- **@apply**: Use Tailwind utilities inside SCSS
- **Partials**: Import SCSS files

## Using in WordPress

After building, enqueue the bundled files in your WordPress theme:

```php
// functions.php
function bend_scripts() {
    wp_enqueue_style('bend-bundle', get_template_directory_uri() . '/assets/css/bundle.css', [], '1.0.0');
    wp_enqueue_script('bend-bundle', get_template_directory_uri() . '/assets/js/bundle.iife.js', [], '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'bend_scripts');

// For block editor support
function bend_editor_scripts() {
    wp_enqueue_style('bend-bundle', get_template_directory_uri() . '/assets/css/bundle.css');
    wp_enqueue_script('bend-bundle', get_template_directory_uri() . '/assets/js/bundle.iife.js', [], '1.0.0', true);
}
add_action('enqueue_block_editor_assets', 'bend_editor_scripts');
```

Then use in PHP templates or ACF blocks:

```php
<div class="my-component" data-count="5"></div>
```

The component will automatically mount and receive props from data attributes.

**Note**: If you're using ACF blocks, remember to import the corresponding JSON field group files from `inc/block-templates/[block-name]/[block-name].json` via **Custom Fields > Tools > Import Field Groups** in WordPress admin.

## Hot Reload with PHP

The build configuration includes a plugin that watches parent PHP files and triggers rebuild when they change:
- `*.php` (theme root)
- `inc/**/*.php` (includes)
- `templates/**/*.php` (templates)

This ensures Tailwind picks up new utility classes from PHP files during development.

**To enable watch mode:**

```sh
npm run watch:bundle
# or
yarn watch:bundle
```

## Development Workflow

### Typical workflow:

1. **Start watch mode**: `yarn watch:bundle`
2. **Edit Svelte components** in `src/lib/`
3. **Edit PHP templates** - builds trigger automatically
4. **Use Tailwind classes** in either Svelte or PHP
5. **Check output** in `../assets/css/` and `../assets/js/`

### Build outputs:
- CSS is automatically compiled and includes all Tailwind utilities
- Component styles (including SCSS) are scoped and bundled
- JavaScript bundles are tree-shaken and optimized
- Source maps are generated in development mode

## Publishing to npm

To publish your library to [npm](https://www.npmjs.com):

1. Update `package.json` with your package name and license
2. Run `npm publish`

**Note**: This is optional. For WordPress theme use, just build locally.

## Resources

- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/overview)
- [SvelteKit Documentation](https://svelte.dev/docs/kit)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [SASS Documentation](https://sass-lang.com/documentation)

## Troubleshooting

### CSS not updating
- Run `yarn build:bundle` to rebuild
- Check that Tailwind is scanning the correct files in `tailwind.config.js`
- Clear browser cache

### SCSS compilation errors
- Ensure `lang="scss"` is set in `<style>` tag
- Check SCSS syntax (proper nesting, semicolons, etc.)

### Components not mounting
- Verify the selector in `src/lib/index.js` matches the CSS class in PHP
- Check browser console for errors
- Ensure bundle is enqueued in `functions.php`
