import React from 'react'
import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import Card from '../components/Card';
import Layout from '../components/Layout';

const MyBooks = () => {
    const { address, isConnected } = useAccount();

    const fetchNFT = async () => {
        const res = await fetch(`/api/get-my-books?address=${address}`, {
            "method": "GET",
        }
        )
        return res.json();
    };
    
    const { isLoading, data } = useQuery(['nfts'], fetchNFT, { enabled: isConnected });

    return (
        <Layout>
            <div className='grid grid-cols-1 gap-y-3 gap-x-0 mt-1 lg:grid-cols-4'>
                {isConnected && isLoading ? <h1>Loading your books...</h1> : data?.nfts?.map((nft, id) => {
                    return (
                        <div key={id}>
                            <Card name={nft?.metadata?.name} description={nft?.metadata?.description} image={nft?.metadata?.image} external_url={nft?.metadata?.external_url} tokenId={nft?.token_id} author={nft?.metadata?.attributes} />
                        </div>
                    )
                })}
                {!isConnected && <div className='flex m-auto justify-center item-center leading-none text-lg font-extrabold text-gray-900 md:text-3xl md:ml-2 md:absolute md:mt-2 lg:text-4xl'>It's very quiet round here...</div>}
            </div>
        </Layout>
    )
}

export default MyBooks
