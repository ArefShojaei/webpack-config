export default (tagName, attribute = {}, children) => {
    const element = document.createElement(tagName)

    if(attribute) {
        Object.keys(attribute).forEach(key => {
            element.setAttribute(key, attribute[key])
        })
    }

    if(children) {
        children.forEach(child => {
            if(typeof child === 'string') {
                element.appendChild(document.createTextNode(child))
            }else {
                element.appendChild(child)
            }
        })
    }

    return element
}