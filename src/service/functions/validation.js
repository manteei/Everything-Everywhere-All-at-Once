const cyrillicPattern = /[а-яА-ЯЁё]/;


export function checkAuthorization(login, password) {
    return (login === "" || cyrillicPattern.test(login) || login?.length < 6 || login?.length > 20)
        || (password === "" || cyrillicPattern.test(password) || password?.length < 6 || password?.length > 20)
}

export function checkRegistration(login, password, repeatPassword) {
    return (login === "" || cyrillicPattern.test(login) || login?.length < 6 || login?.length > 20)
        || (password === "" || cyrillicPattern.test(password) || password?.length < 6 || password?.length > 20)
        || (repeatPassword === "" || cyrillicPattern.test(repeatPassword) || repeatPassword?.length < 6 || repeatPassword?.length > 20)
}

export function checkInputText(value, min, max) {
    return (((value?.length < min || value?.length > max) && value !== "")
        || cyrillicPattern.test(value))
}

export function checkInputNumber(value, min, max) {
    return (value < min || value > max)
}