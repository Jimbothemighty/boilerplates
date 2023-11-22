import { NavBar } from "./NavBar"
import { LogInForm } from "./LogInForm"
import { LoggedInApp } from "./LoggedInApp"
import { Footer } from "./Footer"
import { useSelector } from "react-redux"
import "~/assets/css/style.css"
import { RootState } from "~/redux/store"

export function App() {
	const loggedIn = useSelector((state: RootState) => state.authentication.isLoggedIn)

	return <div className="App">
		<NavBar />
		{loggedIn ? <LoggedInApp /> : <LogInForm />}
		<Footer />
	</div>
}
