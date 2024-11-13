import React, { memo } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { user, userNavigation } from './constants';

const Profile = memo(() => (
  <div className="hidden md:block">
    <div className="ml-4 flex items-center">
      <button className="rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
        <BellIcon className="h-6 w-6" />
      </button>
      <Menu as="div" className="relative ml-3">
        <MenuButton className="flex items-center rounded-full text-sm focus:outline-none">
          <img src={user.imageUrl} alt="" className="h-8 w-8 rounded-full" />
        </MenuButton>
        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          {userNavigation.map((item) => (
            <MenuItem key={item.name}>
              <a href={item.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                {item.name}
              </a>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  </div>
));

export default Profile;
