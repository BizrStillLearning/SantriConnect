import {
    LayoutDashboard,
    Users,
    Calendar,
    FileText,
    Settings,
    CheckCircle, UsersIcon, SquareUserRound,
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
        label: 'Data Santri',
        icon: UsersIcon,
        to: '/data-santri',
        roles: ['admin']
    },
    // {
    //     label: 'Data Guru',
    //     icon: SquareUserRound,
    //     to: '/data-guru',
    //     roles: ['admin']
    // },
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