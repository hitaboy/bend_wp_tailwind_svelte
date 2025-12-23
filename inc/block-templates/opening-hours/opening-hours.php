<?php
$align       = isset( $block['align_text'] ) ? $block['align_text'] : 'left';
$textcolor   = isset( $block['textColor'] ) ? $block['textColor'] : 'inherit';
$full_height = isset( $block['full_height'] ) ? $block['full_height'] : false;

if ( substr( $textcolor, 0, 1 ) !== '#' && substr( $textcolor, 0, 4 ) !== 'rgb(' ) {
    $textcolor = 'var(--wp--preset--color--' . $textcolor . ')';
}

$height_style = $full_height ? 'height: 100%;' : '';
?>
<aside class="opening-times flex flex-col justify-between" style="color: <?php echo $textcolor; ?>; text-align: <?php echo $align; ?>; <?php echo $height_style; ?>">
    <h5 class="bg-red-500" style="margin-top: 0; margin-bottom: 0.5rem;">Opening Hours</h5>
    <?php $opening_times = get_field( 'opening_times' ); ?>
    <?php if ( ! empty( $opening_times ) ) { ?>
        <?php foreach ( $opening_times as $period ) { ?>
            <strong><?php echo $period['time_period']; ?></strong>:
            <?php echo $period['opening_time']; ?>
            <?php if ( ! empty( $period['closing_time'] ) ) { ?>
                - <?php echo $period['closing_time']; ?>
            <?php } ?>
            <br />
        <?php } ?>
    <?php }else{ ?>
    <div>No opening hours available.</div>
    <?php } ?>
    <div class="bend-counter" 
         data-initial-count="20" 
         data-opening_times='<?php echo json_encode($opening_times); ?>'>
    </div>
</aside>