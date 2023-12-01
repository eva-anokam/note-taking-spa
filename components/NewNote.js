import app from "../app.js";
import { generateTime } from "../services/GenerateTime.js";
import { createNoteId } from "../services/NoteId.js";
import { Notes } from "../services/Notes.js";
import Router from "../services/Router.js";
const cssModule = import('./NewNote.css', {
    assert: { type: 'css' }
});

export default class NewNote extends HTMLElement {
    constructor() {
        super()

        //create and attach shadow DOM
        this.shadowDOM = this.attachShadow({ mode: "open" });
        // Create a new style element
        const styleElement = document.createElement('style');
        // Append to the shadowDOM
        this.shadowDOM.appendChild(styleElement); 

        async function loadCSS() {
            try {
                const req = await cssModule;
                // Assuming req.default is your CSSStyleSheet object
                const styleSheet = req.default;
                // Concatenate and append the CSS text of each rule to the style element
                let cssText = '';
                for (let i = 0; i < styleSheet.cssRules.length; i++) {
                    const rule = styleSheet.cssRules[i];
                    // Concatenate each rule's CSS text
                    cssText += rule.cssText + '\n'; 
                }

                // Set the concatenated CSS text as the content of the style element
                styleElement.textContent = cssText;
                
            } catch (error) {
                console.error('Error loading CSS:', error);
            }
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
                    <div class="color">
                        <label>
                        Select your background color:
                            <input type="color" id="bgcolor" name="bgcolor" value="#f0f0f0"/>
                        </label>
                    </div>
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
                const color = this.shadowDOM.querySelector("#bgcolor")

                if (title && body) {
                    //generate time
                    const time = generateTime()
                    const id = createNoteId()
                    // Check if both input fields exist
                    const newNote = {
                        title: title.value,
                        body: body.value,
                        created_at: time,
                        color: color.value,
                        id
                    };

                    Notes.push(newNote)
                    localStorage.setItem("note", JSON.stringify(Notes))
                    Router.go("/");
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