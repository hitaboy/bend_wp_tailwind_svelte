<!DOCTYPE html>
<html <?php language_attributes(); ?> data-theme="benddark">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <header class="site-header flex justify-between py-4 px-8">
        <div class="site-container flex justify-between flex-auto">
            <div class="site-branding">
                <?php
                if (has_custom_logo()) {
                    $custom_logo_id = get_theme_mod( 'custom_logo' );
                    $image = wp_get_attachment_image_src( $custom_logo_id , 'full' );
                    ?>
                    <img src="<?php echo esc_url( $image[0] ); ?>" alt="<?php bloginfo('name'); ?>" class="w-40"/>
                    <?php
                } else {
                    ?>
                    <h1 class="site-title">
                        <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
                            <?php bloginfo('name'); ?>
                        </a>
                    </h1>
                    <?php
                    $description = get_bloginfo('description', 'display');
                    if ($description || is_customize_preview()) :
                        ?>
                        <p class="site-description"><?php echo $description; ?></p>
                    <?php endif;
                }
                ?>
                <input type="checkbox" value="bendlight" class="toggle theme-controller" />
            </div><!-- .site-branding -->

            <nav id="site-navigation" class="main-navigation flex-auto flex justify-end items-center">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'menu_id'        => 'primary-menu',
                    'container'      => false,
                ));
                ?>
            </nav><!-- #site-navigation -->
        </div><!-- .site-container -->
    </header>

    <div id="content" class="site-content">