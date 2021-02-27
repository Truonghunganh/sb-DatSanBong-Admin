import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['Dashboard'],
    },
    {
        text: 'MANAGER',
        items: ['Admin',"DanhThuListQuan"],
    },
    
];

export const sideNavItems: SideNavItems = {
    Dashboard: {
        icon: 'arrows-alt',
        text: 'Dashboard',
        link: '/dashboard/quans',
    },
    Admin: {
        icon: 'user',
        text: 'Admin',
        link: '/dashboard/admin',
    },
    DanhThuListQuan: {
        text: 'DanhThuListQuan',
        link: '/dashboard/danhthulistquan',
    },

};
