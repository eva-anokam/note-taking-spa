import { Notes } from "./Notes.js";

export function goToNote(id) {
    const noteIndex = Notes.findIndex(note => note.id === id)
    return noteIndex
}