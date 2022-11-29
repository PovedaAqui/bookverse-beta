import '../styles/globals.css'
import {
  WagmiConfig,
  createClient,
  configureChains,
  useSigner,
  chain
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { ConnectKitProvider } from "connectkit";
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Buffer } from "buffer";
import { ChainId, ThirdwebSDKProvider } from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


if (typeof window === undefined && !window.Buffer) window.Buffer = Buffer;
const queryClient = new QueryClient();

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygon],
  [alchemyProvider({ apiKey: `${process.env.REACT_APP_ALCHEMY_KEY}`, priority: 0 })],
  [publicProvider({ priority: 1 })],
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

function ThirdwebProvider({ wagmiClient, children }) {
  const { data: signer } = useSigner();

  return (
    <ThirdwebSDKProvider
      desiredChainId={ChainId.Polygon}
      signer={signer}
      provider={wagmiClient.provider}
      queryClient={wagmiClient.queryClient}
      sdkOptions={{
        gasless: {
          openzeppelin: {
            relayerUrl: process.env.REACT_APP_WEBHOOK_URL,
          },
        },
      }}
    >
      {children}
    </ThirdwebSDKProvider>
  );
}


function MyApp({ Component, pageProps }) {

  // const { children, ...rest } = pageProps;
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <ThirdwebProvider wagmiClient={client}>
          <QueryClientProvider client={queryClient} contextSharing={true}>
              <Component {...pageProps} />
          </QueryClientProvider>
        </ThirdwebProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
