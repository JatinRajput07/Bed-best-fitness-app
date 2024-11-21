


export const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

export const navigation = [
  {
    name: 'Dashboard', href: '/', current: true
  },
  {
    name: 'Videos',
    href: '/video',
    current: false,
    submenu: [
      { name: 'Upload Video', href: '/video/upload-video-files' },
    ]
  },
  {
    name: 'Users', href: '/users', current: false
  },
  {
    name: 'CMS',
    href: '#',
    current: false,
    submenu: [
      { name: 'Privacy Policy', href: '/cms/privacy-policy' },
      { name: 'Terms & Conditions', href: '/cms/terms-conditions' },
      { name: 'Contact Us', href: '/cms/contact-us' }
    ]
  },
  {
    name: 'Settings', href: '/settings', current: false
  }
];

export const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '/settings' },
  { name: 'Sign out', href: '#' },
];

