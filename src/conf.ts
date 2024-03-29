export const API_HASH : string = <string> process.env.API_HASH;
export const API_SECRET : string = <string> process.env.API_SECRET;

export const ERRORS : object =  {
    "USER_OR_EMAIL_USED": {
        code: 400,
        message: "There is already an account with this username or password."
    },
    "ACCOUNT_DOESNT_EXIST": {
        code: 400,
        message: "This account does not exist."
    },
    "INVALID_PASSWORD": {
        code: 400,
        message: "Password entered is invalid."
    }
}