import User from "../objects/User";

export default class BaseNotification {
    receivers: User[];

    constructor(receivers: User[]){
        this.receivers = receivers;
    }

    user(id: string){
        return this.receivers.find((reciever: any) => {
            return reciever.id == id
        });
    }
}
