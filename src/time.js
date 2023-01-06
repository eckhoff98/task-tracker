// Helper Functions 
export const getCurrentDate = () => {
    // convert Javascript Date to HTML Input
    const now = new Date();
    const day = ("0" + now.getDate()).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    // const hour = ("0" + (now.getHours())).slice(-2);
    // const min = ("0" + (now.getMinutes())).slice(-2);
    const today = now.getFullYear() + "-" + month + "-" + day
    console.log("today " + today)
    return today
}

export const getCurrentTime = () => {
    // convert Javascript Date to HTML Input
    const now = new Date();
    const hour = ("0" + (now.getHours())).slice(-2);
    const min = ("0" + (now.getMinutes())).slice(-2);
    const time = `${hour}:${min}`
    return time
}

export const convertToDate = (date) => {
    const now = date
    const day = ("0" + now.getDate()).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const today = now.getFullYear() + "-" + month + "-" + day
    console.log("today " + today)
    return today
}

export const convertToTime = (date) => {
    const now = date
    const hour = ("0" + (now.getHours())).slice(-2);
    const min = ("0" + (now.getMinutes())).slice(-2);
    const time = `${hour}:${min}`
    return time
}

