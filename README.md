# notification service

## Run Application 
Run Service by using docker compose up

## Use Application 
open http://localhost:3000/graphql 
through this you can check service 
there query to get user lastet notifications
and mutation to create random notification

### Add random notification
this mutation will add notification to our mongodb then 
our notification service which listen to mongodb collection will fetch it 
and send notification you can check this through docker logs
```
mutation {
  randomNotification{
    id
    channel,
    type,
    status,
    recievers{
      id
      name
      phone
      email
      preferredLanguage
    }
  }
}

```
### Get User notifications
this guery will list latest 10 notification sended by our service
```
query {
  notifications(id: "eccb648d-18f2-4ec5-8814-dbcec3011d04"){
    content
    created_at
  }
}
```

## Schema design 
now we only support to notification types "welcome" and "stop_is_near" 
but you can add new notification type easily by this steps
1) add new class which extend BaseNotification class and implements Notification Interface
2) add class to NotificationFactories file to be able to resolve it dynamiclly 

