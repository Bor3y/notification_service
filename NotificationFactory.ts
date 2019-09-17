import User from './objects/User';
import NotificationFactories from './NotificationFactories'

export default class NotificationFactory {

    static GetNotificationHandler(receivers: [any], type: string, channel: string, dependencies: any){
        let users = receivers.map(reciever => {
            return new User(reciever.id, reciever.name, reciever.phone, reciever.email, reciever.notificationToken, reciever.preferredLanguage);
        })        
        return new NotificationFactories[type][channel](users, dependencies);
    }
}