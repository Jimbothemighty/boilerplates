import { getEdApp, EdUiElement } from "~/assets/js/EdUi.ts"
import { Create } from "~/assets/js/eDom"

export default class LoggedInApp extends EdUiElement {
	render() {
		let elem = Create(`<div>
            <h1>You are logged in</h1>
            <button>Log Out</button>
        </div>`)

		elem.querySelector(`button`).addEventListener(`click`, () => getEdApp().setState(
			`logged_in`,
			!getEdApp().getState(`logged_in`)
		))

		return elem
	}
}
