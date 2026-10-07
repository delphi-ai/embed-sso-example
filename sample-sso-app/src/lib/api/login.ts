"use server";

import { importPKCS8, SignJWT } from "jose";

// SECURITY: This demo signs a token for a hardcoded visitor. In your app, sign
// tokens only for the visitor your own auth has already verified, and use their
// real, stable user ID as `sub`.
const demoVisitor = {
  id: "demo-visitor-1",
  email: "jane@example.com",
  name: "Jane Doe",
};

export async function signDemoVisitorToken(): Promise<string> {
  const pem = process.env.DELPHI_PRIVATE_SSO_KEY;
  if (!pem) {
    throw new Error("DELPHI_PRIVATE_SSO_KEY is not set");
  }

  const privateKey = await importPKCS8(pem, "RS256");

  return new SignJWT({ email: demoVisitor.email, name: demoVisitor.name })
    .setProtectedHeader({ alg: "RS256" })
    .setSubject(demoVisitor.id)
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(privateKey);
}
