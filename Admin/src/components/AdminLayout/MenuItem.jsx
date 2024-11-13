import React, { memo } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { navigation } from './constants';

const MenuList = memo(() => (
  <div className="flex items-center">
    <img
      alt="Your Company"
      src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
      className="h-8 w-8"
    />
    <div className="hidden md:block ml-10 space-x-4">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href} 
          aria-current={item.current ? 'page' : undefined}
          className={`rounded-md px-3 py-2 text-sm font-medium ${
            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  </div>
));

export default MenuList;
