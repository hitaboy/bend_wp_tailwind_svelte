        
    </div><!-- .site-content -->

    <footer id="colophon" class="site-footer">
        <div class="site-container">
            <div class="site-info">
                <p>
                    &copy; <?php echo date('Y'); ?> 
                    <a href="<?php echo esc_url(home_url('/')); ?>">
                        <?php bloginfo('name'); ?>
                    </a>
                </p>
                <p>
                    <?php
                    /* translators: 1: Theme name, 2: WordPress */
                    printf(
                        esc_html__('Theme: %1$s | Powered by %2$s', 'bend'),
                        'Bend',
                        '<a href="https://wordpress.org/">WordPress</a>'
                    );
                    ?>
                </p>
            </div><!-- .site-info -->
        </div><!-- .site-container -->
    </footer><!-- .site-footer -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
