'use client';
import { ClaimNames } from '@/app/constants/claimNames';
import { AuthContext } from '@/app/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import './navbar.css';
import { Menubar } from 'primereact/menubar';
import axiosInstance from '@/app/utilities/axiosInterceptors';
import { NavbarTypes } from '@/app/constants/navbarTypes';
function Navbar() {
    const [menuItems, setMenuItems] = useState([
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            visible: true,
            command: () => {
                console.log('deneme');
            },
            items: []
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {
                    label: 'Left',
                    icon: 'pi pi-fw pi-align-left',
                    items: [{ label: 'Deneme', icon: 'pi pi-fw pi-align-left' }]
                },
                {
                    label: 'Right',
                    icon: 'pi pi-fw pi-align-right'
                },
                {
                    label: 'Center',
                    icon: 'pi pi-fw pi-align-center'
                },
                {
                    label: 'Justify',
                    icon: 'pi pi-fw pi-align-justify'
                }
            ]
        },
        {
            label: 'Users',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus'
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-user-minus'
                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-users',
                    items: [
                        {
                            label: 'Filter',
                            icon: 'pi pi-fw pi-filter',
                            items: [
                                {
                                    label: 'Print',
                                    icon: 'pi pi-fw pi-print'
                                }
                            ]
                        },
                        {
                            icon: 'pi pi-fw pi-bars',
                            label: 'List'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Events',
            icon: 'pi pi-fw pi-calendar',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    items: [
                        {
                            label: 'Save',
                            icon: 'pi pi-fw pi-calendar-plus'
                        },
                        {
                            label: 'Delete',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                },
                {
                    label: 'Archive',
                    icon: 'pi pi-fw pi-calendar-times',
                    items: [
                        {
                            label: 'Remove',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-power-off'
        }
    ]);
    const [dynamicMenu, setDynamicMenu] = useState([]);
    const [userInformation, setUserInformation] = useState({});
    const [authenticated, setAuthenticated] = useState(false);
    const authContext = useContext(AuthContext);
    const navigate = useRouter();
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdowns, setDropdowns] = useState({ cars: false, brands: false });
    useEffect(() => {
        setUserInformation(authContext.getDecodedToken());
        setAuthenticated(authContext.isAuthenticated);
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

    const toggleDropdown = (key) => {
        let newDropdown = { ...dropdowns };
        newDropdown[key] = !dropdowns[key];
        setDropdowns(newDropdown);
    };

    useEffect(() => {
        console.log(dropdowns);
    }, [dropdowns]);

    return (
        <div className="card">
            <Menubar model={dynamicMenu} />
        </div>
    );
}

export default Navbar;
