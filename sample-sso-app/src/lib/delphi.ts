export const DELPHI_ORIGIN = process.env.NEXT_PUBLIC_DELPHI_ORIGIN ?? "https://www.delphi.ai";

interface DelphiEmbedApi {
  open: () => void;
  close: () => void;
  destroy: () => void;
  login: (token: string) => void;
  logout: () => void;
}

declare global {
  interface Window {
    Delphi?: DelphiEmbedApi;
  }
}
