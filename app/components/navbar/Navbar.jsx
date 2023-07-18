"use client";
import {ClaimNames} from "@/app/constants/claimNames";
import {AuthContext} from "@/app/contexts/AuthContext";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useContext, useEffect, useState} from "react";

function Navbar() {
	const [userInformation, setUserInformation] = useState({});
	const [authenticated, setAuthenticated] = useState(false)
	const authContext = useContext(AuthContext);
	const navigate = useRouter();
	const [showDropdown, setShowDropdown] = useState(false)
	useEffect(() => {
		setUserInformation(authContext.getDecodedToken());
		setAuthenticated(authContext.isAuthenticated);
	}, [authContext]);

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">
					Navbar
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<a className="nav-link active" aria-current="page" href="#">
								Home
							</a>
						</li>
						{authContext.isAuthorized(["Moderator"]) && (
							<li className="nav-item">
								<a className="nav-link" href="#">
									Araba Ekle
								</a>
							</li>
						)}
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="#"
								onClick={() => setShowDropdown(!showDropdown)}
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Dropdown
							</a>
							<ul className={"dropdown-menu " +( showDropdown ? 'show':'')}>
								<li>
									<a className="dropdown-item" href="#">
										Action
									</a>
								</li>
								<li>
									<a className="dropdown-item" href="#">
										Another action
									</a>
								</li>
								<li>
									<hr className="dropdown-divider" />
								</li>
								<li>
									<a className="dropdown-item" href="#">
										Something else here
									</a>
								</li>
							</ul>
						</li>
						<li suppressHydrationWarning className="nav-item">
							{authenticated ? (
								<a href="#" className="nav-link">
									Hoşgeldiniz, {userInformation[ClaimNames.NAME]}
								</a>
							) : (
								<>
									<Link href="/login" className="nav-link">
										Giriş Yap
									</Link>
								</>
							)}
						</li>
						{authenticated ? (
							<li className="nav-item">
								<a
									onClick={() => {
										localStorage.removeItem("token");
										authContext.setIsAuthenticated(false);
										navigate.push("/login");
									}}
									className="nav-link cursor-pointer"
								>
									Çıkış Yap
								</a>
							</li>
						) : (
							<></>
						)}
					</ul>
					<form className="d-flex" role="search">
						<input
							className="form-control me-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button className="btn btn-outline-success" type="submit">
							Search
						</button>
					</form>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
