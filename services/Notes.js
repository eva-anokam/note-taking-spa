const Notes = {
    notes:  null
}

const proxiedNotes = new Proxy(Notes, {
    set(target, property, value) {
        target[property] = value;
        if (property === "notes") {
            window.dispatchEvent(new Event("noteschange"))
        }
        return true;
    }
})
export default proxiedNotes