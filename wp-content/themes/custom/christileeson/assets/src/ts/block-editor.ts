/**
 * Gutenberg block registration use moduleLoader for modules exporting { name, setting }
 *
 * For Typescript, any is allowed because to support the underlying WordPress types, instead of globally allowing
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

import "@/ts/polyfills";
import { Block, BlockConfiguration, registerBlockType, unregisterBlockType } from '@wordpress/blocks';
import { dispatch, select } from '@wordpress/data';

/**
 * Expected exports from a Node Module to register a new Block
 */
type BlockModule = {
	/**
	 * Block name
	 */
	name: string;
	/**
	 * Set of block attributes
	 */
	settings: BlockConfiguration<Record<string, any>>;
}

type BlockInternalReference = {
	/**
	 * Block name
	 */
	name: string;
	/**
	 * Block GUID
	 */
	clientId: string
}

type BlockAutoLoaderConfiguration = {
	/**
	 * Set of files to check for Blocks
	 */
	// eslint-disable-next-line no-undef
	fileContext: { (): __WebpackModuleApi.RequireContext };
	/**
	 * Callback to register Blocks
	 */
	register: { (module: BlockModule): Block<Record<string, any>> | undefined };
	/**
	 * Callback to unregister Block by name
	 */
	unregister: (name: string) => void;
	/**
	 * Callback to run before updating blocks
	 */
	beforeLoad?: { (): string | null } | null;
	/**
	 * Callback to run after updating blocks
	 */
	afterLoad?: { (changedNames: string[], currentBlockId: string | null) } | null
}

/**
 * Reads and loads any new or changed  modules
 *  - Register/unregister follows the WordPress registration functions (name: string, settings: object)
 */
const autoLoad = ({
	fileContext,
	register,
	unregister,
	beforeLoad = null,
	afterLoad = null,
}: BlockAutoLoaderConfiguration) => {
	const cache: { [index: string]: BlockModule } = {};

	const moduleLoader = () => {
		const selectedBlockId: string | null = beforeLoad ? beforeLoad() : null;
		const context = fileContext();
		const changedModuleNames = new Array<string>();

		context.keys().forEach((key: string) => {
			const updatedModule: BlockModule = context(key);
			const oldModule: BlockModule = cache[key];

			// Skips reloading unchanged modules or those without name or settings
			if (updatedModule === oldModule) {
				return;
			}

			// Unregister changed blocks
			if (oldModule) {
				changedModuleNames.push(updatedModule.name);
				unregister(oldModule.name);
			}

			// Register and cache updated block
			register({ name: updatedModule.name, settings: updatedModule.settings });
			cache[key] = updatedModule;
		});

		if (afterLoad) {
			afterLoad(changedModuleNames, selectedBlockId);
		}

		return context;
	};

	const context: __WebpackModuleApi.RequireContext = moduleLoader();

	// Process the cached module loader for the current content by ID
	if (module.hot) {
		module.hot.accept(context.id, moduleLoader);
	}
};

const readAndClearSelectedBlock = (): string | null => {
	const currentBlockId = select("core/block-editor").getSelectedBlockClientId();
	dispatch("core/block-editor").clearSelectedBlock();
	return currentBlockId;
};

/**
 * Trigger refresh of all changed blocks based on a supplied list of changed name
 */
const refreshChangedBlocks = (changedNames: Array<string>, currentBlockId: string | null = null) => {
	if (Array.isArray(changedNames) && 0 < changedNames.length) {
		// Refresh all blocks by iteratively selecting each one.
		select("core/block-editor")
			.getBlocks()
			.forEach(({ name, clientId }: BlockInternalReference) => {
				if (-1 < changedNames.indexOf(name)) {
					dispatch("core/block-editor").selectBlock(clientId);
				}
			});

		// Reselect whatever was selected in the beginning, clears if null/missing
		if (currentBlockId) {
			dispatch("core/block-editor").selectBlock(currentBlockId);
		}
	}
};

const registerBlockStyles = () => {
	// Button styles
	window.wp.blocks.registerBlockStyle('core/button', {
		name: 'button-secondary',
		label: 'Secondary'
	});
	window.wp.blocks.registerBlockStyle('core/button', {
		name: 'button-secondary-reversed',
		label: 'Secondary (Reversed)',
	});
}

registerBlockStyles();

autoLoad({
	fileContext: () => require.context("./blocks", true, /\.[jt]sx$/),
	register: ({ name, settings }: BlockModule) => registerBlockType<Record<string, any>>(name, settings),
	unregister: (name: string) => unregisterBlockType(name),
	beforeLoad: readAndClearSelectedBlock,
	afterLoad: refreshChangedBlocks,
});
