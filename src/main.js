import { createApp } from "vue";
import { VueDapp } from "vue-dapp";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import { ethers } from "ethers";

const rinkebyChainId = 4;

const app = createApp(App);
app.use(VueDapp, {
  [rinkebyChainId]: {
    chainId: ethers.utils.hexValue(rinkebyChainId),
    blockExplorerUrls: ["https://rinkeby.etherscan.io"],
    chainName: "Rinkeby",
    rpcUrls: [
      "https://eth-rinkeby.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC"
    ],
    nativeCurrency: { name: "Rinkeby Ether", symbol: "ETH", decimals: 18 }
  }
});
app.use(ElementPlus);
app.mount("#app");
