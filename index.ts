import 'dotenv/config';
import {ethers} from 'hardhat';
import '@nomiclabs/hardhat-ethers';
import {address, abi} from './deployments/rinkeby/CryptOrchidERC721.json';
import fetch from 'node-fetch';

import {request, gql} from 'graphql-request';
import {Contract} from 'hardhat/internal/hardhat-network/stack-traces/model';
import {CryptOrchidERC721} from './typechain';
import { BigNumber } from 'ethers';

const query = gql`
  {
    cryptOrchids(
      first: 25
      orderBy: plantedAt
      orderDirection: asc
      where: {growthStage: FLOWERING}
    ) {
      id
      tokenId
      owner
      latinSpeciesName
      plantedAt
      growthStage
    }
  }
`;

async function checkHeartbeat(
  tokenId: BigNumber,
  contract: CryptOrchidERC721,
  nonce: number
) {
  return contract.heartbeat(tokenId, {
    nonce,
  });
}

async function main() {
  const accounts = await ethers.getSigners();
  const CryptOrchidsContract = await ethers.getContractAt(
    abi,
    address,
    accounts[0]
  );

  // Sorry OpenSea 🤷‍♂️
  // This updates metadata for all of our tokens every night
  for (let token = 1; token <= 10; token++) {
    try {
      fetch(`https://api.opensea.io/api/v1/asset/${process.env.CRYPTORCHIDS_CONTRACT_ADDRESS}/${token}/?force_update=true`)
    } catch {
      break
    }
  }

  const baseNonce = ethers.provider.getTransactionCount(accounts[0].address);
  let nonceOffset = 0;
  const getNonce = () => baseNonce.then((nonce) => nonce + nonceOffset++);

  // This allows our Graph Protocol index to stay up to date by
  // calling a contract function that emits a Killed(tokenId)
  // event if the plant has died. Will cost some gas
  return request(
    'https://api.thegraph.com/subgraphs/name/sbauch/crypt-orchids',
    query
  ).then((data) => {
    return Promise.all(
      data?.cryptOrchids?.map(({tokenId} : { tokenId: BigNumber}) => (
        getNonce().then((nonce) => (
          checkHeartbeat(
            tokenId,
            CryptOrchidsContract as CryptOrchidERC721,
            nonce
          )
        ))
      ))
    );
  });
}

main()
  .then((result) => {
    console.log(result);
    return process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
