export async function fetchNotes() {
    const req = await fetch("./notes.json")
    const data = await req.json()
    return data

}