import {Schema, model} from 'mongoose';

const BYTE_CAP = 10000000000;
const userSchema = new Schema({
    id: { type: String, index: true },
    name: String,
    phone: String,
    email: String,
    notificationToken: String,
    preferredLanguage: String
});

const notificationObjectSchema = new Schema({
    type: { type: String, index: true },
    dependencies: Object
});

const notificationSchema = new Schema({
    channel: String,
    created_at: { type: Number, index: true },
    recievers: [userSchema],
    notification_object: notificationObjectSchema,
    status: { type: Number, index: true }
},
{
    capped: BYTE_CAP
}
);

export default model('Notification', notificationSchema);