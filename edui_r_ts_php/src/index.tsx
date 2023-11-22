import { App } from "~/assets/components/App"
import { store } from "~/redux/store"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"

const container = document.querySelector(`.wrapper`)
const root = createRoot(container)

root.render(
	// <StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
	// </StrictMode>
)
