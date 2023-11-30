import Router from "./services/Router.js";



//import pages
import { HomePage } from "./components/HomePage.js";
import NewNote from "./components/NewNote.js"
import { EditNote } from "./components/EditNote.js";


const app = {}
app.router = Router


window.addEventListener("DOMContentLoaded", () => {
    app.router.init()
})

export default app