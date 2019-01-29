import express from 'express';
import BodyParser from 'body-parser';

export default function middleware(application : express.Application) {
    application.use(BodyParser.urlencoded({ extended: true }));
    application.use(BodyParser.json());
}