import React from "react"
import { isLoggedIn } from '~/redux/authentication'
import { useSelector } from 'react-redux'

function FooterColumnElement(props) {
	return <div className='FooterColumnElement'>{props.text}</div>
}

function FooterColumn({ rows }) {
	if (rows.length === 0) {
		return <div className="FooterColumn">Empty</div>
	}

	return <div className="FooterColumn">{
		rows.map((row) => {
			return <FooterColumnElement key={row.id} {...row}></FooterColumnElement>
		})}</div>
}

export function Footer() {
	const loggedIn = useSelector(isLoggedIn)

	return <div className="Footer">
		<FooterColumn rows={[{ id: 1, text: loggedIn ? `Log Out` : `Log In` }, { id: 2, text: `Terms and Conditions` }, { id: 3, text: `Privacy Policy` }]} />
		<FooterColumn rows={[]}></FooterColumn>
		<FooterColumn rows={[]}></FooterColumn>
	</div>
}
