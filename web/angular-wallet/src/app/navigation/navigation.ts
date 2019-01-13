import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'dashboard',
        title    : 'Dashboard',
        translate: 'NAV.DASHBOARD.TITLE',
        type     : 'item',
        icon     : 'dashboard',
        url      : '/dashboard',
        badge    : {
            title    : '25',
            translate: 'NAV.DASHBOARD.BADGE',
            bg       : '#F44336',
            fg       : '#FFFFFF'
        }
    },
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'sample',
                title    : 'Sample',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/sample',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            }
        ]
    }
];
