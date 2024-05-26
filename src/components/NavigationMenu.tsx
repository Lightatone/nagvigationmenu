import React, {useRef, useState, useCallback, useEffect} from "react";
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
    // State to manage the currently selected nav item 
    const [currentItem, setCurrentItem] = useState<NavItem | null>(null);

    const handleNavItemClick = useCallback((item: NavItem) => {
        // console.log(item);
        setCurrentItem(item);
    }, []);
    
    // State to manage the visibility of the mobile menu
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    // State to manage the currently active nav item for desktop
    const [activeItem, setActiveItem] = useState<NavItem | null>(null);

    const navRef = useRef<HTMLUListElement>(null);
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(event.target as Node)) {
            setActiveItem(null);
        }
    }, []);
    // EventListener handle
    useEffect(() => {
        if (openMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openMenu, handleClickOutside]);
    // mouse Enter Event handle
    const handleMouseEnter = useCallback((item: NavItem) => {
        setActiveItem(item);
    }, []);
    // mouse leave Event handle
    const handleMouseLeave = useCallback(() => {
        setActiveItem(null);
    }, []);
    const renderNavItem =(item: NavItem) =>(
        
        <li
            key={item.label}
            className={`nav-item ${item.label === currentItem?.label ? 'active' : ''}`}
            onClick={() => handleNavItemClick(item)}
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
        >
            <div className="nav-link">
                {item.icon}
                <span>{item.label}</span>
                {item.subItems && <FaChevronDown className="dropdown-icon" />}
            </div>
            {item.subItems && renderSubMenu(item.subItems)}
        </li>
    );

    const renderSubMenu =(subItems: NavItem[])=>(
        <ul className="sub-menu">
            {subItems.map((subItem) => renderNavItem(subItem))}
        </ul>
    );
    return(
        <div >
            <nav className="navigation">
                <h1 className="Logo">LOGO</h1>
                <ul className="nav-menu" ref={navRef}>
                    {navItems.map((item) => renderNavItem(item))}
                </ul>
            </nav>
        </div>
    );

};