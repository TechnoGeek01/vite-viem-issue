import { configureChains, createConfig } from "wagmi";
import { polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { InjectedConnector } from "wagmi/connectors/injected";
import { createPublicClient, http } from "viem";

const { chains, webSocketPublicClient } = configureChains(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [polygon],
  [publicProvider(), alchemyProvider({ apiKey: "" })]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: polygon,
    transport: http(),
  }),
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,

      options: {
        appName: "wagmi",
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "okxwallet",
        shimDisconnect: true,
        getProvider: () =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          typeof window !== "undefined" ? (window as any).okxwallet : undefined,
      },
    }),
  ],
  webSocketPublicClient,
});
