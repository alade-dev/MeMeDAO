/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import {  useConnectUI, useIsConnected, useWallet as useFuelWallet } from "@fuels/react";

const WalletContext = createContext();

// eslint-disable-next-line react/prop-types
export const WalletProvider = ({ children }) => {
  const { connect, isConnecting } = useConnectUI();
  const { isConnected } = useIsConnected();
  const wallet = useFuelWallet();
  // const { balance } = useBalance();

  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    if (wallet) {
      setWalletAddress(wallet.address?.toString());
    } else {
      setWalletAddress(null);
    }
  }, [wallet]);

  const disconnect = () => {
    // Implement disconnect logic here if provided by Fuel wallet
    console.log("Disconnect functionality not implemented");
  };

  return (
    <WalletContext.Provider 
      value={{ 
        wallet, 
        isConnecting, 
        isConnected, 
        connect, 
        disconnect, 
        // balance, 
        walletAddress 
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);

// Custom hook to get a shortened version of the wallet address
export const useShortenedAddress = () => {
  const { walletAddress } = useWallet();
  if (!walletAddress) return '';
  return `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
};