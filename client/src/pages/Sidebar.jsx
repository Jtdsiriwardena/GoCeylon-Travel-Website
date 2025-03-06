import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHotel,
  faUtensils,
  faUserTie,
  faPersonHiking,
  faArrowsLeftRight
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const menuItems = [
    { icon: faHotel, label: 'Manage Hotels', path: '/admin_hotel' },
    { icon: faUtensils, label: 'Manage Restaurants', path: '/admin_restaurent' },
    { icon: faUserTie, label: 'Manage Guides', path: '/admin_guides' },
    { icon: faPersonHiking, label: 'Manage Activities', path: '/admin_activities' },
  ];

  return (
    <div
      className={`fixed h-screen bg-slate-900 text-slate-50 transition-all duration-300 flex flex-col ${collapsed ? "w-16" : "w-64"
        }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        {!collapsed && (
          <h1 className="text-xl font-semibold bg-white bg-clip-text text-transparent">
            GO<span className="font-extrabold">CEYLON.</span>
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowsLeftRight} className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200
                     hover:bg-slate-800 hover:text-blue-400 group active:scale-95"
            title={collapsed ? item.label : ""}
          >
            <FontAwesomeIcon icon={item.icon} className="h-5 w-5" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        {!collapsed && (
          <div className="text-xs text-slate-500 text-center">
            © 2025 GOCEYLON.
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;