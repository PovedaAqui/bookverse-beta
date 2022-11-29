import React from 'react';
import aggregatorV3Interface from './AggregatorV3Interface.json';
import { useContractRead } from 'wagmi';

//Custom hook to get MATIC/USD price from Chainlink

const useDataFeed = () => {
    return useContractRead({
        addressOrName: '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0',
        contractInterface: aggregatorV3Interface,
        functionName: 'latestRoundData',
      })
}

export default useDataFeed;