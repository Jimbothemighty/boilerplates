/**
 * @param {String} html HTML representing a single element
 * @return {Node}
 */
export function CreateSingle(html : string) {
	let template = document.createElement(`template`)
	html = html.trim() // Never return a text node of whitespace as the result
	template.innerHTML = html

	if (template.content.firstChild == null) {
		throw `CreateSingle: template.content.firstChild is null`
	} else {
		return template.content.firstChild
	}
}

/**
 * @param {String} html HTML representing any number of sibling elements
 * @return {DocumentFragment}
 */
export function Create(html : string) {
	let template = document.createElement(`template`)
	template.innerHTML = html

	if (template.content == null) {
		throw `Create: template.content is null`
	} else {
		return template.content
	}
}

export function Select(selector : string) : NodeListOf<Element> {
	return document.querySelectorAll(selector)
}

export const hashValue = function(str) {
	let hash = 0
	let i; let chr
	if (str.length === 0) return hash
	for (i = 0; i < str.length; i++) {
		chr = str.charCodeAt(i)
		hash = ((hash << 5) - hash) + chr
		hash |= 0 // Convert to 32bit integer
	}
	return hash
}

export const edpEmpty = function(elem : Element) {
	elem.innerHTML = ``
	return elem
}

export const edpAppend = function<Type>(frag : Type, elements) : Type {
	if (frag instanceof NodeList) {
		frag.forEach((nde) => edpAppend(nde, elements))

		return frag
	} else if (frag instanceof DocumentFragment || frag instanceof Element) {
		if (typeof elements === `string`) {
			edpAppend(frag, Create(elements))
		} else if (elements instanceof NodeList) {
			let elementsArr = Array.prototype.slice.call(elements)
			for (let index = 0; index < elementsArr.length; index++) {
				const element = elementsArr[index]
				edpAppend(frag, element)
			}
		} else if (Array.isArray(elements)) {
			for (let index = 0; index < elements.length; index++) {
				const element = elements[index]
				edpAppend(frag, element)
			}
		} else if (elements instanceof Node) {
			frag.append(elements)
		}

		return frag
	}
}

export const edpFind = function(elem : Element, selector) {
	return elem.querySelectorAll(selector)
}
