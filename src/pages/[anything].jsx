import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const Anypage = () => {
  const router = useRouter();
  const query = router.query.anything;
  return (
    <div>
      <Head>
        <title>{query}</title>
      </Head>
      Page {query}
    </div>
  );
};

export default Anypage;
