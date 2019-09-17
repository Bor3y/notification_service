import * as faker from 'faker';
import SWVLNotification from '../models/notification';
import NotificationStatus from "../models/enums/NotificationStatus";
import notification from '../models/notification';

const channels = ["sms", "email", "app"];
const types = ['welcome', 'stop_is_near']

const generateUsers = (n: number) => {
    let users = [];
    for(let i=0; i<n; i++){
        users.push({
            id: faker.random.uuid(),
            name: faker.name.findName(),
            phone: faker.phone.phoneNumber(),
            email: faker.internet.email(),
            notificationToken: faker.finance.account(),
            preferredLanguage: ['en', 'ar'][Math.floor(Math.random()*2)]
        });

    }
    return users;
}

const generateStop = () => {
    return {
        id: faker.random.uuid(),
        name: faker.address.city()
    }
}

const generateNotificationObject = () => {
    let type = types[Math.floor(Math.random()*types.length)];
    let dependencies = {};
    if(type == 'stop_is_near'){
        dependencies = {
            stop: generateStop()
        }
    }
    return {
        type: type,
        dependencies: dependencies
    }
}

const randomNotification = () :any => {
    let notification = new SWVLNotification({
        channel: channels[Math.floor(Math.random()*channels.length)],
        recievers: generateUsers(Math.floor(Math.random()*1000)),
        notification_object: generateNotificationObject(),
        created_at: Date.now(),
        status: NotificationStatus.PENDING
    });
        
    notification.save(
        (err: any) => { if (err) return console.log(err);}
    );
      
    return notification;
}

export default {
    randomNotification: randomNotification
}


