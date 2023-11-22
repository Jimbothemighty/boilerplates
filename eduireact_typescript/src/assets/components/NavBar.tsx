import { setLoggedIn } from "~/redux/authentication"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "~/redux/store"

export function NavBar() {
	const loggedIn = useSelector((state: RootState) => state.authentication.isLoggedIn)
	const dispatch: AppDispatch = useDispatch()

	return <div className="NavBar">
		<div className='logInButtonContainer'>ReactJs Typescript<button onClick={() => {
			dispatch(setLoggedIn(!loggedIn))
		}}>
			{loggedIn ? `Log Out` : `Log In`}
		</button>
		</div>
	</div>
}
