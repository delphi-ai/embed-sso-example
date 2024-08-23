"use client";

import Script from "next/script";

export default function Embed() {

  const embed_id = process.env.NEXT_PUBLIC_EMBED_ID

  console.log(embed_id)

  return (
    <>
      <Script
        id="delphi-script"
        dangerouslySetInnerHTML={{
          __html: `window.delphi = { config: "${embed_id}", type: "page", container: { width: "100%", height: "800px", }, };`,
        }}
      />

      <Script
        id="test"
        dangerouslySetInnerHTML={{
          __html: `!function(){var e=window,t=document,n=function(){if(!e.delphi||"page"!==e.delphi.type&&"bubble"!==e.delphi.type)throw new Error("Invalid or missing delphi type. Must be 'page' or 'bubble'.");var n=t.createElement("script");n.type="text/javascript",n.async=!0,n.defer=!0,n.src="page"===e.delphi.type?"https://embed.delphi.ai/bundle.js":"https://embed.delphi.ai/widget.js",e.delphi&&e.delphi.config&&n.setAttribute("data-config",e.delphi.config);var i=t.getElementById("delphi-script");if(!i)throw new Error("Script tag with id 'delphi-script' not found.");i.parentNode.insertBefore(n,i)};"complete"===t.readyState?n():e.attachEvent?e.attachEvent("onload",n):e.addEventListener("load",n,!1)}();`,
        }}
      />
    </>
  );
}
