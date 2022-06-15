import Head from "next/head";

const defaultDescription =
  "Spotifiuby's Back Office Web - Manage Spotifiuby's Users, Content and More";

const AppHead = ({
  title = "Back Office",
  description = defaultDescription,
}) => {
  return (
    <Head>
      <title>Spotifiuby - {title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default AppHead;
