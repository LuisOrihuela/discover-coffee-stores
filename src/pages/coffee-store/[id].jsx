import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const CoffeeStore = () => {
  const router = useRouter();
  return (
    <div>
      coffee store page {router.query.id}
      <Link href="/">
        Back to home
      </Link>
      <Link href='/coffee-store/asdf'>
        To dynamic page
      </Link>
    </div>
  );
};

export default CoffeeStore;
