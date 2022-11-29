import { ConnectKitButton } from "connectkit";

export const ConnectWallet = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address, truncatedAddress, ensName }) => {
        return (
          <div onClick={show} className="bg-gray-700 text-md font-sans font-semibold p-2 px-6 rounded-full cursor-pointer text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
>
            <div className="hidden lg:block">{isConnected ? ensName ?? truncatedAddress : "Sign In"}</div>
            <div className="block lg:hidden">{isConnected ? ensName ?? truncatedAddress : <svg className="fill-current text-gray-400 hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 7V5H4v14h16v-2h-8a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h8zM3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm10 6v6h7V9h-7zm2 2h3v2h-3v-2z"/></svg>}
            </div>
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
};