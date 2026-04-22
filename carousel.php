<?php
/**
 * Plugin Name:       Ekwa owl carousel
 * Description:       A Gutenberg block to show carousel
 * Version:           0.1.9
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Sameera
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ekwa-owl-carousel
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

require 'includes/plugin-update-checker/plugin-update-checker.php';
use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

$myUpdateChecker = PucFactory::buildUpdateChecker(
	'https://github.com/ekwamarketing/Ekwa-owl-carousel/',
	__FILE__,
	'ekwa-owl-carousel'
);

function create_block_carousel_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_carousel_block_init' );


function owl_settings(){
    ?>
    <script>
        var owlSettings = [];
    </script>
    <?php
}
add_action('wp_head', 'owl_settings');

if(!function_exists('before_after_scripts_array')){
    function before_after_scripts_array(){
        ?>
        <script>
            var beforeAfterScripts  = [];
            var beforeAfterStyles = [];

            function beforeAfterInsertScripts(e){
                if(!function e(t){
                    for(var r=document.getElementsByTagName("script"),n=r.length;n--;)
                        if(r[n].src==t)return!0;
                    return!1
                }(e)){
                    var t=document.getElementsByTagName("head")[0],r=document.createElement("script");
                    r.type="text/javascript",r.src=e,t.appendChild(r)
                }
            }

            function beforeAfterInsertStyles(e,t){
                if(!document.getElementById(t)){
                    var r=document.createElement("link");
                    r.href=e,r.id=t,r.type="text/css",r.rel="stylesheet",
                    document.getElementsByTagName("head")[0].appendChild(r)
                }
            }
        </script>
        <?php
     }
}

 add_action('wp_head', 'before_after_scripts_array');


function owl_carousel_scripts_inject(){
    ?>
    <script>
        (function() {
            var PluginDirBA = '<?php echo esc_js( plugin_dir_url( __FILE__ ) ); ?>';
            var owlScriptFile = PluginDirBA + 'assets/owl-carousel/owl.carousel.min.js';
            var beforeAfterStyleSheet = {
                "link": PluginDirBA + 'assets/owl-carousel/css/owl.carousel.min.css',
                "handle": "owlCarouselCss"
            };

            beforeAfterScripts.push(owlScriptFile);
            beforeAfterStyles.push(beforeAfterStyleSheet);

            var hasLoaded = false; // Prevent multiple loads

            // Function to check if jQuery is loaded and inject scripts
            function loadOwlCarouselAfterJquery(retries) {
                retries = retries || 0;

                if (hasLoaded) {
                    return; // Already loaded, exit
                }

                if (typeof jQuery !== 'undefined') {
                    // jQuery is loaded, inject scripts
                    beforeAfterScripts.forEach(function(e){
                        beforeAfterInsertScripts(e);
                    });
                    beforeAfterStyles.forEach(function(array){
                        beforeAfterInsertStyles(array.link, array.handle);
                    });
                    hasLoaded = true;
                } else if (retries < 160) { // Max 8 seconds (160 * 50ms)
                    // jQuery not loaded yet, wait and retry
                    setTimeout(function() {
                        loadOwlCarouselAfterJquery(retries + 1);
                    }, 50);
                } else {
                    console.error('Owl Carousel: jQuery failed to load after 8 seconds');
                }
            }

            // Load on scroll (once)
            var scrollHandler = function() {
                loadOwlCarouselAfterJquery();
                window.removeEventListener('scroll', scrollHandler);
            };
            window.addEventListener('scroll', scrollHandler, { passive: true });

            // Load on first mouse move (once)
            var moveHandler = function() {
                loadOwlCarouselAfterJquery();
                document.removeEventListener('mousemove', moveHandler);
            };
            document.addEventListener('mousemove', moveHandler, { passive: true });
        })();
    </script>
    <?php
}

add_action('wp_footer', 'owl_carousel_scripts_inject');