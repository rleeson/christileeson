<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// Pass "https" protocol from reverse proxies
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') {
	$_SERVER['HTTPS'] = 'on';
}

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'default' );

/** MySQL database username */
define( 'DB_USER', 'user' );

/** MySQL database password */
define( 'DB_PASSWORD', 'user' );

/** MySQL hostname */
define( 'DB_HOST', 'db' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'fFmu5wt+zl+fa+0/smEZ2qzW43FoH52c/xiVW0HmJ5UuNAu4Q3J7pD+TCZk8f6oDCdN0lrSDToASU+i3Yw8/TQ==');
define('SECURE_AUTH_KEY',  '+meeRbIDqePthrQn3EdfbfA+a3W5fKr1TFBlOe5TOJrnhwM7HG7+axt4ZTo4Zjug3bp8dXXRJiguYeFIFujIGg==');
define('LOGGED_IN_KEY',    'd+wSd5dyNsSmJ3Kh/p5J1EwqyCBHgZCu8owSct4eWTZAW35y6kLAUCTBl6VO0zZ2wiOUtc5t5PsM7KY3XlkAZg==');
define('NONCE_KEY',        'HRWF/Cax5L5/9vyyGz7gx/SFU/j3/RD3FpgzspiDrAbZmpTNKlJWdmsYIE3nSUQfWqS5eQlufV1RKDLmbeeTHw==');
define('AUTH_SALT',        'YuIL1EaFM+A4qJYP7bMrAyGgYhy6SHGCsYKtz69L2GUGhOK1Dqd90aBd8D03oZh+qnDuJYW+qYfHKFOJuvV7Eg==');
define('SECURE_AUTH_SALT', 'mLPdAZI/uIXsfrvBw67otlYOiHrYwD45KVEN2d3fM+Nbr+T+LZuOYV3ceiY53I9FxfDZvs5wuDetd2/0UM3JDQ==');
define('LOGGED_IN_SALT',   'EGUCOHbNhJG+E6O2APsdVpiH7JPCMJe93kyXV19OcZLYeacvKHWGmYU+0mS833X6RHRuIFOgmqx/FrE1ZJ5OTg==');
define('NONCE_SALT',       'JUIR+Bi3Q6nr0P6AV578Dv/KRZ9EzCWi8SB0+8/Y2G3+7N20DglHvtSMi0xultborUpAKrbaC34JDIelXB18Eg==');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );
define( 'WP_DEBUG_DISPLAY', false );
define( 'WP_DEBUG_LOG', true );

/**
 * For Front-end Development Server to be served via @kanopi/pack
 */
define('KANOPI_DEVELOPMENT_ASSET_URL', 'https://' . getenv('WP_THEME_ASSETS_HOST_SUBDOMAIN') . '.' . getenv('VIRTUAL_HOST'));

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
