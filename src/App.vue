<template>
  <div v-if="isActivated">
    <div>Wallet Address {{ address }}</div>

    <div>Account Balance: {{ accountBalance }} Ether</div>

    <input
      type="text"
      placeholder="請輸入存款金額 (ETH)"
      v-model="depositAmount"
    />
    <button @click="onclickdeposit">存款</button>

    <div>
      <input
        type="text"
        placeholder="請輸入提款金額 (ETH)"
        v-model="withdrawAmount"
      />
      <button @click="onclickWithdraw">提款</button>
    </div>
  </div>
  <div v-else>
    <el-button @click="open">Connect Wallet</el-button>
    <vd-board :connectors="connectors" />
  </div>
</template>

<script>
import {
  MetaMaskConnector,
  useBoard,
  useEthers,
  useEthersHooks,
} from "vue-dapp";
import { useContract } from "./composables/useContract";
import { ref } from "vue";

export default {
  name: "App",
  components: {},
  setup() {
    const { open } = useBoard();
    const connectors = [new MetaMaskConnector({})];

    const { address, isActivated } = useEthers();
    const { onActivated } = useEthersHooks();
    const {
      callContractValues,
      accountBalance,
      depositFunction,
      withdrawFunction,
    } = useContract();

    onActivated(function () {
      callContractValues();
    });

    const depositAmount = ref();
    const withdrawAmount = ref();
    async function onclickdeposit() {
      await depositFunction(depositAmount.value);
      depositAmount.value = "";
      await callContractValues();
    }

    async function onclickWithdraw() {
      await withdrawFunction(withdrawAmount.value);
      withdrawAmount.value = "";
      await callContractValues();
    }

    return {
      open,
      connectors,
      address,
      isActivated,
      accountBalance,
      depositAmount,
      withdrawAmount,
      onclickdeposit,
      onclickWithdraw,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>