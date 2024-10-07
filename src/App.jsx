import AppRoutes from "./AppRoutes";
import Footer from "./components/Footer";
import NavBar from "./components/Navbar";
// import { WalletProvider } from "./wallet-context";
import { WalletProvider } from "./context/WalletProvider";

function App() {
  return (
    <>
      <WalletProvider>
        <NavBar />
        <AppRoutes />
        <Footer/>
      </WalletProvider>
    </>
  );
}

export default App;
