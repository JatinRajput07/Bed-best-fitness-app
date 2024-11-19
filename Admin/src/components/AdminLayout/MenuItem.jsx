import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { navigation } from './constants';

const MenuList = memo(() => {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (name) => {
    setHovered(name);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <div className="flex items-center">
      <img
        alt="Your Company"
        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
        className="h-8 w-8"
      />
      <div className="hidden md:block ml-10 space-x-4">
        {navigation.map((item) => (
          <div
            key={item.name}
            className="relative inline-block"
            onMouseEnter={() => handleMouseEnter(item.name)}
            // onMouseLeave={handleMouseLeave}
          >
            <Link
              to={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
            {item.submenu && hovered === item.name && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 z-10">
                {item.submenu.map((subItem) => (
                  <Link
                    key={subItem.name}
                    to={subItem.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

export default MenuList;
