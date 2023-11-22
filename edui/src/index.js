
import { App } from "~/assets/components/App.js"
import { createEdAppRoot } from "~/assets/js/EdUi.js"

createEdAppRoot().setApplicationRoot(
	document.querySelector(`.wrapper`)
)

document.querySelector(`.wrapper`).edpAppend((new App()).render())
