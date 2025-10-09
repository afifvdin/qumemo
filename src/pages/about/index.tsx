import { Info } from "@/types/info";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import "../../styles/custom.scss";

export const getStaticProps = (async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/afifvdin/qumemo/refs/heads/main/info.json",
    {
      next: { revalidate: 3600 },
    },
  );
  const info: Info = await res.json();

  return {
    props: { info },
  };
}) satisfies GetStaticProps<{
  info: Info;
}>;

export default function AboutPage({
  info,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="container font-sans font-bold">
      <div className="card">
        <p>App name: {info.name}</p>
        <p>Version: {info.version}</p>
        <p>Latest update: {info.last_updated}</p>
        <p>Author: {info.author}</p>
      </div>
      <div className="action">
        <button>
          <a href="/">Back to home</a>
        </button>
        <button className="button-tertary">
          <a href="https://api-docs.quran.foundation/" target="_blank">
            Go to Quran API
          </a>
        </button>
        <button className="button-tertary">
          <a href="https://quran.foundation/" target="_blank">
            Go to Quran.Foundation
          </a>
        </button>
      </div>
    </div>
  );
}
