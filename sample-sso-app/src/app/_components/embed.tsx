import Script from "next/script";
import { DELPHI_ORIGIN } from "@/lib/delphi";

export default function Embed() {
  return (
    <Script
      src={`${DELPHI_ORIGIN}/embed.js`}
      data-channel={process.env.NEXT_PUBLIC_DELPHI_EMBED_ID}
      data-mode="bubble"
      data-position="bottom-right"
    />
  );
}
