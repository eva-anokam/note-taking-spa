import { fetchNotes } from "../services/API.js";
import NewNote from "../components/NewNote.js"
import app from "../app.js";
export class HomePage extends HTMLElement {
    constructor() {
        super();

        this.shadowDOM = this.attachShadow({ mode: "open" })
        //add css
        const styles = document.createElement("style");
        this.shadowDOM.appendChild(styles)
        async function loadCSS() {
            const req = await fetch("./components/HomePage.css");
            const css = await req.text()
            styles.textContent = css
        }
        loadCSS()
    }
    connectedCallback() {
        const template = document.getElementById("home-page-template");
        if (template) {
            const content = template.content.cloneNode(true)
            this.shadowDOM.appendChild(content)
        } else {
            console.error("Template not found")
        }
        
        //add proxy
        this.render()
        window.addEventListener("noteschange", () => {
            this.render()
        })
    }
    render() {
        const section = this.shadowDOM.querySelector("#home")
        section.innerHTML = "";
        //load notes
        async function getNotes() {
            app.notes = await fetchNotes()
            app.notes.notesArray.forEach(note => {
                const noteContainer = document.createElement("div")
                noteContainer.classList.add("note")
                noteContainer.innerHTML = `
                    <p class="note__title">
                        ${note.title}
                    </p>
                    <p class="note__time">
                        ${note.created_at}
                    </p>
                    <p class="note__body">
                        ${note.body}
                    </p>
                `
                section.appendChild(noteContainer)
                //add event listener to each note
                noteContainer.addEventListener("click", (event) => {
                    console.log(event.target)
                })
            })
        }
        getNotes()
    }
}
customElements.define("home-page", HomePage)