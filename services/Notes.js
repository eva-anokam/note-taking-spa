export const Notes = []

export function checkLocalStorage() {
    const storedNotes = localStorage.getItem("note")
    const data = JSON.parse(storedNotes)
    //ls = local storage
    if (data) {
        data.forEach(lsData => {
            // Check if lsData's title doesn't exist in Notes
            const exists = Notes.some(note => note.title === lsData.title);
            if (!exists) {
                Notes.push(lsData); // If title is unique, add lsData to Notes
            }
        }); 
    }
}
