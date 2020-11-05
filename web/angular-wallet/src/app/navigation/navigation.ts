import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'dashboard',
        title    : 'Dashboard',
        type     : 'item',
        icon     : 'dashboard',
        url      : '/dashboard'
    },
    {
        id       : 'transactions',
        title    : 'Transactions',
        type     : 'group',
        children : [
            {
                id       : 'transactions',
                title    : 'Transactions',
                type     : 'item',
                icon     : 'compare_arrows',
                url      : '/transactions'
            },

            // add more here!
        ]
    },
    {
        id: 'account',
        title: 'Account',
        type: 'group',
        children: [
            {
                id: 'messages',
                title: 'Messages',
                type: 'item',
                icon: 'messages',
                url: 'messages'
            },
            {
                id: 'aliases',
                title: 'Aliases',
                type: 'item',
                icon: 'group',
                url: 'aliases'
            },
            {
                id: 'my_assets',
                title: 'Assets',
                type: 'item',
                icon: 'pie_chart',
                url: '/assets'
            },
        ]

    },
    {

        id: 'network',
        title: 'Network',
        type: 'group',
        children: [
            {
                id: 'blocks',
                title: 'Blocks',
                type: 'item',
                icon: 'apps',
                url: 'blocks'
            },
            {
                id: 'peers',
                title: 'Peers',
                type: 'item',
                icon: 'device_hub',
                url: 'peers'
            }
        ]
    }
];
