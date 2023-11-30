export function generateTime() {
    const d = new Date()
    const day = d.getDate();
    const mnth = d.getMonth();
    const year = d.getFullYear()
    const date = `${day}-${mnth}-${year}`
    const hour = d.getHours()
    let min = d.getMinutes()
    let suffix = "AM"
    if (hour > 12) {
        suffix = "PM"
    }
    if (min < 10) {
        min = `0${min}`
    }
    const time = `${hour}:${min} ${suffix}`
    
    return `${date} ${time}`
}

