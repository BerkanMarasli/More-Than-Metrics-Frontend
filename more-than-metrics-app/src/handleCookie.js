export function getAccountType(documentCookie) {
    const cookieArray = documentCookie.split("; ")
    for (let cookie of cookieArray) {
        if (cookie.includes("moreThanMetricsAT")) {
            console.log(cookie)
            return cookie.split("=")[1]
        }
    }
}

export function getUserID(documentCookie) {
    const cookieArray = documentCookie.split("; ")
    for (let cookie of cookieArray) {
        if (cookie.includes("moreThanMetricsID")) {
            return cookie.split("=")[1]
        }
    }
}

export function getRegisterUserType(documentCookie) {
    const cookieArray = documentCookie.split("; ")
    for (let cookie of cookieArray) {
        if (cookie.includes("redirectToRegister")) {
            return cookie.split("=")[1]
        }
    }
}
