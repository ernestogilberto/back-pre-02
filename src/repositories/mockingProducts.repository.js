import {fakeProduct} from '../utils/faker.js';

class MockingProductsRepository {
    async getProducts() {

        const products = [];
        for (let i = 0; i < 100; i++) {
            products.push(fakeProduct());
        }

        return products;
    }
}


export default MockingProductsRepository;