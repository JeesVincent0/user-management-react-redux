import { type PayLoad } from './types.js';
declare const jwtTokens: {
    generateAccessToken: (payload: PayLoad) => string;
    generateRefreshToken: (payload: PayLoad) => string;
};
export default jwtTokens;
//# sourceMappingURL=jwt.d.ts.map