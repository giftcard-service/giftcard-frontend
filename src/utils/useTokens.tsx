import { useState } from "react";

export interface TokensInterface {
  userId: string;
  access_token: string;
}

export interface UserProfileInterface {
  id: string;
  username: string;
  isManager: boolean;
  store?: {
    id: string;
    name: string;
  };
}

export default function useTokens(): { setTokens: Function; tokens: TokensInterface; isLoggedIn: boolean } {
  const getTokens = (): TokensInterface => {
    const tokensString = localStorage.getItem("tokens");

    const ret = { userId: "", access_token: "" };
    if (tokensString) {
      const userTokens = JSON.parse(tokensString);
      ret.userId = userTokens.userId;
      ret.access_token = userTokens.access_token;
    }

    return ret;
  };

  const [tokens, setTokens] = useState(getTokens());

  const isLoggedIn = ((): boolean => {
    return tokens && tokens.access_token ? true : false;
  })();

  function saveTokens(tokens: TokensInterface) {
    if (tokens) {
      localStorage.setItem("tokens", JSON.stringify(tokens));
      setTokens(tokens);
    }
  }

  return {
    setTokens: saveTokens,
    tokens,
    isLoggedIn,
  };
}
