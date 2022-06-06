export interface LoginData {
    _id: string,
    firstname: string,
    surname: string,
    username: string,
    email: string,
    dob: string,
    interests: string[],
    blocked: string[],
    favourites: object[],
    favouriting: object[],
}