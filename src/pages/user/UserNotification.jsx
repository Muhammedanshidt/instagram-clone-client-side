import React, { useState } from 'react';

const MenuPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleMenu}
        type="button"
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        Open Menu
      </button>

      {isOpen && (
        <div
          className="absolute  left-0 mb-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
          style={{ minWidth: '10rem' }}
        >
          <div className=" absolute bottom-3 py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              Item 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-1"
            >
              Item 2
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPopup;
