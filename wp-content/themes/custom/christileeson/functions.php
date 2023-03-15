<?php
/**
 * Main functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package christileeson
 */

use Kanopi\Assets\Model\LoaderConfiguration;
use Kanopi\Assets\Registry\WordPress;

/**
 * All assets are held in the active theme under the directory /assets
 * The constant `KANOPI_DEVELOPMENT_ASSET_URL` must be defined, otherwise only Production mode is available
 */
function cl_register_kanopi_pack(): void {
	$loader = new WordPress(
		new LoaderConfiguration(
			WordPress::read_theme_version(),
			[ 'christileeson.com' ],
			'/assets/dist/webpack-assets.json'
		)
	);

	$loader->register_frontend_scripts(
		function ( WordPress $_registry ) {
			$loader = $_registry->asset_loader();

			$loader->register_vendor_script( 'vendor' );

			$loader->register_runtime_script( 'runtime', [ 'jquery' ] );
			$loader->register_style( 'theme' );
			$loader->register_script( 'main', [ 'wp-element' ] );

			$loader->enqueue_assets();

			// Required theme stylesheet
			wp_register_style(
				'christileeson-style-header',
				esc_url_raw( get_stylesheet_directory_uri() . '/style.css' ),
				[],
				$_registry::read_theme_version(),
			);
			wp_enqueue_style( 'christileeson-style-header' );
		}
	);

	$loader->register_block_editor_scripts(
		function ( WordPress $_registry ) {
			$loader = $_registry->asset_loader();

			$loader->register_vendor_script( 'vendor' );

			$loader->register_runtime_script( 'runtime', [ 'jquery' ] );
			$loader->register_style( 'block-editor-theme' );
			$loader->register_script( 'block-editor' );

			$loader->enqueue_assets();
		}
	);
}

class_exists( 'Kanopi\Assets\Registry\WordPress' ) ? cl_register_kanopi_pack() : null;

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * - Uses after_setup_theme hook, before the init hook which is too late for some features.
 */
add_action( 'after_setup_theme', function () {
	/*
	 * Theme translations enablement
	 */
	load_theme_textdomain( 'christileeson', get_template_directory() . '/languages' );

	/*
	 * CMS Managed <title>
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 */
	add_theme_support( 'post-thumbnails', [ 'page' ] );

	/**
	 * Register theme menus
	 */
	register_nav_menus( [
		'primary' => esc_html__( 'Main Menu', 'christileeson' )
	] );

	/*
	 * Switch default core markup for search form.
	 */
	add_theme_support( 'html5', [
		'search-form',
		'gallery',
		'caption',
	] );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support( 'custom-logo', [
		'height'      => 50,
		'width'       => 210,
		'flex-width'  => true,
		'flex-height' => true,
	] );
} );
