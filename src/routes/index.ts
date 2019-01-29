import express from 'express';
import index from '../controllers';
import { categories, category } from '../controllers/categories';
import { products, product } from '../controllers/products';

export default function init(application : express.Application) {

    application.get("/", async (request, response) => {
        await index(request, response);
    });

    application.get("/categories", async (request, response) => {
        await categories(request, response);
    });

    application.get("/categories/:id", async (request, response) => {
        await category(request, response);
    });

    application.get("/products", async (request, response) => {
        await products(request, response);
    });

    application.get("/products/:id", async (request, response) => {
        await product(request, response);
    });

}