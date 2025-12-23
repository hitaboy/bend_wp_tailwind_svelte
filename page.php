<?php
/**
 * The template for displaying pages
 */

get_header();
?>

<main class="content-area p-8">

    <?php
    while (have_posts()) :
        the_post();
        ?>
        
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <header class="entry-header">
                <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
            </header><!-- .entry-header -->

            <?php if (has_post_thumbnail()) : ?>
                <div class="post-thumbnail">
                    <?php the_post_thumbnail('large'); ?>
                </div>
            <?php endif; ?>

            <div class="entry-content">
                <?php
                the_content();

                wp_link_pages(array(
                    'before' => '<div class="page-links">' . __('Pages:', 'bend'),
                    'after'  => '</div>',
                ));
                ?>

                <?php
                // Display ACF fields
                $text_field = get_field('text');
                $image_field = get_field('image');
                
                if ($text_field) : ?>
                    <div class="acf-text">
                        <p><?php echo esc_html($text_field); ?></p>
                    </div>
                <?php endif;
                
                if ($image_field) : ?>
                    <div class="acf-image">
                        <img src="<?php echo esc_url($image_field['url']); ?>" alt="<?php echo esc_attr($image_field['alt']); ?>">
                    </div>
                <?php endif; ?>

            </div><!-- .entry-content -->
        </article><!-- #post-<?php the_ID(); ?> -->

        <?php
        // If comments are open or we have at least one comment, load the comment template
        if (comments_open() || get_comments_number()) :
            comments_template();
        endif;

    endwhile;
    ?>

</main><!-- #primary -->

<?php
get_footer();
