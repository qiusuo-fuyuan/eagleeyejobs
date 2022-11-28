import jwt from 'jsonwebtoken';

export function generateJwtToken(userId: string): string {
    return jwt.sign({userId: userId}, process.env.JWT_TOKEN_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRE_IN });
}


export function decodeJwtToken(jwtToken: string): string {
    return  jwt.decode(jwtToken) as string
}