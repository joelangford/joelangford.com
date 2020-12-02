import {elementInView, checkElements} from './modules/elementInView.js';
import routing from './modules/routing/routing.js';

elementInView();
routing(
    () => {
        // Callbacks
        checkElements()
    }, {
        // Options
        siteHeaderSelector: '.js-site-header'
    }
);
