# Sample SSO app

A Next.js app that signs a demo visitor into a Delphi embed with
[Custom JWT](../README.md#custom-jwt) SSO.

- [`src/app/_components/embed.tsx`](src/app/_components/embed.tsx) installs the
  embed with `embed.js` as a chat bubble.
- [`src/lib/api/login.ts`](src/lib/api/login.ts) is a server action that signs an
  RS256 JWT with `sub`, `email`, and `name`.
- [`src/app/_components/sso-controls.tsx`](src/app/_components/sso-controls.tsx)
  calls `window.Delphi.login(token)` and `window.Delphi.logout()`, and re-sends
  the token when the embed posts `delphi:ready`.

## Run it

1. On your embed's **Identity** tab in Delphi, choose **Custom JWT**, turn on
   **Enable SSO**, and click **Generate Key Pair**. Keep the downloaded
   `delphi-embed-private-key.pem`.
2. Add `http://localhost:3000` to the embed's allowed origins on the
   **Configuration** tab.
3. Copy `.env.template` to `.env.local`. Set `NEXT_PUBLIC_DELPHI_EMBED_ID` to the
   embed ID and `DELPHI_PRIVATE_SSO_KEY` to the contents of the private key file.
4. Install and start:

   ```bash
   npm install
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000), click **Sign in as Jane
   Doe**, then open the chat bubble. Jane Doe appears in your Delphi inbox when
   she sends a message.
