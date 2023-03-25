<?php

/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package christileeson
 */
?>
</div>
<footer class="footer">
	<p class="footer__attribution">
		<span class="footer__attribution-name">
			<?php
			echo esc_html(
				sprintf(
					/* translators: %s is the current year */
					__( '&copy;%s Christi Leeson', 'christileeson' ),
					gmdate( 'Y' )
				)
			);
			?>
		</span>&nbsp;|&nbsp;
		<span class="footer__attribution-legal">
			<?php
			echo esc_html__( 'All rights reserved', 'christileeson' );
			?>
		</span>
	</p>
</footer>
<?php wp_footer(); ?>
</body>
</html>
