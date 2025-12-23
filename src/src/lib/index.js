import Counter from './Counter.svelte';
import Parallax from './Parallax.svelte';
import { mount } from 'svelte';
import '../app.scss'; // Import Tailwind styles

// Export the component for manual use
export { Counter, Parallax };

let components = [
	{ selector: '.bend-counter', component: Counter, children: true },
	{ selector: '.bend-parallax', component: Parallax, children: false }
]

// Track mounted instances to avoid double-mounting
const mountedElements = new WeakSet();

// Helper function to extract data attributes as props
function getPropsFromElement(element) {
	const props = {};
	
	// Get all data attributes
	Array.from(element.attributes).forEach(attr => {
		if (attr.name.startsWith('data-')) {
			// Convert data-my-prop to myProp
			const propName = attr.name
				.slice(5) // Remove 'data-'
				.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
			
			// Try to parse as JSON, otherwise use as string
			try {
				props[propName] = JSON.parse(attr.value);
			} catch {
				props[propName] = attr.value;
			}
		}
	});
	
	return props;
}

// Auto-mount function
export function mountComponents() {
	const instances = [];
	
	components.forEach(({ selector, component }) => {
		const elements = document.querySelectorAll(selector);
		
		elements.forEach((element) => {
			// Skip if already mounted
			if (mountedElements.has(element)) {
				return;
			}
			
			const props = getPropsFromElement(element);
			
			if(component.children){
				// Capture innerHTML as children prop if it exists
				if (element.innerHTML.trim()) {
					props.children = element.innerHTML;
					// Clear the element since we're passing content as prop
					element.innerHTML = '';
				}
			}
			
			const instance = mount(component, {
				target: element,
				props: props
			});
			instances.push(instance);
			mountedElements.add(element);
		});
	});
	
	return instances;
}

// Watch for dynamically added elements (for block editor)
function watchForNewElements() {
	const observer = new MutationObserver(() => {
		mountComponents();
	});
	
	observer.observe(document.body, {
		childList: true,
		subtree: true
	});
}

// Auto-mount when DOM is ready
if (typeof window !== 'undefined') {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => {
			mountComponents();
			watchForNewElements();
		});
	} else {
		// DOM already loaded
		mountComponents();
		watchForNewElements();
	}
}
