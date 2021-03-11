import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['Dashboard'],
    },
    {
        text: 'MANAGER',
        items: ['Admin',"DoanhThuListQuan","DoanhThuCuaAdminTheoNam"],
    },
    
];

export const sideNavItems: SideNavItems = {
    Dashboard: {
        icon: 'arrows-alt',
        text: 'Danh sách các quán',
        link: '/dashboard/quans',
    },
    Admin: {
        icon: 'user',
        text: 'Admin',
        link: '/dashboard/admin',
    },
    DoanhThuListQuan: {
        text: 'Doanh Thu các quán',
        link: '/dashboard/doanhthulistquan',
    },
    DoanhThuCuaAdminTheoNam:{
        text: 'Doanh Thu Cua Admin Theo Nam',
        link:'/dashboard/doanhthucuaadmintheonam'
    }
//doanhthucuaadmintheonam
};
