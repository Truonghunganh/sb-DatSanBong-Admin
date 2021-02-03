import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['Dashboard'],
    },
    {
        text: 'MANAGER',
        items: ['Customers'],
    },
    
];

export const sideNavItems: SideNavItems = {
    Dashboard: {
        icon: 'arrows-alt',
        text: 'Dashboard',
        link: '/dashboard/quan',
    },
    Customers: {
        icon: 'user',
        text: 'Customers',
        link: '/dashboard/user',
    },

};
