import NotificationFactory from './NotificationFactory';
import SWVLNotification from './models/notification';
import NotificationStatus from './models/enums/NotificationStatus';

export default class NotificationService {

    handle(notification: any){
        const notificationHandler = NotificationFactory.GetNotificationHandler(
            notification.recievers,
            notification.notification_object.type,
            notification.channel,
            notification.notification_object.dependencies
            );
        if(notificationHandler.send()){
            SWVLNotification.updateOne({ _id: notification.id }, { status: NotificationStatus.SENDED }, function(err, res) {
                if(err) { console.error(err) }
            });
        }else{
            SWVLNotification.updateOne({ id: notification.id }, { status: NotificationStatus.FAILED }, function(err, res) {
                if(err) { console.error(err) }
            });
        }
    }

    init(){
      const cursor = SWVLNotification
        .find({
            status: NotificationStatus.PENDING
        })
        .tailable()
        .cursor();
  
      cursor.on('data', (doc) => {
        // TODO add lock solution for distrubuted system
        this.handle(doc);
      });

      cursor.on('close', function() {
        console.log('closing...');
      });
  
      cursor.on('error', error => {
        console.error(error);
        cursor.destroy();
        this.init();
      });
    }
}