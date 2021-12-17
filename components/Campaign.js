export const type = (types) => types.join(" · ")
export const type_en = (types) => {
    let res = []
    types.forEach(item => {
        item === "Campur" && res.push("Mixed")
        item === "Putra" && res.push("Men")
        item === "Putri" && res.push("Woman")
        item === "Pasutri" && res.push("Married")
    })
    return res.join(" · ")
}
export const duration = (durations) => {
    let duration
    switch (durations) {
        case 'Hari':
            duration = 'Day'
            break;
        case 'Minggu':
            duration = 'Week'
            break;
        case 'Bulan':
            duration = 'Month'
            break;
        default:
            duration = 'Year'
            break;
    }
    return duration
}
export const facility = (facility) => facility.join(" · ")
export default facility