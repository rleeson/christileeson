<?php
/**
 * Plugin Name: MU Plugin Application Loader
 * Author: Ryan Leeson
 * Author URI: https://github.com/rleeson
 * Description: Composer based Auto Loader runs for all of WP
 *
 */

// Run the auto-loader for the site if not loaded externally
if ( ! file_exists( WP_CONTENT_DIR . '/mu-plugins/vendor/autoload.php' ) ) {
	wp_die( 'Unable to run the WordPress autoloader.' );
}

require_once WP_CONTENT_DIR . '/mu-plugins/vendor/autoload.php';
