import { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt,GraphQLSchema, 
    GraphQLList,GraphQLNonNull 
} from 'graphql';
import SWVLNotification from '../models/notification';
import NotificationFactory from '../NotificationFactory';
import randomNotificationFactory from '../data/notificationFactory'
import notification from '../models/notification';
import NotificationStatus from '../models/enums/NotificationStatus';

const NotificationType = new GraphQLObjectType({
    name: 'Notification',
    fields: () => ({
        id: { type: GraphQLID  },
        content: { type: GraphQLString }, 
        created_at: { type: GraphQLString },        
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID  },
        name: { type: GraphQLString }, 
        phone: { type: GraphQLString },        
        email: { type: GraphQLString },
        preferredLanguage: { type: GraphQLString }
    })
});

const NotificationObjectType = new GraphQLObjectType({
    name: 'NotificationObject',
    fields: () => ({
        id: { type: GraphQLID },
        channel: {type: GraphQLString },
        type: { type: GraphQLString },
        status: { type: GraphQLString },    
        created_at: { type: GraphQLString },
        recievers: { type: new GraphQLList(UserType) } 
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        notifications: {
            type: new GraphQLList(NotificationType),
            args: { id: { type: GraphQLID }},
            resolve(parent: any, args: any) {
                let promise = SWVLNotification
                    .find({
                        'recievers.id': args.id,
                        'channel': 'app',
                        'status': NotificationStatus.SENDED
                    })
                    .select({channel: true, notification_object: true, created_at: true, recievers: true})
                    .limit(10)
                    .sort('-created_at')
                    .exec();

                    return promise.then((notifications: any) => {
                        return notifications.map( (notification: any) => {
                            const notificationHandler = NotificationFactory.GetNotificationHandler(notification.recievers, notification.notification_object.type, notification.channel, notification.notification_object.dependencies);
                            return{
                                content: notificationHandler.render(args.id),
                                created_at: notification.created_at + ""
                            }
                        }); 
                    })
                    .catch((err: any) => {
                        console.log(err);
                        return {
                            errors: [
                                err.message
                            ]
                        }
                    })
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        randomNotification: {
            type: NotificationObjectType,
            args: {
            },
            resolve(parent, args) {
                let notification = randomNotificationFactory.randomNotification();
                notification.type = notification.notification_object.type;
                return notification;
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});