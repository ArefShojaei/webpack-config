import createElement from '@helpers/createElement'
import avatar from '@assets/images/avatar.jpg'
import './user.css'

export default createElement("div", { id : "user-uc" }, [
    createElement("img", { class : "user-image", src : avatar }, []),
    createElement("h3", { class : "user-name" }, ["Robert"]),
    createElement("p", { class : "user-skill" }, ["PHP Developer"]),
])