import Router from "./services/Router.js";


//import pages
import { HomePage } from "./components/HomePage.js";
import NewNote from "./components/NewNote.js"
import proxiedNotes from "./services/Notes.js";


const app = {}
app.router = Router


window.addEventListener("DOMContentLoaded", () => {
    app.router.init()
})

export default app