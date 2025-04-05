<?php
/**
 * Plugin Name: Accordion Items Block
 * Description: A custom Gutenberg block to add multiple toggleable items with header, image, and description.
 * Version: 1.0.0
 * Author: Shiraj AHmed
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

function custom_items_block_register() {
    // Register the editor script.
    wp_register_script(
        'custom-items-block-editor-script',
        plugins_url( 'block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-editor', 'wp-element', 'wp-components' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'block.js' ),
        true
    );

    // Register the editor styles.
    wp_register_style(
        'custom-items-block-editor-style',
        plugins_url( 'editor.css', __FILE__ ),
        array( 'wp-edit-blocks' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
    );

    // Register the front-end styles.
    wp_register_style(
        'custom-items-block-style',
        plugins_url( 'style.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
    );

    // Register the block.
    register_block_type( 'custom/items-block', array(
        'editor_script' => 'custom-items-block-editor-script',
        'editor_style'  => 'custom-items-block-editor-style',
        'style'         => 'custom-items-block-style',
    ) );
}
add_action( 'init', 'custom_items_block_register' );

function custom_items_block_enqueue_frontend_script() {
    // Enqueue front-end JS for toggle functionality.
    wp_enqueue_script(
        'custom-items-block-frontend-script',
        plugins_url( 'toggle.js', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'toggle.js' ),
        true
    );
}
add_action( 'wp_enqueue_scripts', 'custom_items_block_enqueue_frontend_script' );
