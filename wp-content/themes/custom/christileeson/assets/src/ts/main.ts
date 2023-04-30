import { MobileNavigationConfiguration } from '@/ts/main/mobile-navigation'
import { moduleReload } from '@/ts/utilities/module-reload';

moduleReload<MobileNavigationConfiguration>({
    fileContext: () => require.context("./main", true, /mobile-navigation\.ts$/),
    configuration: {
        openTrigger: document.querySelector('.mobile__menu-open'),
        menu: document.getElementById('mobile-menu'),
        closeSelector: '.mobile__menu-close',
        menuOpenClassPostfix: 'open'
    }
});
