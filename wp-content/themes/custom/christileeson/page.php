<?php
/**
 * The main template file
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package christileeson
 */

get_header();
?>
	<main id="main" class="site-main">
	<?php
		if ( have_posts() ) :
			the_post();
			the_content();
		else :
			get_template_part( 'template-parts/content', 'none' );
		endif;
	?>
	</main>
<?php
get_footer();
