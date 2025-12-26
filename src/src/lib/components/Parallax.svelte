<script>
    /**
     * Parallax Component
     * Creates a parallax scrolling effect based on viewport position
     * Exposes a --perceptual CSS variable (0 to 1) that children can use for animations
     */

    import { scrollY } from "../stores/scrollStore.js";


    let { 
        debug = true,               // Show debug lines and progress indicator
        in_trigger = '80%',         // Viewport position where animation starts
        out_trigger = '30px',       // Viewport position where animation ends
        parallaxContent = ()=>{},   // Render snippet function for advanced usage
        children = ''               // HTML children from PHP templates
    } = $props();
    
    // Convert debug to boolean if it comes as string from HTML attribute
    let debugEnabled = $derived(
        typeof debug === 'string' 
            ? debug === 'true' || debug === '1' || debug === 'yes'
            : debug
    );
    
    // DOM reference to the container element
    let container
    let containerOffsetTop = $state(0)
    let containerOffsetHeight = $state(0)
    let width = $state(0)
    let height = $state(0)

    let in_trigger_calc = $derived.by(()=>{
        let result = in_trigger
        if(typeof in_trigger == 'string'){
            if(in_trigger.includes('px')){
                result = parseFloat(in_trigger.replace('px',''))
            }else if(in_trigger.includes('%')){
                result = height*parseFloat(in_trigger.replace('%',''))/100
            }
        }else{
            result = in_trigger+'px'
        }
        return result
    })
    let out_trigger_calc = $derived.by(()=>{
        let result = out_trigger
        if(typeof out_trigger == 'string'){
            if(out_trigger.includes('px')){
                result = parseFloat(out_trigger.replace('px',''))
            }else if(out_trigger.includes('%')){
                result = height*parseFloat(out_trigger.replace('%',''))/100
            }
        }else{
            result = out_trigger+'px'
        }
        return result
    })

    let in_point = $derived((containerOffsetTop-in_trigger_calc)-$scrollY)
    let out_point = $derived((containerOffsetTop+containerOffsetHeight-out_trigger_calc)-$scrollY)
    
    // posiciones absolutas en el documento
    let in_scroll_pos = $derived(containerOffsetTop-in_trigger_calc);
    let out_scroll_pos = $derived(containerOffsetTop + containerOffsetHeight-out_trigger_calc);

    // porcentaje de progreso (0 a 1)
    let perceptual = $derived(
        Math.min(
        Math.max(($scrollY - in_scroll_pos) / (out_scroll_pos - in_scroll_pos),0),1)
    );

    $effect(()=>{
        if(typeof container != 'undefined'){
            containerOffsetTop = container?.offsetTop
            containerOffsetHeight = container?.getBoundingClientRect().height
        }
    })
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />
<div class="relative h-screen" 
     bind:this={container}
     style="--perceptual: {perceptual};">
    
    {#if debugEnabled}
        <div class="border-t border-green-500 w-full h-[1px] fixed left-0 z-10" style="top:{in_trigger};"></div>
        <div class="border-t border-red-500 w-full h-[1px] fixed left-0 z-10" style="top:{out_trigger};"></div>
        <div class="sticky top-1/2 w-min z-50 bg-zinc-200 p-3 bg-opacity-40 rounded">{parseInt(perceptual*100).toFixed()}</div>
    {/if}
    
    <div class="parallax-content">
        <img src="https://images.unsplash.com/photo-1765871319901-0aaafe3f1a2a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Sample unsplash" />
    </div>
    {#if children}
        <!-- Render HTML children from PHP -->
        {@html children}
    {:else}
        <!-- Use render snippet if provided -->
        {@render parallaxContent(perceptual)}
    {/if}
</div>

<!--
PARALLAX USE
<Parallax debug={true} in_trigger={'20%'} out_trigger={'80%'}>
	{#snippet parallaxContent(perceptual)}
		<div class="h-screen bg-gradient-to-b from-red-500 to-zinc-800 flex items-center justify-center">
			<div style="transform: rotate({360*perceptual}deg);">{perceptual}</div>
		</div>
	{/snippet}
</Parallax>
-->

<style>
    .parallax-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .parallax-content img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: 
            translateY(calc(-30% + var(--perceptual) * 80%)) 
            scale(calc(1 + var(--perceptual) * 0.5));
        transition: transform 0.1s ease-out;
    }
</style>