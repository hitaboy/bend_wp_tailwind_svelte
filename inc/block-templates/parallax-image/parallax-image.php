<?php
$align       = isset( $block['align_text'] ) ? $block['align_text'] : 'left';
$textcolor   = isset( $block['textColor'] ) ? $block['textColor'] : 'inherit';
$full_height = isset( $block['full_height'] ) ? $block['full_height'] : false;

if ( substr( $textcolor, 0, 1 ) !== '#' && substr( $textcolor, 0, 4 ) !== 'rgb(' ) {
    $textcolor = 'var(--wp--preset--color--' . $textcolor . ')';
}

$height_style = $full_height ? 'height: 100%;' : '';
$in_trigger = get_field( 'in_trigger' );
$out_trigger = get_field( 'out_trigger' );
$debug = get_field( 'debug' );

?>
<aside class="flex flex-col justify-between" style="color: <?php echo $textcolor; ?>; text-align: <?php echo $align; ?>; <?php echo $height_style; ?>">
    <div class="bend-parallax" 
        data-in_trigger="<?php echo esc_attr($in_trigger); ?>"
        data-out_trigger="<?php echo esc_attr($out_trigger); ?>"
        data-debug="<?php echo esc_attr($debug); ?>"
    ></div>
</aside>