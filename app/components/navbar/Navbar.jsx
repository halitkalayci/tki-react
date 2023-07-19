"use client";
import {ClaimNames} from "@/app/constants/claimNames";
import {AuthContext} from "@/app/contexts/AuthContext";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useContext, useEffect, useState} from "react";
import './navbar.css'
import {Menubar} from "primereact/menubar"
function Navbar() {
	const [menuItems, setMenuItems] = useState([]);
	const [userInformation, setUserInformation] = useState({});
	const [authenticated, setAuthenticated] = useState(false)
	const authContext = useContext(AuthContext);
	const navigate = useRouter();
	const [showDropdown, setShowDropdown] = useState(false)
	const [dropdowns, setDropdowns] = useState({cars:false, brands:false})
	useEffect(() => {
		setUserInformation(authContext.getDecodedToken());
		setAuthenticated(authContext.isAuthenticated);
	}, [authContext]);

	useEffect(() => {
		fetchMenuItems();
	}, [])
	// TODO: Backendden gelen veriyi primereactin anlayabileceği bir menü verisi haline çevirmek.
	const fetchMenuItems = () => {
		setMenuItems([
			{
				label: 'File',
				icon: 'pi pi-fw pi-file',
				event: () => {
					// Tıklandığında çalışacak fonksiyon..
				}
			},
			{
				label: 'Edit',
				icon: 'pi pi-fw pi-pencil',
				items: [
					{
						label: 'Left',
						icon: 'pi pi-fw pi-align-left'
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
					},
	
				]
			},
			{
				label: 'Users',
				icon: 'pi pi-fw pi-user',
				items: [
					{
						label: 'New',
						icon: 'pi pi-fw pi-user-plus',
	
					},
					{
						label: 'Delete',
						icon: 'pi pi-fw pi-user-minus',
	
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
		])
	}

	const toggleDropdown = (key) => {
		let newDropdown = {...dropdowns};
		newDropdown[key] = !dropdowns[key]
		setDropdowns(newDropdown);
	}

	useEffect(() => {
		console.log(dropdowns);
	}, [dropdowns])

	return (
		<div className="card">
			<Menubar model={menuItems}/>
		</div>
	);
}

export default Navbar;
