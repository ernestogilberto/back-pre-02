import {faker} from '@faker-js/faker';

export const fakeProduct = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnailUrl: faker.image.urlLoremFlickr({ category: 'food', width: 200, height: 200}),
        code: faker.string.alphanumeric(8),
        stock: faker.string.numeric(),
        status: faker.datatype.boolean(),
        category: faker.commerce.department(),
        country: faker.location.country(),
        volume: faker.string.numeric(),
        alcohol: faker.string.numeric(),
        brand: faker.company.name(),
        style: faker.commerce.productAdjective()
    }
}