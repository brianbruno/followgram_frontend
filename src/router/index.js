import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const isLoggedIn = (to, from, next) => {
    if (!localStorage.getItem('access_token')) {
        next('/');
    } else {
        next();
    }
};

const isLoggedInBlock = (to, from, next) => {
    if (localStorage.getItem('access_token')) {
        next('/home');
    } else {
        next();
    }
};

export default new Router({
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    routes: [

        // Dashboard

        {
            path: '/home',
            name: 'analytics',
            beforeEnter: isLoggedIn,
            component: () => import('../DemoPages/Dashboards/Analytics.vue'),
        },


        // Auth

        {
            path: '/',
            name: 'login-boxed',
            meta: {layout: 'userpages'},
            beforeEnter: isLoggedInBlock,
            component: () => import('../DemoPages/UserPages/LoginBoxed.vue'),
        },
        {
            path: '/',
            name: 'login-boxed',
            meta: {layout: 'userpages'},
            beforeEnter: isLoggedInBlock,
            component: () => import('../DemoPages/UserPages/LoginBoxed.vue'),
        },
        {
            path: '/pages/register-boxed',
            name: 'register-boxed',
            meta: {layout: 'userpages'},
            beforeEnter: isLoggedInBlock,
            component: () => import('../DemoPages/UserPages/RegisterBoxed.vue'),
        },
        {
            path: '/r/:id?',
            name: 'register-boxed',
            meta: {layout: 'userpages'},
            beforeEnter: isLoggedInBlock,
            component: () => import('../Pages/Auth/Register.vue'),
        },
        {
            path: '/esquecisenha',
            name: 'forgot-password-boxed',
            meta: {layout: 'userpages'},
            beforeEnter: isLoggedInBlock,
            component: () => import('../Pages/Auth/ForgotPassword.vue'),
        },
        {
            path: '/recuperarsenha/:token',
            name: 'reset-password-boxed',
            meta: {layout: 'userpages'},
            beforeEnter: isLoggedInBlock,
            component: () => import('../Pages/Auth/ResetPassword.vue'),
        },
        {
            path: '/inicio',
            name: 'Inicio',
            meta: {layout: 'userpages'},
            component: () => import('../DemoPages/UserPages/Inicio.vue'),
        },

        // Pages
        {
            path: '/adicionarconta',
            name: 'adicionar-conta',
            beforeEnter: isLoggedIn,
            component: () => import('../Pages/Account/AddAccount.vue'),
        },
        {
            path: '/promoverconta',
            name: 'promover-conta',
            beforeEnter: isLoggedIn,
            component: () => import('../Pages/Account/PromoteAccount.vue'),
        },
        {
            path: '/ganharpontos',
            name: 'ganhar-pontos',
            beforeEnter: isLoggedIn,
            component: () => import('../Pages/Manage/GetPoints.vue'),
        },
        {
            path: '/queroajuda',
            name: 'quero-ajuda',
            beforeEnter: isLoggedIn,
            component: () => import('../Pages/Help/Help.vue'),
        },
        {
            path: '/referidos',
            name: 'referidos',
            beforeEnter: isLoggedIn,
            component: () => import('../Pages/Account/Referred.vue'),
        },
        {
            path: '/extrato',
            name: 'extrato',
            beforeEnter: isLoggedIn,
            component: () => import('../Pages/Account/Extract.vue'),
        },

        // Elements

        {
            path: '/elements/buttons-standard',
            name: 'buttons-standard',
            component: () => import('../DemoPages/Elements/Buttons/Standard.vue'),
        },
        {
            path: '/elements/dropdowns',
            name: 'dropdowns',
            component: () => import('../DemoPages/Elements/Dropdowns.vue'),
        },
        {
            path: '/elements/icons',
            name: 'icons',
            component: () => import('../DemoPages/Elements/Icons.vue'),
        },
        {
            path: '/elements/badges-labels',
            name: 'badges',
            component: () => import('../DemoPages/Elements/Badges.vue'),
        },
        {
            path: '/elements/cards',
            name: 'cards',
            component: () => import('../DemoPages/Elements/Cards.vue'),
        },
        {
            path: '/elements/list-group',
            name: 'list-group',
            component: () => import('../DemoPages/Elements/ListGroups.vue'),
        },
        {
            path: '/elements/timelines',
            name: 'timeline',
            component: () => import('../DemoPages/Elements/Timeline.vue'),
        },
        {
            path: '/elements/utilities',
            name: 'utilities',
            component: () => import('../DemoPages/Elements/Utilities.vue'),
        },

        // Components

        {
            path: '/components/tabs',
            name: 'tabs',
            component: () => import('../DemoPages/Components/Tabs.vue'),
        },
        {
            path: '/components/accordions',
            name: 'accordions',
            component: () => import('../DemoPages/Components/Accordions.vue'),
        },
        {
            path: '/components/modals',
            name: 'modals',
            component: () => import('../DemoPages/Components/Modals.vue'),
        },
        {
            path: '/components/progress-bar',
            name: 'progress-bar',
            component: () => import('../DemoPages/Components/ProgressBar.vue'),
        },
        {
            path: '/components/tooltips-popovers',
            name: 'tooltips-popovers',
            component: () => import('../DemoPages/Components/TooltipsPopovers.vue'),
        },
        {
            path: '/components/carousel',
            name: 'carousel',
            component: () => import('../DemoPages/Components/Carousel.vue'),
        },
        {
            path: '/components/pagination',
            name: 'pagination',
            component: () => import('../DemoPages/Components/Pagination.vue'),
        },
        {
            path: '/components/maps',
            name: 'maps',
            component: () => import('../DemoPages/Components/Maps.vue'),
        },

        // Tables

        {
            path: '/tables/regular-tables',
            name: 'regular-tables',
            component: () => import('../DemoPages/Tables/RegularTables.vue'),
        },

        // Dashboard Widgets

        {
            path: '/widgets/chart-boxes-3',
            name: 'chart-boxes-3',
            component: () => import('../DemoPages/Widgets/ChartBoxes3.vue'),
        },

        // Forms

        {
            path: '/forms/controls',
            name: 'controls',
            component: () => import('../DemoPages/Forms/Elements/Controls.vue'),
        },
        {
            path: '/forms/layouts',
            name: 'layouts',
            component: () => import('../DemoPages/Forms/Elements/Layouts.vue'),
        },
        // Charts

        {
            path: '/charts/chartjs',
            name: 'chartjs',
            component: () => import('../DemoPages/Charts/Chartjs.vue'),
        },
    ]
})
