import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import middleware from './middleware';

import {createConnection} from "typeorm";

async function server() {

    await createConnection().catch(async error => {
        console.log(error + "failed to connect to the database")
        return;
    });

    let application : express.Application = express();
    middleware(application);
    routes(application);
    application.listen(3000);
    
}

server();