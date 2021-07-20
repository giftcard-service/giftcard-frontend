import axios from "axios";

import { API_V1_URL } from "../utils/constants";
import { gcs } from "../utils/types";
import { jsonAuthHeaders } from "./headers";

const findStoreList = async ({
  tokens,
  query,
}: {
  tokens: gcs.TokensInterface;
  query: { name: string };
}): Promise<gcs.PaginationResponseInterface> =>
  await axios
    .get(API_V1_URL + "/stores", {
      params: { name: query.name },
      headers: jsonAuthHeaders(tokens.access_token),
    })
    .then((res) => res.data);

export { findStoreList };