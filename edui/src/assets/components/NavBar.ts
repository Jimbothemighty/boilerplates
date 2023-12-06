import { getEdApp, EdUiElement } from "~/assets/js/EdUi.ts"
import { Create } from "~/assets/js/eDom"

export default class NavBar extends EdUiElement {
	define() {
		this.propagationRegistration([`logged_in`], async(key) => {
			if (key === `logged_in`) {
				// nothing special to do, just want to re-render
			}
			this.render()
		})
	}

	render() {
		let elem = Create(`<div class='logInButtonContainer'>EdJs<button>${getEdApp().getState(`logged_in`) ? `Log Out` : `Log In`}</button></div>`)
		if (elem == null) {
			return
		}
		elem.querySelector(`button`).addEventListener(`click`, () => getEdApp().setState(
			`logged_in`,
			!getEdApp().getState(`logged_in`)
		))
		return elem
	}
}
