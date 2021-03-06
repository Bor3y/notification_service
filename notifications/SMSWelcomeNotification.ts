import i18n from "i18n";
import User from "../objects/User";
import BaseNotification from "./BaseNotification";
import NotificationInterface from "./NotificationInterface";

export default class SMSWelcomeNotification extends BaseNotification implements NotificationInterface {
    constructor(receivers: User[], data: any){
        super(receivers);
    }

    send() {
        this.receivers.forEach(receiver => {
            console.log(`SMS: ${i18n.__({phrase: 'welcome', locale: receiver.preferredLanguage})} ${receiver.name}`); 
        });
        return true;
    }
}
