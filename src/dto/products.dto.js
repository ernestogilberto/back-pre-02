class ProductsDto {
    constructor(products, limit, page, query, sort) {
        this.payload = products.docs.map(product => product.toObject())
        this.totalPages = products.totalPages
        this.prevPage = products.prevPage
        this.nextPage = products.nextPage
        this.page = page
        this.hasPrevPage = products.hasPrevPage
        this.hasNextPage = products.hasNextPage
        this.prevLink = products.hasPrevPage ? `/?limit=${limit}&page=${products.prevPage}&query=${JSON.stringify(query)}&sort=${JSON.stringify(sort)}` : null
        this.nextLink = products.hasNextPage ? `/?limit=${limit}&page=${products.nextPage}&query=${JSON.stringify(query)}&sort=${JSON.stringify(sort)}` : null
        this.total = products.totalDocs
        this.limit = limit
    }
}

export default ProductsDto;