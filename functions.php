<?php
/**
 * Bend Theme Functions
 */

// Theme setup
function bend_setup() {
    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');
    
    // Let WordPress manage the document title
    add_theme_support('title-tag');
    
    // Enable support for Post Thumbnails
    add_theme_support('post-thumbnails');
    
    // Register navigation menu
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'bend'),
    ));
    
    // Switch default core markup to output valid HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // Add theme support for selective refresh for widgets
    add_theme_support('customize-selective-refresh-widgets');
    
    // Add support for custom logo
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ));
}
add_action('after_setup_theme', 'bend_setup');

// Set content width
function bend_content_width() {
    $GLOBALS['content_width'] = apply_filters('bend_content_width', 800);
}
add_action('after_setup_theme', 'bend_content_width', 0);

// Enqueue scripts and styles
function bend_scripts() {
    // Enqueue main stylesheet
    wp_enqueue_style('bend-style', get_stylesheet_uri(), array(), '1.0.0');
    wp_enqueue_style('tailwind-output', get_template_directory_uri() . '/assets/css/bundle.css');
    wp_enqueue_script('svelte-code', get_template_directory_uri() . '/assets/js/bundle.iife.js', array(), '1.0.0', true);
    // Enqueue comment reply script if needed
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'bend_scripts');

// Enqueue scripts for block editor (includes pattern editor)
function bend_editor_scripts() {
    wp_enqueue_style('tailwind-output', get_template_directory_uri() . '/assets/css/bundle.css');
    wp_enqueue_script('svelte-code', get_template_directory_uri() . '/assets/js/bundle.iife.js', array(), '1.0.0', true);
}
add_action('enqueue_block_editor_assets', 'bend_editor_scripts');

// Excerpt length
function bend_excerpt_length($length) {
    return 30;
}
add_filter('excerpt_length', 'bend_excerpt_length');

// Excerpt more
function bend_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'bend_excerpt_more');


add_action( 'acf/init', 'hfm_acf_init_blocks' );
function hfm_acf_init_blocks() {

    if ( function_exists( 'acf_register_block_type' ) ) {
        acf_register_block_type(
            array(
                'name'            => 'opening-hours',
                'title'           => 'Café Opening Hours',
                'description'     => 'Display opening hours for a café',
                'render_template' => 'inc/block-templates/opening-hours/opening-hours.php',
                'category'        => 'text',
                'icon'            => 'admin-comments',
                'api_version'     => 2,
                'keywords'        => array(),
                'mode'            => 'preview',
                'supports'        => array(
                    'jsx'        => true,
                    'color'      => array(
                        'text'       => true,
                        'background' => false,
                    ),
                    'align_text' => true,
                    'align' => array( 'left', 'right', 'full' ),
                    'align_content' => 'matrix',
                    'full_height' => true,
                    'mode' => false
                ),
            )
        );
        acf_register_block_type(
            array(
                'name'            => 'parallax-image',
                'title'           => 'Parallax Image',
                'description'     => 'Display a parallax image',
                'render_template' => 'inc/block-templates/parallax-image/parallax-image.php',
                'category'        => 'text',
                'icon'            => 'admin-comments',
                'api_version'     => 2,
                'keywords'        => array(),
                'mode'            => 'preview',
                'supports'        => array(
                    'jsx'        => true,
                    'color'      => array(
                        'text'       => true,
                        'background' => false,
                    ),
                    'align_text' => true,
                    'align' => array( 'left', 'right', 'full' ),
                    'align_content' => 'matrix',
                    'full_height' => true,
                    'mode' => false
                ),
            )
        );
    }
}