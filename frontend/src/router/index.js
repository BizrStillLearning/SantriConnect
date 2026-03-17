import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "../views/LoginView.vue";
import LandingView from "../views/landing/index.vue";
import FormView from "../views/landing/Form.vue";
import AdminDashboard from "../views/dashboard/admin/index.vue";
import GuruDashboard from "../views/dashboard/guru/index.vue";
import RekapJurnal from "../views/dashboard/admin/RekapJurnal.vue";
import RekapAbsensi from "../views/dashboard/admin/RekapAbsensi.vue";
import RekapPsb from "../views/dashboard/admin/RekapPsb.vue";
import JurnalAbsensi from "../views/dashboard/guru/JurnalAbsensi.vue";
import SuccesPage from "../views/landing/Succes.vue";
import DataSantri from "../views/dashboard/admin/DataSantri.vue";

import {useAuthStore} from "../stores/AuthStore.js";

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { public: true }
    },
    {
        path: '/landing',
        name: 'landing',
        component: LandingView,
        meta: { public: true }
    },
    {
        path: '/form',
        name: 'form',
        component: FormView,
        meta: { public: true }
    },
    {
        path: '/success-page',
        name: 'succes',
        component: SuccesPage,
        meta: { public: true }
    },
    {
        path: '/admin',
        name: 'dashboard',
        component: AdminDashboard,
        meta: { requiresAuth: true, role: 'admin' }
    },
    {
        path: '/rekap-jurnal',
        name: 'jurnal',
        component: RekapJurnal,
        meta: { public: true }
    },
    {
        path: '/rekap-absensi',
        name: 'absensi',
        component: RekapAbsensi,
        meta: { public: true }
    },
    {
        path: '/rekap-psb',
        name: 'psb',
        component: RekapPsb,
        meta: { public: true }
    },
    {
        path: '/data-santri',
        name: 'data-santri',
        component: DataSantri,
        meta: { public: true }
    },

    {
        path: '/guru',
        name: 'guru-dashboard',
        component: GuruDashboard,
        meta: { requiresAuth: true, role: 'guru' }
    },
    {
        path: '/jurnal-absensi',
        name: 'jurnal-absensi',
        component: JurnalAbsensi,
        meta: { requiresAuth: true, role: 'guru' }
    },
]



const router = createRouter({
    history: createWebHistory(),
    routes,

    scrollBehavior(to) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth'
            }
        }
        return { top: 0 }
    }
});

router.beforeEach((to, from, next) => {
    const auth = useAuthStore();

    if (to.meta.requiresAuth) {
        if (!auth.isAuthenticated) {
            return next('/login');
        }

        const userRole = auth.user?.role;
        const requiredRole = to.meta.role;

        if (requiredRole && userRole !== requiredRole && userRole !== 'admin') {
            return next(`/${userRole || 'login'}`);
        }
    }

    if (to.path === '/login' && auth.isAuthenticated) {
        const safeRole = auth.user?.role || 'santri';
        return next(`/${safeRole}`);
    }

    next();


});



export default router
