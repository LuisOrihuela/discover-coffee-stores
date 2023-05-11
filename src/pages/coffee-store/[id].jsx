import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import coffeeStores from "../../data/coffee-stores.json";
import Head from "next/head";
import styles from "@/styles/coffee-store.module.css";
import Image from "next/image";
import cls from "classnames";

// this paths will determine what pages will be generated at build time
export async function getStaticPaths() {
  const paths = coffeeStores.map(({ id }) => ({
    params: { id: id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}

// the props that our static pages will get when they get generated at build time
export async function getStaticProps({ params }) {
  const { id } = params;

  const coffeeStore = coffeeStores.find(
    (coffeeStore) => coffeeStore.id === Number(id)
  );

  return {
    props: {
      coffeeStore,
    },
  };
}

const CoffeeStore = ({ coffeeStore }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { address, imgUrl, name, neighbourhood } = coffeeStore;

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
            <Link href="/">Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width={24}
              height={24}
              alt=""
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width={24}
              height={24}
              alt=""
            />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
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
