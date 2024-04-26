import {ProductModel} from '../models/products.model.js';
import ProductsDto from '../dto/products.dto.js';

class ViewsRepository {

    async getProducts(req) {
        let {limit, query, sort, page} = req;
        limit = limit ? parseInt(limit) : 10;
        page = page ? parseInt(page) : 1;
        query = query ? JSON.parse(query) : {};
        sort = sort ? JSON.parse(sort) : {};
        try {
            const products = await ProductModel.paginate(query, {limit, sort, page});
            return new ProductsDto(products, limit, page, query, sort);
        } catch (error) {
            throw new Error(`Error getting products: ${error.message}`);
        }
    }

    async getRealTimeProducts(req) {
        let {limit, query, sort, page} = req;
        limit = limit ? parseInt(limit) : 10;
        page = page ? parseInt(page) : 1;
        query = query ? JSON.parse(query) : {};
        sort = sort ? JSON.parse(sort) : {};
        try {
            const products = await ProductModel.paginate(query, {limit, sort, page});
            return new ProductsDto(products, limit, page, query, sort);
        } catch (error) {
            throw new Error(`Error getting products: ${error.message}`);
        }
    }
}

export default ViewsRepository;