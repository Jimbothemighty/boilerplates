import { getEdApp, EdUiElement } from "~/assets/js/EdUi.ts"
import { edpAppend } from "~/assets/js/eDom"

export default class LogInForm extends EdUiElement {
	render() {
		let elem = edpAppend(document.createElement(`form`), [
			`<h1>Log In Form</h1>`,
			`<input type='email' placeholder='Email'>`,
			`<input type='password' placeholder='Password'>`,
			`<button>Log In</button>`,
		])
		elem.querySelector(`button`).addEventListener(`click`, (event) => {
			event.preventDefault()
			getEdApp().setState(`logged_in`, true)
		})
		return elem
	}
}
