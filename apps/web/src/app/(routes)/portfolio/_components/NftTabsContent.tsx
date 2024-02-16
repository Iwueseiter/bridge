/* eslint-disable @typescript-eslint/no-misused-promises */
import * as Tabs from "@radix-ui/react-tabs";

import InfiniteScrollButton from "~/app/_components/InfiniteScrollButton";
import NftCard from "~/app/_components/NftCard/NftCard";
import NftsEmptyState from "~/app/_components/NftsEmptyState";
import NftsLoadingState from "~/app/_components/NftsLoadingState";
import useInfiniteEthereumCollections from "~/app/_hooks/useInfiniteEthereumCollections";
import useInfiniteEthereumNfts from "~/app/_hooks/useInfiniteEthereumNfts";
import useInfiniteStarknetCollections from "~/app/_hooks/useInfiniteStarknetCollections";
import useInfiniteStarknetNfts from "~/app/_hooks/useInfiniteStarknetNfts";

function AllNftsTabsContent() {
  const {
    data: l1NftsData,
    fetchNextPage: fetchNextL1NftsPage,
    hasNextPage: hasNextL1NftsPage,
    isFetchingNextPage: isFetchingNextL1NftsPage,
  } = useInfiniteEthereumNfts({ pageSize: 5 });

  const {
    data: l2NftsData,
    // fetchNextPage: fetchNextL2NftsPage,
    // hasNextPage: hasNextL2NftsPage,
    // isFetchingNextPage: isFetchingNextL2NftsPage,
  } = useInfiniteStarknetNfts();

  if (l1NftsData === undefined || l2NftsData === undefined) {
    return (
      <Tabs.Content value="all">
        <NftsLoadingState type="token" />
      </Tabs.Content>
    );
  } else if (
    l1NftsData.pages[0]?.totalCount === 0 &&
    l2NftsData.pages[0]?.ownedNfts.length === 0
  ) {
    return (
      <Tabs.Content value="all">
        <NftsEmptyState type="token" />
      </Tabs.Content>
    );
  }

  return (
    <Tabs.Content value="all">
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-5">
        {l1NftsData.pages.map((page) => {
          return page.ownedNfts.map((nft) => {
            return (
              <NftCard
                cardType="nft"
                chain="Ethereum"
                image={nft.image}
                isSelected={false}
                key={`${nft.contractAddress}-${nft.tokenId}`}
                title={nft.name}
              />
            );
          });
        })}

        {!hasNextL1NftsPage &&
          l2NftsData.pages.map((page) => {
            return page.ownedNfts.map((nft) => {
              return (
                <NftCard
                  cardType="nft"
                  chain="Starknet"
                  image={nft.image}
                  isSelected={false}
                  key={`${nft.contractAddress}-${nft.tokenId}`}
                  title={nft.name}
                />
              );
            });
          })}
      </div>
      <InfiniteScrollButton
        className="mx-auto mt-14 flex w-full justify-center"
        fetchAuto={false}
        fetchNextPage={() => fetchNextL1NftsPage()}
        hasNextPage={hasNextL1NftsPage}
        isFetchingNextPage={isFetchingNextL1NftsPage}
      />
    </Tabs.Content>
  );
}

