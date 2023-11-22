import React from "react"
import { NavBar } from "./NavBar"
import { LogInForm } from "./LogInForm"
import { LoggedInApp } from "./LoggedInApp"
import { Footer } from "./Footer"
import { isLoggedIn } from '~/redux/authentication'
import { useSelector } from "react-redux"
import "~/assets/css/style.css"

export function App() {
	const loggedIn = useSelector(isLoggedIn)

	return <div className="App">
		<NavBar />
		{loggedIn ? <LoggedInApp /> : <LogInForm />}
		<Footer />
	</div>
}
