import "./App.css";
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "./config/wagmiConfig";

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <div>Testing</div>
    </WagmiConfig>
  );
}

export default App;
