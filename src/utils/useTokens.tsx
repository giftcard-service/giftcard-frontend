import { useState } from "react";

interface TokensInterface {
  access_token: string | null;
}

export default function useTokens(): { setTokens: Function; tokens: TokensInterface; isLoggedIn: boolean } {
  const getTokens = (): TokensInterface => {
    const tokensString = localStorage.getItem("tokens");
    if (!tokensString) {
      return { access_token: null };
    }

    const userTokens = JSON.parse(tokensString);
    return { access_token: userTokens?.access_token || null };
  };

  const [tokens, setTokens] = useState(getTokens());

  const isLoggedIn = ((): boolean => {
    return tokens.access_token ? true : false;
  })();

  function saveTokens(tokens: any) {
    localStorage.setItem("tokens", JSON.stringify(tokens));
    setTokens(tokens);
  }

  return {
    setTokens: saveTokens,
    tokens,
    isLoggedIn,
  };
}
