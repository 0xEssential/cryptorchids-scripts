/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { CurrentTime } from "../CurrentTime";

export class CurrentTime__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<CurrentTime> {
    return super.deploy(overrides || {}) as Promise<CurrentTime>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): CurrentTime {
    return super.attach(address) as CurrentTime;
  }
  connect(signer: Signer): CurrentTime__factory {
    return super.connect(signer) as CurrentTime__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CurrentTime {
    return new Contract(address, _abi, signerOrProvider) as CurrentTime;
  }
}

const _abi = [
  {
    inputs: [],
    name: "currentTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "s",
        type: "uint256",
      },
    ],
    name: "timeTravel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526000805534801561001457600080fd5b5060c9806100236000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80637bd6f130146037578063d18e81b3146062575b600080fd5b606060048036036020811015604b57600080fd5b8101908080359060200190929190505050607e565b005b60686088565b6040518082815260200191505060405180910390f35b8060008190555050565b60008054420190509056fea2646970667358221220fcbc4fe732c24b6b7f449054790e7077471a41b3f801f36486db340fd9294b9864736f6c63430006060033";
