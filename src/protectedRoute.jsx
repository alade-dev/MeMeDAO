/* eslint-disable react/prop-types */
import { useWallet } from "./context/WalletProvider.jsx";
import ConnectWalletModal from "./components/ConnectWalletModal.jsx";

const ProtectedRoute = ({ children }) => {
  const { isConnected, wallet } = useWallet();

  if (!isConnected || !wallet) {
    return <ConnectWalletModal />;
  }

  return children;
};

export default ProtectedRoute;