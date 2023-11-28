import app from "../app.js";
import Router from "../services/Router.js";

export default class NewNote extends HTMLElement {
    constructor() {
        super()

        //create and attach shadow DOM
        this.shadowDOM = this.attachShadow({ mode: "open" });

        //load css
        const styles = document.createElement("style")
        this.shadowDOM.appendChild(styles)
        async function loadCSS() {
            const req = await fetch("../note-taking-spa/components/NewNote.css");
            const css = await req.text()
            styles.textContent = css
        }
        loadCSS()
    }
    connectedCallback() {
        const template = document.querySelector("#new-note-template");
        if (template) {
            const content = template.content.cloneNode(true)
            this.shadowDOM.appendChild(content)
        } else {
            console.error("Template not found")
        }

        this.render()
        this.setupEventListeners()
        this.makeRequired()
    }
    render() {
        const section = this.shadowDOM.querySelector("#new-note");
        section.innerHTML = ""
        section.innerHTML = `
            <form class= "inner">
                <div class="input-container">
                    <label>
                        <input type="text" name="title" id="title" placeholder="Title of the note" required>
                    </label>
                    <label>
                        <textarea name="body" id="body" col= "30" rows= "10" placeholder="Write note content here" required></textarea>
                    
                    </label>
                </div>
                <button type="submit">Create Note</button>
        </form>
        `
    }
    makeRequired() {
        const title = this.shadowDOM.querySelector("#title");
        const body = this.shadowDOM.querySelector("#body");

        title.setAttribute("required", "");
        body.setAttribute("required", "");
    }
    
    setupEventListeners() {
        const form = this.shadowDOM.querySelector("form"); // Select the form element

        if (form) {
            form.addEventListener("submit", (event) => {
                event.preventDefault();

                const title = this.shadowDOM.querySelector("#title");
                const body = this.shadowDOM.querySelector("#body");

                if (title && body) {
                    // Check if both input fields exist
                    const newNote = {
                        title: title.value,
                        body: body.value
                    };

                    app.notes.notesArray.push(newNote);
                    Router.go("/note-taking-spa/");
                    console.log(app.notes.notesArray.length);
                } else {
                    console.error("Input fields not found in the shadow DOM.");
                }
            });
        } else {
            console.error("Form element not found in the shadow DOM.");
        }
    }
}
customElements.define("new-note", NewNote)