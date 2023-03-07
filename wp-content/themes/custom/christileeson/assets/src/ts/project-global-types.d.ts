import React from "react";

/**
 * Typing for Global/Window Namespaces
 *  - Maps Google Analytics and WordPress globals
 */
declare global {
    interface Window {
        [index: string]: any;

        _gaq: any;
        wp: {
            blocks: any,
            domReady: Function,
            element: any
        };
    }

    namespace JSX {
        // Overload for React
        interface Element extends React.ReactElement<any, any> {
        }

        interface IntrinsicElements {
            [elem: string]: any;
        }
    }
}