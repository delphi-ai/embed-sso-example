"use server"

import { importPKCS8, SignJWT } from 'jose';

// SECURITY NOTE:
// This example generates a token for a hardcoded user (john@doe.com).
// In a production environment, you MUST:
// 1. Implement proper user authentication before generating the token.
// 2. Use the authenticated user's actual email address in the token payload.

export async function loginJohnDoe() {
  // SECURITY: Ensure the private key is stored securely and not exposed
  const privateKey = process.env.DELPHI_PRIVATE_SSO_KEY;

  if (!privateKey) {
    throw new Error('Private key is not set in environment variables');
  }

  const alg = 'RS256';
  const pkcs8Key = await importPKCS8(privateKey, alg);

  // SECURITY: In a real-world scenario, you must authenticate the user here
  // before generating the token. This example uses a hardcoded email for demonstration purposes only.
  
  // IMPORTANT: Your authentication logic should go here.
  // Verify the user's credentials and retrieve their email address securely.
  // const userEmail = await authenticateUser(username, password);

  const userEmail = "john@doe.com"
  
  const token = await new SignJWT({ email: userEmail })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(pkcs8Key);

  return token;
}