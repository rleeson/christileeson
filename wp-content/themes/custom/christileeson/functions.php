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
add_action(
	'after_setup_theme',
	function () {
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
		register_nav_menus(
			[
				'primary' => esc_html__( 'Main Menu', 'christileeson' ),
			]
		);

		/*
		* Switch default core markup for search form.
		*/
		add_theme_support(
			'html5',
			[
				'search-form',
				'gallery',
				'caption',
			]
		);

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			[
				'height'      => 50,
				'width'       => 210,
				'flex-width'  => true,
				'flex-height' => true,
			]
		);
	}
);

// Post Type Registration
add_action(
	'init',
	function () {
		register_post_type(
			'case-studies',
			[
				'public'       => true,
				'show_in_rest' => true,
				'labels'       => [
					'name'                     => _x( 'Case Studies', 'case study type general name', 'christileeson' ),
					'singular_name'            => _x( 'Case Study', 'case study type singular name', 'christileeson' ),
					'add_new'                  => _x( 'Add New', 'case study', 'christileeson' ),
					'add_new_item'             => __( 'Add New Case Study', 'christileeson' ),
					'edit_item'                => __( 'Edit Case Study', 'christileeson' ),
					'new_item'                 => __( 'New Case Study', 'christileeson' ),
					'view_item'                => __( 'View Case Study', 'christileeson' ),
					'view_items'               => __( 'View Case Studies', 'christileeson' ),
					'search_items'             => __( 'Search Case Studies', 'christileeson' ),
					'not_found'                => __( 'No case studies found.', 'christileeson' ),
					'not_found_in_trash'       => __( 'No case studies found in Trash.', 'christileeson' ),
					'parent_item_colon'        => null,
					'all_items'                => __( 'All Case Studies', 'christileeson' ),
					'archives'                 => __( 'Case Study Archives', 'christileeson' ),
					'attributes'               => __( 'Case Study Attributes', 'christileeson' ),
					'insert_into_item'         => __( 'Insert into case study', 'christileeson' ),
					'uploaded_to_this_item'    => __( 'Uploaded to this case study', 'christileeson' ),
					'featured_image'           => _x( 'Featured image', 'case study', 'christileeson' ),
					'set_featured_image'       => _x( 'Set featured image', 'case study', 'christileeson' ),
					'remove_featured_image'    => _x( 'Remove featured image', 'case study', 'christileeson' ),
					'use_featured_image'       => _x( 'Use as featured image', 'case study', 'christileeson' ),
					'filter_items_list'        => __( 'Filter case studies list', 'christileeson' ),
					'filter_by_date'           => __( 'Filter by date', 'christileeson' ),
					'items_list_navigation'    => __( 'Case Studies list navigation', 'christileeson' ),
					'items_list'               => __( 'Case Studies list', 'christileeson' ),
					'item_published'           => __( 'Case Study published.', 'christileeson' ),
					'item_published_privately' => __( 'Case Study published privately.', 'christileeson' ),
					'item_reverted_to_draft'   => __( 'Case Study reverted to draft.', 'christileeson' ),
					'item_scheduled'           => __( 'Case Study scheduled.', 'christileeson' ),
					'item_updated'             => __( 'Case Study updated.', 'christileeson' ),
					'item_link'                => _x( 'Case Study Link', 'navigation link block title', 'christileeson' ),
					'item_link_description'    => _x( 'A link to a case study.', 'navigation link block description', 'christileeson' ),
				],
				'supports'     => [
					'title',
					'editor',
					'excerpt',
					'revisions',
					'post-thumbnails',
				],
			]
		);
	}
);
