
![bend](https://github.com/hitaboy/bend_wp_tailwind_svelte/blob/main/screenshot.png?raw=true)
# Bend WordPress Theme

A modern WordPress theme built with Svelte 5 and Tailwind CSS v3, designed for custom theme development. Built to deliver stunning performance, precise design fine-tuning, and advanced custom interactivity through interactive components and custom ACF blocks.

## Requirements

- **WordPress** 5.0 or higher
- **PHP** 7.4 or higher
- **Advanced Custom Fields (ACF)** Pro plugin - **Required**
- **Node.js** 18+ and Yarn

## Features

- 🎨 **Tailwind CSS v3** for utility-first styling
- ⚡ **Svelte 5** for reactive, modern JavaScript components
- 🧩 **ACF Blocks** support for custom Gutenberg blocks
- 🔄 **Auto-mounting** components with dynamic props from PHP
- 🎭 **Sass/SCSS** support for custom styling
- 🔥 **Hot Module Replacement** during development

---

## Tailwind CSS v3 Support

### Why Tailwind v3 instead of v4?

This theme uses **Tailwind CSS v3** rather than v4 for **PHP compatibility** reasons:

- **Tailwind v4** uses a new CSS-first configuration approach that requires modern build tools and may have compatibility issues with traditional PHP-based WordPress themes
- **Tailwind v3** works reliably with PostCSS and integrates seamlessly with Vite, ensuring stable builds
- **v3** has better support for watching PHP template files for class changes
- The v3 JIT compiler is mature and battle-tested in production WordPress environments

### Configuration

Tailwind is configured in `js/tailwind.config.js` to scan:
- Svelte components: `./src/**/*.{html,js,svelte,ts}`
- PHP templates: `../*.php`
- PHP includes: `../inc/**/*.php`
- Template parts: `../templates/**/*.php`

The compiled CSS is bundled into `assets/css/bundle.css` and automatically enqueued in WordPress.

---

## Svelte 5 Component System

### Architecture

This theme uses **Svelte 5** with a class-based auto-mounting system. Components are automatically mounted to DOM elements based on CSS class selectors, making it easy to integrate interactive components into PHP templates.

### How It Works

1. Components are defined in `js/src/lib/`
2. Each component is registered with a CSS selector in `js/src/lib/index.js`
3. The build system bundles everything into `assets/js/` and `assets/css/`
4. Components automatically mount when elements with matching classes appear in the DOM
5. A **MutationObserver** watches for dynamically added elements (e.g., in the block editor)

### Creating a New Component

**Step 1:** Create your Svelte component in `js/src/lib/YourComponent.svelte`

```svelte
<script>
	// Define props with default values
	let { initialCount = 0, title = "Counter" } = $props();
	
	let count = $state(initialCount);
	
	function increment() {
		count++;
	}
</script>

<div class="my-component">
	<h3>{title}</h3>
	<button onclick={increment}>Count: {count}</button>
</div>

<style lang="scss">
	.my-component {
		padding: 1rem;
		background: #f0f0f0;
		
		button {
			&:hover {
				opacity: 0.8;
			}
		}
	}
</style>
```

**Step 2:** Register the component in `js/src/lib/index.js`

```javascript
import YourComponent from './YourComponent.svelte';

// Add to components array
let components = [
	{ selector: '.bend-counter', component: Counter },
	{ selector: '.your-component', component: YourComponent }, // Add this line
]

// Export for manual use if needed
export { Counter, YourComponent };
```

**Step 3:** Build the bundle

```bash
cd js
yarn watch:bundle  # Development with watch mode
# or
yarn build:bundle  # Production build
```

### Instantiating Components in PHP

Simply add an element with the registered class selector:

```php
<div class="your-component"></div>
```

The component will automatically mount when the page loads or when the element is dynamically added to the DOM.

### Passing Props from PHP

Use **data attributes** to pass props from PHP to Svelte components:

```php
<?php
$count = 10;
$user_name = get_the_author();
?>

<div class="your-component" 
     data-initial-count="<?php echo $count; ?>"
     data-title="<?php echo esc_attr($user_name); ?>"
     data-enabled="true">
</div>
```

**Data Attribute Conversion:**
- `data-initial-count="10"` → `initialCount` prop (number)
- `data-title="Hello"` → `title` prop (string)
- `data-enabled="true"` → `enabled` prop (boolean)
- Hyphens in attribute names are converted to camelCase

**Passing Arrays/Objects:**

Use `json_encode()` for complex data:

```php
<?php
$opening_times = get_field('opening_times');
?>

<div class="your-component"
     data-opening-times='<?php echo json_encode($opening_times); ?>'>
</div>
```

In Svelte, this becomes the `openingTimes` prop as a parsed JavaScript object/array.

---

## ACF Blocks

This theme supports **Advanced Custom Fields (ACF) Blocks** for creating custom Gutenberg blocks with PHP templates.

### Creating an ACF Block

**Step 1:** Register the block in `functions.php`

```php
add_action('acf/init', 'my_acf_blocks');
function my_acf_blocks() {
    if (function_exists('acf_register_block_type')) {
        acf_register_block_type(array(
            'name'            => 'my-custom-block',
            'title'           => 'My Custom Block',
            'description'     => 'A custom block with ACF fields',
            'render_template' => 'inc/block-templates/my-custom-block.php',
            'category'        => 'formatting',
            'icon'            => 'admin-comments',
            'keywords'        => array('custom', 'my'),
            'supports'        => array(
                'align'          => true,
                'mode'           => false,
                'jsx'            => true,
                'color'          => array(
                    'text'       => true,
                    'background' => true,
                ),
            ),
        ));
    }
}
```

**Step 2:** Create the block template in `inc/block-templates/my-custom-block.php`

```php
<?php
// Get block settings
$text_color = isset($block['textColor']) ? $block['textColor'] : 'inherit';
$bg_color = isset($block['backgroundColor']) ? $block['backgroundColor'] : 'transparent';

// Convert color slugs to CSS variables
if (substr($text_color, 0, 1) !== '#') {
    $text_color = 'var(--wp--preset--color--' . $text_color . ')';
}

// Get ACF fields
$title = get_field('title');
$content = get_field('content');
?>

<div class="my-custom-block" style="color: <?php echo $text_color; ?>;">
    <h2><?php echo esc_html($title); ?></h2>
    <p><?php echo esc_html($content); ?></p>
    
    <!-- Include Svelte component -->
    <div class="your-component" 
         data-title="<?php echo esc_attr($title); ?>">
    </div>
</div>
```

**Step 3:** Create ACF Field Group in WordPress

1. Go to **Custom Fields > Add New**
2. Add your fields (title, content, etc.)
3. Set Location Rules: **Block is equal to My Custom Block**
4. Publish

### Block Features

- **Supports**: Alignment, colors, text alignment, full height
- **ACF Fields**: Access with `get_field('field_name')`
- **Block Context**: Available in `$block` array
- **Svelte Components**: Can be embedded in block templates
- **Editor Preview**: Works in both editor and frontend

---

## Development Workflow

### Initial Setup

```bash
# Install theme dependencies
cd js
yarn install

# Build the bundle
yarn build:bundle
```

### Development

```bash
# Watch mode for automatic rebuilds
cd js
yarn watch:bundle
```

This watches for changes in:
- Svelte components
- CSS/SCSS files
- Parent PHP files (triggers rebuild)

### Building for Production

```bash
cd js
yarn build:bundle
```

Outputs:
- `assets/js/bundle.iife.js` - IIFE format for browser
- `assets/js/bundle.es.js` - ES module format
- `assets/js/bundle.umd.js` - UMD format
- `assets/css/bundle.css` - Compiled CSS (Tailwind + component styles)

---

## File Structure

```
bend/
├── assets/
│   ├── css/
│   │   └── bundle.css        # Compiled CSS (Tailwind + styles)
│   └── js/
│       ├── bundle.iife.js    # Main JavaScript bundle
│       ├── bundle.es.js      # ES module bundle
│       └── bundle.umd.js     # UMD bundle
├── inc/
│   └── block-templates/      # ACF block templates
│       ├── opening-hours/
│       │   └── opening-hours.php
│       └── parallax-image/
│           └── parallax-image.php
├── js/                       # Svelte/Vite workspace
│   ├── src/
│   │   ├── lib/
│   │   │   ├── index.js      # Component registry
│   │   │   ├── stores.js     # Svelte stores
│   │   │   ├── Counter.svelte
│   │   │   └── Parallax.svelte
│   │   └── app.css           # Main CSS entry
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── styles/
│   └── input.css             # Additional custom styles
├── functions.php             # Theme functions
├── header.php
├── footer.php
├── style.css                 # Theme stylesheet header
└── README.md
```

---

## Svelte Components

This theme uses Svelte for interactive components. For detailed information about developing and building Svelte components, see the [Svelte Components README](src/README.md).

---

## Advanced Features

### Shared State Between Component Instances

Use Svelte stores to share state across multiple component instances:

```javascript
// js/src/lib/stores.js
import { writable } from 'svelte/store';
export const sharedCount = writable(0);

// In your component
import { sharedCount } from './stores.js';

function increment() {
    sharedCount.update(n => n + 1);
}
```

All instances of the component will share the same state.

### Custom Styles with Sass

The theme has full Sass/SCSS support in Svelte components:

```svelte
<style lang="scss">
.my-component {
    padding: 1rem;
    background: #f0f0f0;
    
    .title {
        font-size: 1.5rem;
        color: darken(#333, 10%);
    }
    
    &:hover {
        background: lighten(#f0f0f0, 5%);
    }
    
    button {
        @apply bg-blue-500 text-white px-4 py-2 rounded;
        
        &:hover {
            @apply bg-blue-600;
        }
    }
}
</style>
```

You can use:
- **Sass features**: Variables, mixins, nesting, functions
- **Tailwind @apply**: Mix utility classes with custom styles
- **Color functions**: `lighten()`, `darken()`, `rgba()`, etc.

### Watching PHP Files

The Vite config includes a custom plugin that watches PHP files and triggers rebuilds when they change, ensuring Tailwind picks up new classes.

---

## Troubleshooting

### Components not mounting in block editor

Make sure `enqueue_block_editor_assets` is hooked in `functions.php` to load scripts in the editor.

### Tailwind classes not working

1. Check that classes are in scanned files (`tailwind.config.js`)
2. Rebuild the bundle: `yarn build:bundle`
3. Clear browser cache

### ACF fields not showing

1. Verify ACF Pro is installed and active
2. Check field group location rules match your block name
3. Ensure `get_field()` is called without `get_the_ID()` in block templates

---

## Requirements Summary

✅ **Required:**
- Advanced Custom Fields (ACF) Pro plugin
- PHP 7.4+
- Node.js 18+ and Yarn

🎯 **Recommended:**
- WordPress 6.0+
- Modern browser for development

---

## License

This theme is licensed for use in your WordPress projects.
