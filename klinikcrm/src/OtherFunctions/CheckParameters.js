
export const validMail = (mail, id) => {
    const message = false
    document.getElementById(id).style.borderColor = "transparent";
    if (/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(mail) && mail !=="") {
        document.getElementById(id).style.borderColor = "green"
        return !message;
    } else {
        document.getElementById(id).style.borderColor = "red";
        return message;
    }
}


export const checkLengthPassword = (password, id) => {
    const message =false
    document.getElementById(id).style.borderColor = "none";
    if (password.toString().length>=6) {
        document.getElementById(id).style.borderColor = "green";
        return !message;

    } else {
        document.getElementById(id).style.borderColor = "red";
        return message;
    }
}
