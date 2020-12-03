const processOptions = (options) => {
    const defaults = {
        siteHeaderSelector: '.js-site-header',   
        navLinksSelector: '.js-nav-link',    
        contentAreasSelector: '.js-page-content',
        contentContainerSelector: '#content',
        pageContentSelector: '.js-page-content',
        loadingIndicatorElementSelector: 'body',
        navToggleBtnSelector: '.js-nav-toggle',
        firstLoadSelector: '.first-load', 
        activeClass: 'active',
        firstLoadClass: 'first-load',
        loadingClass: 'loading',
        navOpenClass: 'open',
        targetAttributeName: 'data-content-target',
        scrollToTop: true,
        visibleDisplayValue: 'block',
        loadingAnimationDelay: 500,
    }
    
    if (options) {
        let config = {};

        Object.keys(defaults).map(defaultKey => {
            if (defaultKey in options) {
                config[defaultKey] = options[defaultKey];
            } else {
                config[defaultKey] = defaults[defaultKey];
            }
        });

        return config;
    }

    return defaults;
}
  
export default processOptions;