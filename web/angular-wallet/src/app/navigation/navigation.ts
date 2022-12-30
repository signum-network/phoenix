import {FuseNavigation} from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: 'dashboard',
    url: '/dashboard'
  },
  {
    id: 'transactions',
    title: 'Transactions',
    type: 'group',
    children: [
      {
        id: 'transactions',
        title: 'Transactions',
        type: 'item',
        icon: 'compare_arrows',
        url: '/transactions'
      },
      {
        id: 'messages',
        title: 'Messages',
        type: 'item',
        icon: 'messages',
        url: '/messages',
        fullAccountOnly: true
      },
      {
        id: 'send_signa',
        title: 'Send Burst',
        type: 'item',
        icon: 'vertical_align_top',
        url: '/send',
        fullAccountOnly: true
      },
      {
        id: 'request_burst',
        title: 'Request Burst',
        type: 'item',
        icon: 'vertical_align_bottom',
        url: '/request'
      },
    ]
  },
  {
    id: 'account',
    title: 'Assets',
    type: 'group',
    children: [
      {
        id: 'account_profile',
        title: 'Profile',
        type: 'item',
        icon: 'account_circle',
        url: '/set-account-profile'
      },
      {
        id: 'aliases',
        title: 'Aliases',
        type: 'item',
        icon: 'dns',
        url: '/aliases',
      },
      {
        id: 'assets', // this is used for i18n - keep it
        title: 'Tokens',
        type: 'item',
        icon: 'monetization_on',
        url: '/tokens',
      },
    ]

  },
  {
    id: 'mining',
    title: 'Mining',
    type: 'collapsable',
    fullAccountOnly: true,
    children: [
      {
        id: 'commitment',
        title: 'Commitment',
        type: 'item',
        icon: 'all_inbox',
        url: '/commitment'
      },
      {
        id: 'reward_recipient_assignment',
        title: 'Reward Assignment',
        type: 'item',
        icon: 'directions',
        url: '/set-reward-recipient'
      },
    ]
  },
  {
    id: 'network',
    title: 'Network',
    type: 'collapsable',
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
