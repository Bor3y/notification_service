import i18n from "i18n";
import User from "../objects/User";
import BaseNotification from "./BaseNotification";

export default class EmailWelcomeNotification extends BaseNotification {
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
