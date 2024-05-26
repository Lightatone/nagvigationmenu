import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {FaHome, FaInfoCircle, FaBookOpen, FaFolderOpen, FaUserGraduate} from "react-icons/fa";
import { NavigationMenu, NavItem } from './components/NavigationMenu';
function App() {
  // create menu data here
  const navItems: NavItem[] = [
    {
      label: 'Home',
      href: '/',
      icon: <FaHome />,
    },
    {
        label: 'Courses',
        icon: <FaBookOpen />,
        subItems: [
            {
                label: 'Online Courses',
                href: '/courses/online',
            },
            {
                label: 'Offline Courses',
                href: '/courses/offline',
            },
            {
                label: 'Custom Courses',
                href: '/courses/custom',
            },
        ],
    },
    {
      label: 'Resources',
      icon: <FaFolderOpen />,
      subItems: [
          {
              label: 'Video Resources',
              href: '/resources/videos',
          },
          {
              label: 'Document Resources',
              href: '/resources/documents',
          },
          {
              label: 'Interactive Resources',
              href: '/resources/interactive',
          },
      ],
    },
    {
        label: 'My Profile',
        href: '/user',
        icon: <FaUserGraduate />,
    },
    {
        label: 'About',
        href: '/about',
        icon: <FaInfoCircle />,
  },

  ];
  return (
    <div className="App">
      <header className="navigation-wrapper">
        <NavigationMenu navItems={navItems} />
      </header>
    </div>
  );
}

export default App;
