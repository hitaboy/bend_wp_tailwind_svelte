<?php
/**
 * The template for displaying single posts
 */

get_template_part('inc/layout-templates/header');
?>

<main class="content-area p-8">

    <?php
    while (have_posts()) :
        the_post();
        ?>
        
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <header class="entry-header">
                <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
                
                <div class="entry-meta">
                    <span class="posted-on">
                        <?php echo get_the_date(); ?>
                    </span>
                    <span class="byline">
                        <?php _e('by', 'bend'); ?> 
                        <a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>">
                            <?php echo get_the_author(); ?>
                        </a>
                    </span>
                    <?php
                    $categories = get_the_category();
                    if ($categories) :
                        ?>
                        <span class="cat-links">
                            <?php _e('in', 'bend'); ?> 
                            <?php the_category(', '); ?>
                        </span>
                        <?php
                    endif;
                    ?>
                </div><!-- .entry-meta -->
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
            </div><!-- .entry-content -->

            <?php if (get_the_tags()) : ?>
                <footer class="entry-footer">
                    <?php
                    $tags_list = get_the_tag_list('', ', ');
                    if ($tags_list) {
                        printf('<span class="tags-links">' . __('Tagged: %s', 'bend') . '</span>', $tags_list);
                    }
                    ?>
                </footer><!-- .entry-footer -->
            <?php endif; ?>
        </article><!-- #post-<?php the_ID(); ?> -->

        <?php
        // Post navigation
        the_post_navigation(array(
            'prev_text' => '<span class="nav-subtitle">' . __('Previous:', 'bend') . '</span> <span class="nav-title">%title</span>',
            'next_text' => '<span class="nav-subtitle">' . __('Next:', 'bend') . '</span> <span class="nav-title">%title</span>',
        ));

        // If comments are open or we have at least one comment, load the comment template
        if (comments_open() || get_comments_number()) :
            comments_template();
        endif;

    endwhile;
    ?>

</main><!-- #primary -->

<?php
get_template_part('inc/layout-templates/footer');
