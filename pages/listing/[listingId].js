import React from 'react'
import { useState, useEffect } from "react";
import {
  useContract,
  useNFTs,
  useNFT,
} from "@thirdweb-dev/react";
import usePrice from "../../utils/Price";
import { useRouter } from "next/router";
import Layout from '../../components/Layout';

const ListingPage = () => {

  const router = useRouter();
  const { query } = router

  const [price, setPrice] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [pending, setPending] = useState(false);
  const [img, setImg] = useState(null);

  const { contract } = useContract(process.env.REACT_APP_DROP_CONTRACT); // Contract address
 
  const listingId = query.listingId; // listing ID from URL
  const priceToken = usePrice(listingId); // get the price of the listing from the contract

  const { data: nft, isLoading, isSuccess } = useNFT(contract, listingId);
 
  useEffect(() => {
    if (nft?.metadata?.image) {
      const url = nft.metadata?.image?.replace("ipfs//", "https://nftstorage.link/ipfs/");
      setImg(url);
    }
  }, [isSuccess]);

  useEffect(() => { // set the price and the currency of the listing
    const getPrice = () => {
      if (priceToken) {
        let priceConverted = priceToken.map(data => (parseInt(data.price) * 10 ** -18)); // convert the price from hex to decimal
        let currency = priceToken.map(data => data.currencyMetadata.symbol); // get the currency of the listing
        setPrice(priceConverted);
        setCurrency(currency);
      } else {
        return "Loading...";
      }
    }
    getPrice();
  }, [listingId, priceToken]);

  const fetchCheckoutLink = async () => { // fetch the checkout link from the server
    setPending(true);
    const response = await fetch(`/api/checkout-link-intent?listingId=${listingId}&img=${img}`);
    const data = await response.json();
    window.open(data.checkoutLinkIntentUrl, "_blank");
    setPending(false);
  };

  return (
    <Layout>
      <div className="container flex flex-col lg:min-w-full lg:min-h-screen mx-auto lg:mt-auto mt-2 items-center justify-center lg:bg-gray-100">
        {!isLoading && nft ? (
          <div className="flex flex-col items-center justify-center lg:flex-row">
            <div className="flex flex-col items-center justify-center max-w-xs"> {/* NFT image in the left */}
             {img && <img src={img} alt="cover" /> }
            </div>
            <div className="flex flex-col items-center justify-center max-w-lg text-left ml-4"> {/* NFT info in the right */}
              <h1 className="text-2xl font-bold lg:text-3xl mt-2 lg:mt-0">{nft?.metadata?.name}</h1>
              <p className="text-sm lg:text-base font-normal tracking-wide mb-2">{nft?.metadata?.attributes && nft?.metadata?.attributes[0].value}</p>
              <p className="text-sm lg:text-lg mb-2">{nft?.metadata?.description}</p>
              <h2 className="font-bold mb-2">Price: {price} {currency}</h2>
              <div className="flex flex-col items-center justify-center align-middle mt-2"> {/* Buy button below*/}
                {!pending ? <button onClick={() => fetchCheckoutLink()} className="w-full bg-gradient-to-br from-orange-100 via-blue-700 to-indigo-400 hover:bg-blue-700 text-white font-bold py-2 px-11 mb-2 rounded">
                  Buy Now
                </button> :
                  <button className="bg-gradient-to-br from-orange-100 via-blue-700 to-indigo-400 animate-pulse text-white font-bold py-2 px-11 rounded mb-3">
                    Loading...
                  </button>}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Layout>
  )
}

export default ListingPage
