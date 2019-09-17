import SMSWelcomeNotification from "./notifications/SMSWelcomeNotification";
import SMSStopIsNearNotification from "./notifications/SMSStopIsNearNotification";
import AppWelcomeNotification from "./notifications/AppWelcomeNotification";
import EmailWelcomeNotification from './notifications/EmailWelcomeNotification'
import AppStopIsNearNotification from "./notifications/AppStopIsNearNotification";
import EmailStopIsNearNotification from "./notifications/EmailStopIsNearNotification";

const NotificationFactories = {
    welcome: {
        sms: SMSWelcomeNotification,
        app: AppWelcomeNotification,
        email: EmailWelcomeNotification
    },
    stop_is_near: {
        sms: SMSStopIsNearNotification,
        app: AppStopIsNearNotification,
        email: EmailStopIsNearNotification
    }
}

export default NotificationFactories;