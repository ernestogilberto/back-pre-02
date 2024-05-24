import {__dirname} from '../utils/dirname-path.js';

const swaggerConfig = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "E-commerce API",
            description: "API para una tienda en linea",
            version: "1.0.0"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
};

export default swaggerConfig