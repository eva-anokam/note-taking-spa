export async function getNotes() {
    const req = await fetch("./notes.json")
    const data = await req.json()
    return data;
}