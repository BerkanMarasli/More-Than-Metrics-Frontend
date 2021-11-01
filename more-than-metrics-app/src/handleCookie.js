export function getAccountType(cookie) {
    const cookieArray = cookie.split("; ")
    return cookieArray[0].split("=")[1]
}

export function getUserID(cookie) {
    const cookieArray = cookie.split("; ")
    return cookieArray[1].split("=")[1]
}
