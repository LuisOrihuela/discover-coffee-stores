import Image from "next/image";
import Link from "next/link";
import cls from "classnames"

import styles from "./Card.module.css";

const Card = ({ className, href, imgUrl, name }) => {
  return (
    <Link href={href} className={styles.cardLink}>
        <div className={cls("glass", styles.container)} >
      <div className={styles.cardHeaderWrapper}>
        <h1 className={styles.cardHeader}>{name}</h1>
      </div>
      <div className={styles.cardImageWrapper}>
        <Image
          className={styles.cardImage}
          src={imgUrl}
          width={260}
          height={160}
          alt={name}
        />
      </div>
        </div>
    </Link>
  );
};

export default Card;
