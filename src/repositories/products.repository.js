import {ProductModel} from '../models/products.model.js';
import ProductsDto from '../dto/products.dto.js';

class ProductsRepository {

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

    async getProductById(id) {
        try {
            return await ProductModel.findById(id);
        } catch (error) {
            throw new Error(`Error getting product: ${error.message}`);
        }
    }

    async addProduct(product) {
        try {
            const newProduct = new ProductModel(product);
            await newProduct.save();
            return `Product added successfully with id ${newProduct._id}`
        } catch (error) {
            throw new Error(`Error adding product: ${error.message}`);
        }
    }

    async updateById(id, product) {
        try {
            await ProductModel.findByIdAndUpdate(id, product);
            return `Product updated successfully with id ${id}`;
        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }

    async deleteById(id) {
        try {
            await ProductModel.findByIdAndDelete(id);
            return `Product deleted successfully with id ${id}`;
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }
}

export default ProductsRepository;