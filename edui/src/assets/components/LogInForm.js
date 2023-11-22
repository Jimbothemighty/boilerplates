import { getEdApp, EdUiElement } from "~/assets/js/EdUi.js"

export default class LogInForm extends EdUiElement {
	render() {
		let elem = document.createElement(`form`).edpAppend([
			`<h1>Log In Form</h1>`,
			`<input type='email' placeholder='Email'>`,
			`<input type='password' placeholder='Password'>`,
			`<button>Log In</button>`,
		])
		elem.querySelector(`button`).addEventListener(`click`, () => {
			event.preventDefault()
			getEdApp().setState(`logged_in`, true)
		})
		return elem
	}
}
