import i18n from "i18n";
import Stop from "../objects/Stop";
import User from "../objects/User";
import BaseNotification from "./BaseNotification";

export default class EmailStopIsNearNotification extends BaseNotification {
    stop: Stop;
    
    constructor(receivers: User[], data: any) {
        super(receivers);
        this.stop = new Stop(data.stop.id, data.stop.name);
    }

    send(){
        let ids = this.receivers.map((receiver) => receiver.id);
        console.log(`Email: ${this.stop.name} is coming soon please be prepeared`, ids);
        return true;
    }

}