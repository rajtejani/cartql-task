import {
  UrqlProvider,
  ssrExchange,
  cacheExchange,
  fetchExchange,
  createClient,
} from "@urql/next";

const ssr = ssrExchange({
  isClient: typeof window !== "undefined",
});
const client = createClient({
  url: "https://api.cartql.com",
  exchanges: [cacheExchange, ssr, fetchExchange],
  suspense: true,
});

export { ssr, client };
