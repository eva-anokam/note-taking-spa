import { Notes } from "./Notes.js";

let id = null;
export function createNoteId() {
    if (Notes.length < 1) {
        id = 0
    } else {
        id++
    }
    return id.toString();
}