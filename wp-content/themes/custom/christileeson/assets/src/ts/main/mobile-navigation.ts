import { ReloadedModule } from "../utilities/module-reload";

let configuration: MobileNavigationConfiguration = {
    openTrigger: null,
    menu: null,
    closeSelector: '',
    menuOpenClassPostfix: 'open'
};

const openClass = () => {
    return 'mobile-navigation__' + configuration.menuOpenClassPostfix ?? 'open';
}

const closeMenuHandler = () => {
    document.body.classList.remove(openClass())
    configuration.menu?.classList.remove(openClass()); 
    configuration.menu?.querySelectorAll(configuration.closeSelector).forEach((closeButton) => {
        closeButton.setAttribute('tabindex', '-1');
    });
}

const openMenuHandler = () => {
    if( configuration.menu && !configuration.menu.classList.contains(openClass()) ) {
        document.body.classList.add(openClass());
        configuration.menu.classList.add(openClass());

        configuration.menu.querySelectorAll(configuration.closeSelector).forEach((closeButton) => {
            closeButton.setAttribute('tabindex', '0');
        });
    }
}

const setup = (setupConfiguration: MobileNavigationConfiguration) => { 
    configuration = setupConfiguration;

    configuration.menu?.querySelectorAll(configuration.closeSelector).forEach((closeButton) => {
        closeButton.addEventListener('click', closeMenuHandler);
    });

    configuration.openTrigger?.addEventListener('click', openMenuHandler);
}

const remove = () => {
    configuration.menu?.querySelectorAll<HTMLElement>(configuration.closeSelector)
        .forEach((closeButton: HTMLElement) => {
            closeButton.removeEventListener('click', closeMenuHandler);
        });
    
    configuration.openTrigger?.removeEventListener('click', openMenuHandler);
}

export default <ReloadedModule<MobileNavigationConfiguration>>{ setup, remove };

export type MobileNavigationConfiguration = {
    openTrigger: HTMLElement|null,
    menu: HTMLElement|null,
    closeSelector: string,
    /**
     * Prefixed by `mobile-navigation__`
     */
    menuOpenClassPostfix: string
};
