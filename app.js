import Router from "./services/Router.js";


//import pages
import { HomePage } from "./components/HomePage.js";

const app = {}
app.router = Router

window.addEventListener("DOMContentLoaded", () => {
    app.router.init()
})