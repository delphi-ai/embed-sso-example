import Embed from "./_components/embed";
import SsoControls from "./_components/sso-controls";

export default function Home() {
  return (
    <main style={{ maxWidth: 640, margin: "64px auto", padding: "0 24px", fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 24, fontWeight: 600 }}>Delphi embed SSO sample</h1>
      <p style={{ margin: "12px 0 24px", color: "#555" }}>
        Sign in as the demo visitor, then open the chat bubble. The embed recognizes the visitor
        from the token this app signs on the server.
      </p>
      <SsoControls />
      <Embed />
    </main>
  );
}
