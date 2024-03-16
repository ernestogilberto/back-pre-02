import jwt from 'jsonwebtoken';

const privateKey = 'CoderHouseSecretKey';

const generateToken = (user) => {
    return jwt.sign(user, privateKey, {expiresIn: '1h'});
}

export default generateToken;