import i18n from "i18n";
import User from "../objects/User";
import BaseNotification from "./BaseNotification";
import NotificationInterface from "./NotificationInterface";

export default class EmailWelcomeNotification extends BaseNotification implements NotificationInterface {
    constructor(receivers: User[], data: any){
        super(receivers);
    }

    send() {
        this.receivers.forEach(receiver => {
            console.log(`Email: Welcome ${receiver.name}`); 
        });
        return true;
    }
}
