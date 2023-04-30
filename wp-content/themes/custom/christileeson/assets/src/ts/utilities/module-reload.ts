/**
 * Expected exports from a Node Module to register a reloadable module
 */
export interface ReloadedModule<T> {
	/**
	 * Module setup process
	 */
	setup(configuration: T): void;
	/**
	 * Module removal process
	 */
    remove(): void;
}

export interface ModuleReloadConfiguration<T> {
    /** 
     * Configuration passed to all matching modules 
     */
    configuration: T;

    /**
	 * The file context for a given module
     *  - This is one file, or a group with the same configuration
     *  - The context files should return a ReloadModule<T> as default
	 */
	// eslint-disable-next-line no-undef
	fileContext: { (): __WebpackModuleApi.RequireContext };
}

/**
 * Reads and loads any new or changed which implement the ReloadedModule type
 */
export const moduleReload = <T>({
    configuration,
	fileContext
}: ModuleReloadConfiguration<T>) => {
	const cache: { [index: string]: ReloadedModule<T> } = {};
	const moduleLoader = () => {
		const context = fileContext();

        context.keys().forEach((key: string) => {
			const updatedModule: ReloadedModule<T> = context(key).default;
			const oldModule: ReloadedModule<T> = cache[key];

            // Skips reloading unchanged modules
			if (updatedModule === oldModule) {
				return;
			}

			// Unregister changed modules
            oldModule?.remove();

			// Register and cache the updated module
            updatedModule.setup(configuration);
			cache[key] = updatedModule;
		});

		return context;
	};

	const context: __WebpackModuleApi.RequireContext = moduleLoader();

    // Process the cached module loader for the current content by ID
	if (module.hot) {
		module.hot.accept(context.id, moduleLoader);
	}
};
