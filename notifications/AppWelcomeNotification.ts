import i18n from "i18n";
import User from "../objects/User";
import BaseNotification from "./BaseNotification";

export default class AppWelcomeNotification extends BaseNotification {
    
    constructor(receivers: User[], data: any){
        super(receivers)
    }

    send() {
        this.receivers.forEach(receiver => {
            console.log(`APP: Welcome ${receiver.name}`); 
        });
        return true;
    }

    render(id: string){
        let user = this.user(id);
        if(user){
            return `${i18n.__({phrase: 'welcome', locale: user.preferredLanguage})} ${user.name}`;
        }
        return null;
    }
}
