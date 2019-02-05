import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'dashboard',
        title    : 'Dashboard',
        type     : 'item',
        icon     : 'dashboard',
        url      : '/dashboard',
        badge    : {
            title    : '25',
            translate: '25',
            bg       : '#F44336',
            fg       : '#FFFFFF'
        }
    },
    {
        id       : 'applications',
        title    : 'Applications',
        type     : 'group',
        children : [
            {
                id       : 'sample',
                title    : 'Sample',
                type     : 'item',
                icon     : 'email',
                url      : '/sample',
                badge    : {
                    title    : '25',
                    translate: '25',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            }
        ]
    }
];
