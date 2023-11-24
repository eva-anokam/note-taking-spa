import { HomePage } from "../components/HomePage.js"

export const Router = {
    init: () => {
        //set up event listeners
        const link = document.querySelector(".link")

        link.addEventListener("click", (event) => {
            event.preventDefault()
            const anchor = link.querySelector("a")
            const url = anchor.getAttribute("href")
            Router.go(url)
        })
        window.addEventListener("popstate", (event) => {
            Router.go(event.state.route, false)
        })
        // Call go() method initially when the app starts to handle the base URL
        Router.go(window.location.pathname); // This will load the home page for the base URL
    },
    go: (route, addToHistory = true) =>  {
        if (addToHistory) {
            history.pushState({route}, null, route)
        }
        let pageElement = null;
        switch (route) {
            case "/note-taking-spa/index.html":
            case "/note-taking-spa/":
                //load the home page when the base url is accessed
                pageElement = document.createElement("home-page")
                break;
            default:
                pageElement = document.createElement("h1");
                pageElement.textContent = "Page Not Found"
                break;
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