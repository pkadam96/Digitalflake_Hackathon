import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '../assets/HomeIcon.png'
import CategoryIcon from '../assets/CategoryIcon.png';
import ProductIcon from '../assets/ProductIcon.png';
import { AllRoutes } from './AllRoutes';

const Sidebar: React.FC = () => {
    
    const menuItems = [
        { text: 'Home', icon: HomeIcon, link: '/' },
        { text: 'Category', icon: CategoryIcon, link: '/category' },
        { text: 'Products', icon: ProductIcon, link: '/products' }
    ];

    const defaultStyle = { color: 'black' };
    const activeStyle = { backgroundColor: '#fff8b7', color:'#662671' };
    return (
        <div className="flex">
            <aside style={{ width: "300px", backgroundColor: "f4f4f4", boxShadow: "2px 0 4px rgba(0, 0, 0, 0.4)", position: "fixed", top: "80px", bottom: "0", left: "0" }}> 
                <ul style={{ width: "300px" }}>
                    {menuItems.map((item, index) => (
                        <li key={index} className="mb-4 mt-4 text-xl font-medium">
                            <NavLink
                                to={item.link}
                                className="flex items-center justify-between p-4 nav-link"
                                style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
                            >
                                <div className="flex items-center">
                                    <img src={item.icon} alt={item.text} className="w-6 mr-3" />
                                    <span>{item.text}</span>
                                </div>
                                <i className="fas fa-caret-right"></i> 
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </aside>
            <div style={{ marginLeft: "300px", marginTop:"80px "}} className='w-full'>              
                <AllRoutes/>
            </div>
        </div>
    );
}

export { Sidebar };
