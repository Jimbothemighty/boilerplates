import { getEdApp, EdUiElement, EdUiComponent } from "~/assets/js/EdUi.js"
import NavBar from "./NavBar.js"
import LogInForm from "./LogInForm.js"
import LoggedInApp from "./LoggedInApp.js"
import Footer from "./Footer.js"
import "~/assets/css/style.css"

export class App extends EdUiElement {
	define() {
		this.propagationRegistration([`logged_in`], async(key) => {
			if (key === `logged_in`) {
				// nothing special to do, just want to re-render
			}
			this.render()
		})
	}

	render() {
		return [
			EdUiComponent(NavBar),
			EdUiComponent(getEdApp().getState(`logged_in`) ? LoggedInApp : LogInForm),
			EdUiComponent(Footer),
		]
	}
}
