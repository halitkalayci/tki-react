'use client';
import { AuthContext } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import './navbar.css';
import { Menubar } from 'primereact/menubar';
import axiosInstance from '@/app/utilities/axiosInterceptors';
import { NavbarTypes } from '@/app/constants/navbarTypes';
function Navbar() {
    const [dynamicMenu, setDynamicMenu] = useState([]);
    const authContext = useContext(AuthContext);
    const navigate = useRouter();
    useEffect(() => {
        fetchMenuItems();
    }, [authContext]);

    useEffect(() => {
        fetchMenuItems();
    }, []);
    // TODO: Backendden gelen veriyi primereactin anlayabileceği bir menü verisi haline çevirmek.
    const fetchMenuItems = () => {
        axiosInstance.get('GroupTreeContents/getall').then((response) => {
            let items = response.data
                .sort((a, b) => a.rowOrder - b.rowOrder)
                .filter((i) => i.parentId == null || i.parentId == 0)
                .map((item) => mapMenuItem(response.data, item));
            setDynamicMenu(items);
        });
    };

    const mapMenuItem = (allMenu, menuItem) => {
        let newMenuItem = {
            id: menuItem.id,
            parentId: menuItem.parentId,
            label: menuItem.title,
            command: () => {
                if (menuItem.type == NavbarTypes.URL) navigate.push(menuItem.target);
                if (menuItem.type == NavbarTypes.LOGOUT) logout();
                // tüm türleri map.
            },
            icon: menuItem.icon,
            visible: getVisibleStatus(menuItem),
            items: allMenu
                .sort((a, b) => a.rowOrder - b.rowOrder)
                .filter((i) => i.parentId == menuItem.id)
                .map((subItem) => mapMenuItem(allMenu, subItem))
        };
        if (newMenuItem.items?.length <= 0) {
            newMenuItem = { ...newMenuItem, items: undefined };
        }
        return newMenuItem;
    };

    const getVisibleStatus = (menuItem) => {
        let isAuthenticated = authContext.isAuthenticated;
        if (menuItem.hideOnAuth && isAuthenticated) return false;
        if (!menuItem.roles || menuItem.roles.length <= 0) return !menuItem.showOnAuth || isAuthenticated;
        if (!isAuthenticated) return false;
        return authContext.isAuthorized(menuItem.roles);
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate.push('/login');
        authContext.setIsAuthenticated(false);
        authContext.showToastr({
            severity: 'success',
            detail: 'Başarıyla çıkış yapıldı.',
            summary: 'Başarılı'
        });
    };

    return (
        <div className="card">
            <Menubar model={dynamicMenu} />
        </div>
    );
}

export default Navbar;
