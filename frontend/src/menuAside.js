import {
    LayoutDashboard,
    Users,
    Calendar,
    FileText,
    Settings,
    CheckCircle,
} from 'lucide-vue-next'

export const menuAside = [
    // admin
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        to: '/admin',
        roles: ['admin']
    },
    {
        label: 'PSB Online',
        icon: Users,
        to: '/rekap-psb',
        roles: ['admin']
    },
    {
        label: 'Rekap Absensi',
        icon: Calendar,
        to: '/rekap-absensi',
        roles: ['admin']
    },
    {
        label: 'Rekap Jurnal',
        icon: FileText,
        to: '/rekap-jurnal',
        roles: ['admin']
    },
    {
        label: 'Pengaturan',
        icon: Settings,
        to: '/settings',
        roles: ['admin']
    },

    // guru
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        to: '/guru',
        roles: ['guru']
    },
    {
        label: 'Jurnal Absensi',
        icon: CheckCircle,
        to: '/jurnal-absensi',
        roles: ['guru']
    },


]