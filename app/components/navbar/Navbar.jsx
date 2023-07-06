"use client"
import { AuthContext } from "@/app/contexts/AuthContext";
import Link from "next/link";
import {  useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

function Navbar() {
    const [userInformation, setUserInformation] = useState({})
    const authContext = useContext(AuthContext);
	const navigate = useRouter();

    useEffect(() => {
        setUserInformation(authContext.getDecodedToken());
    },[authContext])

	return (
		<nav class="navbar navbar-expand-lg bg-body-tertiary">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">
					Navbar
				</a>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item">
							<a class="nav-link active" aria-current="page" href="#">
								Home
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">
								Link
							</a>
						</li>
						<li class="nav-item dropdown">
							<a
								class="nav-link dropdown-toggle"
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Dropdown
							</a>
							<ul class="dropdown-menu">
								<li>
									<a class="dropdown-item" href="#">
										Action
									</a>
								</li>
								<li>
									<a class="dropdown-item" href="#">
										Another action
									</a>
								</li>
								<li>
									<hr class="dropdown-divider" />
								</li>
								<li>
									<a class="dropdown-item" href="#">
										Something else here
									</a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							{ authContext.isAuthenticated ? <a href="#" className="nav-link">Hoşgeldiniz, {userInformation['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']}</a> : <><Link href="/login" class="nav-link">Giriş Yap</Link></> }
						</li>
						{
							authContext.isAuthenticated ? <li className="nav-item">
							<a onClick={() => {
								localStorage.removeItem('token')
								authContext.setIsAuthenticated(false);
								navigate.push('/login')
							}} className="nav-link cursor-pointer">Çıkış Yap</a>
						</li> : <></>
						}
						
					</ul>
					<form class="d-flex" role="search">
						<input
							class="form-control me-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button class="btn btn-outline-success" type="submit">
							Search
						</button>
					</form>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
