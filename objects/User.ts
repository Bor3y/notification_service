export default class User{
    id: number;
    name: string;
    phone: string;
    email: string;
    notificationToken: string;
    preferredLanguage: string;

    constructor(id: number, name: string, phone: string,email: string, notificationToken: string, preferredLanguage: string){
        this.name = name;
        this.id = id;
        this.phone = phone;
        this.email = email;
        this.notificationToken = notificationToken;
        this.preferredLanguage = preferredLanguage;
    }
}