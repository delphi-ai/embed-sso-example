"use client";

import { useEffect, useRef, useState } from "react";
import { signDemoVisitorToken } from "@/lib/api/login";
import { DELPHI_ORIGIN } from "@/lib/delphi";

const buttonStyle = {
  backgroundColor: "#111",
  color: "white",
  fontWeight: 600,
  padding: "8px 16px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
};

export default function SsoControls() {
  const tokenRef = useRef<string | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // The embed can load after the visitor signs in (the bubble creates its frame
  // lazily), so re-send the token whenever it reports it's ready.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== DELPHI_ORIGIN || event.data?.type !== "delphi:ready") return;
      if (tokenRef.current) window.Delphi?.login(tokenRef.current);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const signIn = async () => {
    setError(null);
    try {
      const token = await signDemoVisitorToken();
      tokenRef.current = token;
      window.Delphi?.login(token);
      setSignedIn(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not sign the token");
    }
  };

  const signOut = () => {
    tokenRef.current = null;
    window.Delphi?.logout();
    setSignedIn(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
      {signedIn ? (
        <button style={buttonStyle} onClick={signOut}>
          Sign out
        </button>
      ) : (
        <button style={buttonStyle} onClick={() => void signIn()}>
          Sign in as Jane Doe
        </button>
      )}
      {error ? <p style={{ color: "#b91c1c" }}>{error}</p> : null}
    </div>
  );
}
