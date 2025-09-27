import jwt from 'jsonwebtoken';
import { type PayLoad } from './types.js';


// functions for generate jwt tokens
const jwtTokens = {

    generateAccessToken: (payload: PayLoad) => {
        const accessTokenSecretKey: string = process.env.ACCESS_JWT_TOKEN_SECRET_KEY || "my_screte_key_asldfhasodfbn987yighbjnr4wefd7yguiahkbnrt0gr9ehbvnqpaiuoyhrv63524wrvet8h754gsg585r4v845186w4t8sfd1s"
        return jwt.sign(payload, accessTokenSecretKey, {
            expiresIn: '2m',
        })
    },
    generateRefreshToken: (payload: PayLoad) => {
        const refreshTokenSecretKey: string = process.env.REFRESH_JWT_TOKEN_SECRET_KEY || "myasdhfu87asdgf@#89isudfhb98(*7Iihasdf7&b3jbkjsdf&*^%";
        return jwt.sign(payload, refreshTokenSecretKey, {
            expiresIn: '24h'
        })
    }
}

export default jwtTokens;