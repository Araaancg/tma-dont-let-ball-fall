"use client";
import { TonConnectButton, useTonWallet } from "@tonconnect/ui-react";
import { useEffect } from "react";

const WalletPage = () => {
  const wallet = useTonWallet();

  useEffect(() => {
    console.log("MY WALLET -> ", wallet);
  }, [wallet]);

  return (
    <>
      <div className="w-full flex justify-end">
        <TonConnectButton />
      </div>{" "}
    </>
  );
};

export default WalletPage;
