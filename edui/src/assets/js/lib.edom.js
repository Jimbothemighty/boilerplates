
export class edom {
	/**
     * @param {String} html HTML representing a single element
     * @return {Node}
     */
	static CreateSingle(html) {
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
	static Create(html) {
		let template = document.createElement(`template`)
		template.innerHTML = html

		if (template.content == null) {
			throw `Create: template.content is null`
		} else {
			return template.content
		}
	}

	static Select(selector) {
		return document.querySelectorAll(selector)
	}
}

String.prototype.hashValue = function() {
	let hash = 0
	let i; let chr
	if (this.length === 0) return hash
	for (i = 0; i < this.length; i++) {
		chr = this.charCodeAt(i)
		hash = ((hash << 5) - hash) + chr
		hash |= 0 // Convert to 32bit integer
	}
	return hash
}

Element.prototype.edpEmpty = function() {
	this.innerHTML = ``
	return this
}

Node.prototype.edpAppend = function(elements) {
	this.edpAppend(elements)
	return this
}

NodeList.prototype.edpAppend = function(elements) {
	this.forEach((nde) => nde.edpAppend(elements))
	return this
}

DocumentFragment.prototype.edpAppend = function(elements) {
	if (typeof elements === `string`) {
		this.edpAppend(edom.Create(elements))
	} else if (elements instanceof NodeList) {
		let elementsArr = Array.prototype.slice.call(elements)
		for (let index = 0; index < elementsArr.length; index++) {
			const element = elementsArr[index]
			this.edpAppend(element)
		}
	} else if (Array.isArray(elements)) {
		for (let index = 0; index < elements.length; index++) {
			const element = elements[index]
			this.edpAppend(element)
		}
	} else if (elements instanceof Node) {
		this.append(elements)
	}

	return this
}

Element.prototype.edpAppend = function(elements) {
	if (typeof elements === `string`) {
		this.edpAppend(edom.Create(elements))
	} else if (elements instanceof NodeList) {
		let elementsArr = Array.prototype.slice.call(elements)
		for (let index = 0; index < elementsArr.length; index++) {
			const element = elementsArr[index]
			this.edpAppend(element)
		}
	} else if (Array.isArray(elements)) {
		for (let index = 0; index < elements.length; index++) {
			const element = elements[index]
			this.edpAppend(element)
		}
	} else if (elements instanceof Node) {
		this.append(elements)
	}

	return this
}

Element.prototype.edpFind = function(selector) {
	return this.querySelectorAll(selector)
}
