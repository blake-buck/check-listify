function navigateTo(route){
    window.history.pushState(null, '', route);
    window.dispatchEvent(new CustomEvent('customnav', {detail:{route}}))
}

const routes = {
    '/': 'Home',
    '/demo': 'Demo',
    '/user': 'UserChecklists',
    '/user/account' : 'Account',
    '/login': 'Login',
    '/register':'Register',
    '/forgot-password':'ForgotPassword'
}

function router(pathname){
    let matchingRoute = routes[pathname];
    const isChecklistRoute = /\/user\/checklist\/[-|\d+]/.exec(pathname);
      
    if(isChecklistRoute && isChecklistRoute.length > 0){
      matchingRoute = 'Checklist';
    }
    
    return matchingRoute ? require(`../components/${matchingRoute}/${matchingRoute}.vue`) : require('../components/NotFound/NotFound.vue')
}

function initializeRouteListeners(vm){
    window.addEventListener('customnav', (e) => {
        vm.dataPathname = e.detail.route;
      })
      window.addEventListener('popstate', (e) => {
        e.preventDefault();
        vm.dataPathname = `${e.target.location.pathname}`;
      })
}

module.exports = {
    navigateTo,
    router,
    initializeRouteListeners
}