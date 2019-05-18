import { Connectors } from "web3-react";
import TrezorApi from "trezor-connect";
import WalletConnectApi from "@walletconnect/web3-subprovider";
import FortmaticApi from "fortmatic";

const {
  InjectedConnector,
  NetworkOnlyConnector,
  TrezorConnector,
  LedgerConnector,
  WalletConnectConnector,
  FortmaticConnector,
  PortisConnector
} = Connectors;

const supportedNetworkURLs = {
  1: "https://mainnet.infura.io/v3/60ab76e16df54c808e50a79975b4779f",
  4: "https://rinkeby.infura.io/v3/60ab76e16df54c808e50a79975b4779f"
};

const defaultNetwork = 1;

const Injected = new InjectedConnector({
  supportedNetworks: [1, 4]
});

const Network = new NetworkOnlyConnector({
  providerURL: supportedNetworkURLs[1]
});

const Trezor = new TrezorConnector({
  api: TrezorApi,
  supportedNetworkURLs,
  defaultNetwork,
  manifestEmail: "noahwz@gmail.com",
  manifestAppUrl: "https://codesandbox.io/s/6v5nrq2nqw"
});

const Ledger = new LedgerConnector({
  supportedNetworkURLs,
  defaultNetwork
});

const WalletConnect = new WalletConnectConnector({
  api: WalletConnectApi,
  bridge: "https://bridge.walletconnect.org",
  supportedNetworkURLs,
  defaultNetwork
});

const Fortmatic = new FortmaticConnector({
  api: FortmaticApi,
  apiKey: "pk_live_F95FEECB1BE324B5",
  logoutOnDeactivation: false
});

export default {
  Injected,
  Network,
  Trezor,
  Ledger,
  WalletConnect,
  Fortmatic,
};
