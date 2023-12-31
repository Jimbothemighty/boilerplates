import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isLoggedIn: false,
}

const slice = createSlice({
	name: `authentication`,
	initialState,
	reducers: {
		setLoggedIn(state, action) {
			state.isLoggedIn = action.payload
		},
	},
})

export const isLoggedIn = (state) => state.authentication.isLoggedIn
export const { setLoggedIn } = slice.actions
export const authentication = slice.reducer
