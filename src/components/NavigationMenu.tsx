import React, {useRef, useState, useCallback} from "react";
import "./NavigationMenu.css";
// use react icon
import { FaChevronDown, FaBars } from 'react-icons/fa';

export interface NavItem{
    label: string;
    href?: string;
    subItems?: NavItem[];
    icon?: React.ReactNode;
}

export const NavigationMenu: React.FC<{navItems: NavItem[]}> = ({navItems=[]}) => {
    const navRef = useRef<HTMLUListElement>(null);
    // State to manage the currently selected nav item for mobile
    const [currentItem, setCurrentItem] = useState<NavItem | null>(null);

    const handleNavItemClick = useCallback((item: NavItem) => {
        // console.log(item);
        // here item is menu include like:
        // label: 'Home',
        // href: '/',
        // icon: <FaHome />,
        setCurrentItem(item);
    }, []);
    const renderNavItem =(item: NavItem) =>{
        return(
        <li
            key={item.label}
            className={`nav-item ${item.label === currentItem?.label ? 'active' : ''}`}
            onClick={() => handleNavItemClick(item)}
        >
            <div className="nav-link">
                {item.icon}
                <span>{item.label}</span>
                {item.subItems && <FaChevronDown className="dropdown-icon" />}
            </div>
            {item.subItems && renderSubMenu(item.subItems)}
        </li>
        )
    };
    const renderSubMenu =(subItems: NavItem[])=>{
        return(
        <ul className="sub-menu">
            {subItems.map((subItems)=> renderNavItem(subItems))};
        </ul>)
        
    };
    return(
        <div >
            <nav className="navigation">
                <ul className="nav-menu" ref={navRef}>
                    {navItems.map((item) => renderNavItem(item))}
                </ul>
            </nav>
        </div>
    );

};