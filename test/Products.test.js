import * as chai from 'chai';
import mocha from 'mocha';
import supertest from 'supertest';
import ProductsController from '../src/controllers/products.controller.js';

const controller = new ProductsController();

const {describe, it} = mocha;
const {expect} = chai;
const request = supertest('http://localhost:8080/api/products');

describe('Products Controller', () => {
    it('should get all products', async () => {
        const response = await request.get('/');
        expect(response.status).to.equal(200);
    });

    it('should get a products array', async () => {
        const response = await request.get('/');
        expect(response.body.payload).to.be.an('array');
    });

    it('should get a product by id', async () => {
        const response = await request.get('/661ddfda87f12280355802eb');
        expect(response.status).to.equal(200);
    });

    it('should get a product by id', async () => {
        const response = await request.get('/661ddfda87f12280355802eb');
        expect(response.body).to.be.an('object');
    });

    it('should get a product by id', async () => {
        const response = await request.get('/1');
        expect(response.status).to.equal(500);
    });

});
