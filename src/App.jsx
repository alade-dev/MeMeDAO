import AppRoutes from "./AppRoutes";
import NavBar from "./components/Navbar";
// import { WalletProvider } from "./wallet-context";
import { WalletProvider } from "./context/WalletProvider";

function App() {
  return (
    <>
      <WalletProvider>
        <NavBar />
        <AppRoutes />
      </WalletProvider>
    </>
  );
}

export default App;
