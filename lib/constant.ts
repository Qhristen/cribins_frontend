import { PublicKey } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

export const DEFAULT_SOL_ADDRESS: PublicKey = new PublicKey(
  // "3KcnXCoTi9KQTbjKUJxaoP965k9vcoQd2hSgQtMg8ZGA", // mainnet wallet
  'HLWr8VZ6rxLdfEvNrvGDLxv71YRntgCrmM5VD1gBkoPf' //devnet
);

export const DEFAULT_SOL_AMOUNT: number = 2.0;

export const NETWORK = WalletAdapterNetwork.Devnet;
