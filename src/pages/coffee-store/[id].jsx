import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
// import coffeeStores from "../../data/coffee-stores.json";
import Head from "next/head";
import styles from "@/styles/coffee-store.module.css";
import Image from "next/image";
import cls from "classnames";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { FALLBACK_IMG } from "@/constants";
import { StoreContext } from "@/store/storeContext";
import { isEmpty } from "@/utils";

// these paths will determine what pages will be generated at build time
export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map(({ id }) => ({
    params: { id },
  }));
  return {
    paths,
    fallback: true,
  };
}

// the props that our static pages will get when they get generated at build time
export async function getStaticProps({ params }) {
  const { id } = params;

  const coffeeStores = await fetchCoffeeStores();
  const coffeeStore =
    coffeeStores.find((coffeeStore) => coffeeStore.id === id) ?? {};

  return {
    props: {
      coffeeStore,
    },
  };
}

const CoffeeStore = (initialProps) => {
  const router = useRouter();
  const id = router.query.id;
  const {
    state: { coffeeStores },
  } = useContext(StoreContext);
  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);
  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length) {
        const foundCoffeeStore = coffeeStores.find((coffeeStore) => {
          return coffeeStore.id.toString() === id;
        });
        setCoffeeStore(foundCoffeeStore);
      }
    }
  }, [id]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { address, imgUrl, locality, name } = coffeeStore;

  const handleUpVoteButton = () => {
    console.log("hanlde up vote!");
  };

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">← Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl || FALLBACK_IMG}
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/places.svg"
                width={24}
                height={24}
                alt=""
              />
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {locality && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width={24}
                height={24}
                alt=""
              />
              <p className={styles.text}>{locality}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width={24} height={24} alt="" />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpVoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
