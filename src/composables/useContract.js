import { ref } from "vue";
import { Contract, ethers } from "ethers";
import { useMulticall, useEthers } from "vue-dapp";

const contractABI = [
  {
    stateMutability: "payable",
    type: "fallback"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "accountBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    stateMutability: "payable",
    type: "receive"
  }
];
const contractAddress = "0xC304c08C80F3825B1A71FA815974AA8dD1Eb818D";

export function useContract() {
  const accountBalance = ref();
  const { address, provider, signer } = useEthers();
  // const contract = new Contract(contractAddress, contractABI, provider.value);

  async function callContractValues() {
    const { call, results } = useMulticall(provider.value);

    await call([
      {
        interface: contractABI,
        address: contractAddress,
        method: "accountBalance",
        args: [address.value]
      }
    ]);

    const [[_accountBalance]] = results.value;
    accountBalance.value = ethers.utils.formatEther(_accountBalance);
  }

  async function depositFunction(amount) {
    const contract = new Contract(contractAddress, contractABI, provider.value);
    const tx = await contract
      .connect(signer.value)
      .deposit({ value: ethers.utils.parseEther(amount) });
    await tx.wait();
  }

  async function withdrawFunction(amount) {
    const contract = new Contract(contractAddress, contractABI, provider.value);
    const tx = await contract
      .connect(signer.value)
      .withdraw(ethers.utils.parseEther(amount));
    await tx.wait();
  }

  async function setIncrementFunction() {
    const contract = new Contract(contractAddress, contractABI, provider.value);
    const tx = await contract.connect(signer.value).setIncrement();
    await tx.wait();
  }

  return {
    callContractValues,
    accountBalance,
    depositFunction,
    withdrawFunction,
    setIncrementFunction
  };
}
