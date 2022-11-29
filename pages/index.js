import Head from 'next/head'
import { useContract, useNFTs } from '@thirdweb-dev/react';
import Card2 from '../components/Card2';
import Layout from '../components/Layout';

export default function Home() {

  const { contract } = useContract(process.env.REACT_APP_DROP_CONTRACT);
  const { data: nfts, isLoading } = useNFTs(contract, { start: 0, count: 100 });

  return (
    <Layout>
      <div className='grid grid-cols-1 gap-3 mt-1 lg:grid-cols-4 lg:gap-x-0'>
        {isLoading && <h1>Loading...</h1>}
        {nfts && nfts?.map((nfts, id) => {
          return (
            <div key={id}>
              <Card2 name={nfts.metadata.name} author={nfts.metadata.attributes} description={nfts.metadata.description} image={nfts.metadata.image} listingId={nfts.metadata.id} />
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
