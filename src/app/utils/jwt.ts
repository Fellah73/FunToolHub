import { jwtVerify } from "jose";
export interface TokenType {
  name: string;
  value: string;
}
export const verifyToken = async (token: TokenType) => {
  try {
    const secret = new TextEncoder().encode(process.env?.AUTH_SECRET_KEY!);
    const { payload } = await jwtVerify(token.value, secret);
    return payload;
  } catch (error) {
    console.log("Token verification failed", error);
    return null;
  }
};
