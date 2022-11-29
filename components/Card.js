import React from 'react';
import DropdownMenu from './DropdownMenu';

const Card = ({image, ...props}) => {

    let url = "";
    url = image?.replace("ipfs//", "https://nftstorage.link/ipfs/");

    let external_url = "";
    external_url = props?.external_url?.replace("ipfs//", "https://nftstorage.link/ipfs/");

    return (
        <div className="flex justify-center relative m-2">
            <div className="rounded-lg shadow-lg bg-white max-w-xs max-h-xs">
                <a href={external_url} rel="external">
                    <img className="rounded-t-lg" src={url} alt="cover"/>
                </a>
                <div className="relative p-5 block">
                    <h5 className="text-gray-900 text-xl font-medium mb-0">{props.name}</h5>
                    <p className="text-gray-700 text-sm font-medium tracking-wide mb-0">{props.author[0].value}</p>
                    {/* <p className="text-gray-700 text-base mb-4 line-clamp-4">
                        {props.description}
                    </p> */}
                    <DropdownMenu tokenId={props?.tokenId}/> 
                </div>
            </div>
        </div>
    )
}

export default Card;