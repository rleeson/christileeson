<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package christileeson
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="preconnect" href="https://www.googletagmanager.com">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<a class="skip-link button__inverted screen-reader-text" href="#content">
	<?php 
		esc_html_e( 'Skip to content', 'christileeson' ); 
	?>
		</a>
	<header class="header">
		<div class="header__logo">
			<a class="header__logo-link" href="<?php echo esc_url( home_url() ); ?>" rel="home">
				<span class="screen-reader-text"><?php bloginfo( 'name' ); ?> <?php 
					echo esc_html__( 'Home Page', 'christileeson' ); 
				?>
					</span></a>
		</div>
		<div class="header__controls">
			<button class="search__open" aria-expanded="false" aria-controls="header__search">
				<span class="screen-reader-text"><?php echo esc_html__( 'Open Search', 'christileeson' ); ?></span></button>
			<section
				class="header__search"
				aria-label="<?php echo esc_attr__( 'Search', 'christileeson' ); ?>"
				aria-hidden="true"
			>
			<?php
				get_search_form(
					[
						'container_classes' => [ 'search__form' ],
						'input_label_id'    => 'utility-menu-search',
						'max_length'        => '200',
						'placeholder_text'  => __( 'Search', 'christileeson' ),
						'label_text'        => __( 'Search in ', 'christileeson' ) . home_url( '/' ),
						'label_is_sr'       => true,
					] 
				);
				?>
				<button class="search__close">
					<span class="screen-reader-text"><?php echo esc_html__( 'Close Search', 'christileeson' ); ?></span></button>
			</section>
			<nav
				class="header__main-navigation"
				aria-label="<?php echo esc_attr__( 'Main navigation', 'christileeson' ); ?>"
			>
				<?php
				wp_nav_menu(
					[
						'theme_location' => 'primary',
						'menu_id'        => 'main-navigation',
						'container'      => false,
						'echo'           => true,
						'depth'          => 1,
						'link_after'     => '</span>',
						'link_before'    => '<span class="text">',
					]
				);
				?>
			</nav>
			<div id="mobile__navigation">
				<button class="mobile__menu-open" aria-controls="mobile-menu" aria-expanded="false">
					<span class="screen-reader-text"><?php echo esc_html__( 'Open Menu', 'christileeson' ); ?></span></button>
				<div id="mobile-menu" class="mobile__menu" aria-hidden="true">
					<button class="mobile__menu-close" tabindex="-1"><span
							tabindex="-1"
							class="screen-reader-text"
						><?php echo esc_html__( 'Close Menu', 'christileeson' ); ?></span></button>					
					<nav
						class="mobile__main-navigation"
						aria-label="<?php echo esc_attr__( 'Mobile main navigation', 'christileeson' ); ?>"
					>
					<?php
						wp_nav_menu(
							[
								'theme_location' => 'primary',
								'menu_id'        => 'mobile-navigation',
								'container'      => false,
								'echo'           => true,
								'depth'          => 1,
							]
						);
						?>
					</nav>
				</div>
			</div>
		</div>
	</header>
	<div id="content">
