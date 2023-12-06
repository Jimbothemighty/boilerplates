
import { App } from "~/assets/components/App"
import { createEdAppRoot } from "~/assets/js/EdUi"
import { edpAppend } from "~/assets/js/eDom"

createEdAppRoot().setApplicationRoot(
	document.querySelector(`.wrapper`)
)

edpAppend(document.querySelector(`.wrapper`), (new App()).render())
