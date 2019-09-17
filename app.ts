import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema/schema';
import mongoose from 'mongoose';
import i18n from 'i18n';
import NotificationService from "./NotificationService";

i18n.configure({
    locales: ['en', 'de'],
    directory: __dirname + '/locales'
});

const app = express();
mongoose.connect('mongodb://root:secret@localhost:27017/lol?authSource=admin');

const nofificationService = new NotificationService();
nofificationService.init();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(3000, () => {
    console.log('Listening on port 3000');
}); 