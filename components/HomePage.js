import { fetchNotes } from "../services/API.js";
import app from "../app.js";
import { Notes, checkLocalStorage } from "../services/Notes.js";
import Router from "../services/Router.js";
import { darkenHexColor } from "../services/CreateBorderColor.js";
import { goToNote } from "../services/GoToNote.js";

let noteToEditIndex = null
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
        this.setupEventListeners()
    }
    render() {
        const section = this.shadowDOM.querySelector("#home")
        //load notes
        checkLocalStorage()
        if (Notes.length < 1) {
            const emptyInner = this.shadowDOM.querySelector(".empty-inner");
            emptyInner.hidden = !emptyInner.hidden
        }
        else {
            section.innerHTML= ""
            const inner = document.createElement("div")
            inner.classList.add("inner")
            Notes.forEach(note => {
                const noteContainer = document.createElement("div")
                noteContainer.setAttribute("data-note-id", note.id)
                noteContainer.classList.add("note")
                noteContainer.style.backgroundColor = note.color;
                const borderClr = darkenHexColor(note.color, 30)
                noteContainer.style.border = `3px solid ${borderClr}`

                const hoverElement = document.createElement('div');
                
                hoverElement.classList.add('hover-element');
                hoverElement.innerHTML = '\uf044'; // Font Awesome icon content
                hoverElement.style.opacity = 0; // Initially hide the hover element
                hoverElement.style.backgroundColor = note.color
                noteContainer.addEventListener('mouseenter', () => {
                    hoverElement.style.opacity= 1;
                });

                noteContainer.addEventListener('mouseleave', () => {
                    hoverElement.style.opacity= 0;
                });
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
                noteContainer.appendChild(hoverElement);
                inner.appendChild(noteContainer)
                section.appendChild(inner)

           }) 
            }
        
    }
    setupEventListeners() {
        const notes = this.shadowDOM.querySelectorAll(".note")

        notes.forEach(note => {
            note.addEventListener("click", (event) => {
                event.preventDefault()
                const noteId = event.currentTarget.getAttribute("data-note-id")
                const currNote = Notes.find(note => {
                    if (note.id === noteId) {
                        noteToEditIndex = goToNote(noteId)
                        Router.go(`/edit-note-${noteId}`)

                    }
                })
            })
        })
    }
}
customElements.define("home-page", HomePage)

export{noteToEditIndex}