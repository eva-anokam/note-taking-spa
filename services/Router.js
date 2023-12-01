import { HomePage } from "../components/HomePage.js"
import NewNote from "../components/NewNote.js"

export const Router = {
    init: () => {
        //set up event listeners
        const logo = document.querySelector(".logo")

        logo.addEventListener("click", (event) => {
            event.preventDefault()
            const anchor = logo.querySelector("a")
            const url = anchor.getAttribute("href")
            Router.go(url)
        })
        const newNote = document.querySelector(".add-new-note")
        newNote.addEventListener("click", (event) => {
            event.preventDefault()
            Router.go("/new-note")
        })

        window.addEventListener("popstate", (event) => {
            Router.go(event.state.route, false)
        })
        // Call go() method initially when the app starts to handle the base URL
        Router.go(window.location.pathname); // This will load the home page for the base URL
    },
    go: (route, addToHistory = true) => {
        if (addToHistory) {
            history.pushState({ route }, null, route)
        }
        let pageElement = null;

        if (route.endsWith("/index.html") || route.endsWith("/")) {
            pageElement = document.createElement("home-page")
        } else if (route.endsWith("/new-note")) {
            pageElement = document.createElement("new-note")
        }
        else if (route.startsWith("/edit-note-")) {
            pageElement = document.createElement("edit-note");
            const paramId = route.substring(route.lastIndexOf("-") + 1)
            pageElement.dataset.noteId = paramId
        } else {
            pageElement = document.createElement("h1")
            pageElement.textContent = "Page not found"
        }
        
        const main = document.querySelector("main");
        if (pageElement) {
            main.innerHTML = "";
            main.appendChild(pageElement)
            window.scrollX = 0;
            window.scrollY = 0;
        } else {
            main.innerHTML = ""
            main.textContent = "No page element found"
        }
    }
}

export default Router;