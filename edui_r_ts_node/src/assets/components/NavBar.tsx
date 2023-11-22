import { setLoggedIn } from "~/redux/authentication"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "~/redux/store"

export function NavBar() {
	const loggedIn = useSelector((state: RootState) => state.authentication.isLoggedIn)
	const dispatch: AppDispatch = useDispatch()

	return <div className="NavBar">
		<div className='logInButtonContainer'>dReactJs Typescript with NodeJs (Express) Backend<button onClick={() => {
			dispatch(setLoggedIn(!loggedIn))
		}}>
			{loggedIn ? `Log Out` : `Log In`}
		</button>
		</div>
	</div>
}
