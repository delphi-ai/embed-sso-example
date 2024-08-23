"use client"

import { loginJohnDoe } from "@/lib/api/login";

export default function LoginButton() {
  const handleLogin = async () => {
    try {
      // Attempt to login and retrieve an SSO token
      const token = await loginJohnDoe();
      
      // Find the Delphi iframe in the DOM
      const delphiFrame = document.getElementById('delphi-frame') as HTMLIFrameElement | null;
      
      if (delphiFrame && delphiFrame.contentWindow) {
        // Send the SSO token to the Delphi iframe
        delphiFrame.contentWindow.postMessage({
          type: 'sso_login',
          token: token
        }, '*');
        // NOTE: In production, replace '*' with the specific origin of your Delphi instance
      } else {
        console.error('Delphi frame not found');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <button
      style={{
        backgroundColor: "#3490dc",
        color: "white",
        fontWeight: "bold",
        padding: "8px 16px",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
      }}
      onClick={handleLogin}
    >
      Login As John Doe
    </button>
  );
}