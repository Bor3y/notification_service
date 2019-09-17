import i18n from "i18n";
import Stop from "../objects/Stop";
import User from "../objects/User";
import BaseNotification from "./BaseNotification";
import NotificationInterface from "./NotificationInterface";

export default class SMSStopIsNearNotification extends BaseNotification implements NotificationInterface {
    stop: Stop;
    
    constructor(receivers: User[], data: any) {
        super(receivers);
        this.stop = new Stop(data.stop.id, data.stop.name);
    }

    send(){
        let ids = this.receivers.map((receiver) => receiver.id);
        console.log(`SMS: ${this.stop.name} is coming soon please be prepeared`, ids);
        return true;
    }
}