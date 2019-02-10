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
        id       : 'transactions',
        title    : 'Transactions',
        type     : 'group',
        children : [
            {
                id       : 'transactions',
                title    : 'Transactions',
                type     : 'item',
                icon     : 'compare_arrows',
                url      : '/transactions',
                badge    : {
                    title    : '5',
                    translate: '5',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
            {
                id       : 'escrow',
                title    : 'Escrow',
                type     : 'item',
                icon     : 'check_circle',
                url      : 'transactions/escrow'
            },
            {
                id       : 'subscriptions',
                title    : 'Subscriptions',
                type     : 'item',
                icon     : 'subscriptions',
                url      : 'transactions/subscriptions'
            },
            {
                id       : 'smart_contracts',
                title    : 'Smart Contracts',
                type     : 'item',
                icon     : 'computer',
                url      : 'transactions/smart-contracts'
            }
        ]
    },
    {
        id       : 'dex',
        title    : 'Decentralized Exchange',
        type     : 'group',
        children : [
            {
                id       : 'asset_exchange',
                title    : 'Decentralized Exchange',
                type     : 'item',
                icon     : 'account_balance',
                url      : '/dex',
                badge    : {
                    title    : '25',
                    translate: '25',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
            {
                id       : 'transfer_history',
                title    : 'Transfer History',
                type     : 'item',
                icon     : 'history',
                url      : '/dex/transfer-history'
            },
            {
                id       : 'my_assets',
                title    : 'My Assets',
                type     : 'item',
                icon     : 'pie_chart',
                url      : '/dex/my-assets'
            },
            {
                id       : 'open_orders',
                title    : 'Open Orders',
                type     : 'item',
                icon     : 'list_alt',
                url      : '/dex/open-orders'
            },
            {
                id       : 'issue_asset',
                title    : 'Issue Asset',
                type     : 'item',
                icon     : 'add_box',
                url      : '/dex/issue-asset'
            },
            {
                id       : 'payout_dividends',
                title    : 'Payout Dividends',
                type     : 'item',
                icon     : 'money',
                url      : '/dex/payout-dividends'
            }
        ]
    },
    {
        id: 'contacts',
        title: 'Contacts',
        type: 'item',
        icon: 'contacts'
    },
    {
        id: 'messages',
        title: 'Messages',
        type: 'item',
        icon: 'messages'
    },
    {
        id: 'aliases',
        title: 'Aliases',
        type: 'item',
        icon: 'group'
    },
    {
        id: 'blocks',
        title: 'Blocks',
        type: 'item',
        icon: 'apps'
    },
    {
        id: 'peers',
        title: 'Peers',
        type: 'item',
        icon: 'device_hub'
    }
];