function CollectionsTabsContent() {
  const {
    data: l1CollectionsData,
    fetchNextPage: fetchNextL1CollectionsPage,
    hasNextPage: hasNextL1CollectionsPage,
    isFetchingNextPage: isFetchingNextL1CollectionsPage,
  } = useInfiniteEthereumCollections({ pageSize: 5 });

  const {
    data: l2CollectionsData,
    // fetchNextPage: fetchNextL2CollectionsPage,
    // hasNextPage: hasNextL2CollectionsPage,
    // isFetchingNextPage: isFetchingNextL2CollectionsPage,
  } = useInfiniteStarknetCollections();

  if (l1CollectionsData === undefined || l2CollectionsData === undefined) {
    return (
      <Tabs.Content value="collections">
        <NftsLoadingState type="collection" />
      </Tabs.Content>
    );
  } else if (
    l1CollectionsData.pages[0]?.collections.length === 0 &&
    l2CollectionsData.pages[0]?.collections.length === 0
  ) {
    return (
      <Tabs.Content value="collections">
        <NftsEmptyState type="collection" />
      </Tabs.Content>
    );
  }
  return (
    <Tabs.Content value="collections">
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-5">
        {l1CollectionsData.pages.map((page) => {
          return page.collections.map((collection) => {
            return (
              <NftCard
                cardType="collection"
                chain="Ethereum"
                image={collection.image}
                isSelected={false}
                key={collection.contractAddress}
                numberOfNfts={collection.totalBalance}
                title={collection.name}
              />
            );
          });
        })}
        {!hasNextL1CollectionsPage &&
          l2CollectionsData.pages.map((page) => {
            return page.collections.map((collection) => {
              return (
                <NftCard
                  cardType="collection"
                  chain="Starknet"
                  image={collection.image}
                  isSelected={false}
                  key={collection.contractAddress}
                  numberOfNfts={collection.totalBalance}
                  title={collection.name}
                />
              );
            });
          })}
      </div>
      <InfiniteScrollButton
        className="mx-auto mt-14 flex w-full justify-center"
        fetchAuto={false}
        fetchNextPage={() => fetchNextL1CollectionsPage()}
        hasNextPage={hasNextL1CollectionsPage}
        isFetchingNextPage={isFetchingNextL1CollectionsPage}
      />
    </Tabs.Content>
  );
}

function EthereumNTabsContent() {
  const {
    data: l1NftsData,
    fetchNextPage: fetchNextL1NftsPage,
    hasNextPage: hasNextL1NftsPage,
    isFetchingNextPage: isFetchingNextL1NftsPage,
  } = useInfiniteEthereumNfts({ pageSize: 5 });

  if (l1NftsData === undefined) {
    return (
      <Tabs.Content value="ethereum">
        <NftsLoadingState type="token" />
      </Tabs.Content>
    );
  } else if (l1NftsData.pages[0]?.totalCount === 0) {
    return (
      <Tabs.Content value="ethereum">
        <NftsEmptyState type="token" />
      </Tabs.Content>
    );
  }

  return (
    <Tabs.Content value="ethereum">
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-5">
        {l1NftsData.pages.map((page) => {
          return page.ownedNfts.map((nft) => {
            return (
              <NftCard
                cardType="nft"
                chain="Ethereum"
                image={nft.image}
                isSelected={false}
                key={`${nft.contractAddress}-${nft.tokenId}`}
                title={nft.name}
              />
            );
          });
        })}
      </div>
      <InfiniteScrollButton
        className="mx-auto mt-14 flex w-full justify-center"
        fetchAuto={false}
        fetchNextPage={() => fetchNextL1NftsPage()}
        hasNextPage={hasNextL1NftsPage}
        isFetchingNextPage={isFetchingNextL1NftsPage}
      />
    </Tabs.Content>
  );
}

function StarknetTabsContent() {
  const {
    data: l2NftsData,
    // fetchNextPage: fetchNextL2NftsPage,
    // hasNextPage: hasNextL2NftsPage,
    // isFetchingNextPage: isFetchingNextL2NftsPage,
  } = useInfiniteStarknetNfts();

  if (l2NftsData === undefined) {
    return (
      <Tabs.Content value="starknet">
        <NftsLoadingState type="token" />
      </Tabs.Content>
    );
  } else if (l2NftsData.pages[0]?.ownedNfts.length === 0) {
    return (
      <Tabs.Content value="starknet">
        <NftsEmptyState type="token" />
      </Tabs.Content>
    );
  }

  return (
    <Tabs.Content
      className="grid grid-cols-2 gap-5 sm:grid-cols-5"
      value="starknet"
    >
      {l2NftsData.pages.map((page) => {
        return page.ownedNfts.map((nft) => {
          return (
            <NftCard
              cardType="nft"
              chain="Starknet"
              image={nft.image}
              isSelected={false}
              key={`${nft.contractAddress}-${nft.tokenId}`}
              title={nft.name}
            />
          );
        });
      })}
    </Tabs.Content>
  );
}

export default function NftTabsContent() {
  return (
    <div className="mt-10.5">
      <AllNftsTabsContent />
      <CollectionsTabsContent />
      <EthereumNTabsContent />
      <StarknetTabsContent />
    </div>
  );
}
