import { QuranChapter } from "@/types/content";
import "../../styles/custom.scss";

export async function getStaticPaths() {
  const res = await fetch(
    "https://raw.githubusercontent.com/afifvdin/qumemo/refs/heads/main/chapters.json",
  );
  const chapters: QuranChapter[] = await res.json();

  const paths = chapters.map((_, i) => ({
    params: {
      id: i.toString(),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const id = params.id;
  const res = await fetch(
    "https://raw.githubusercontent.com/afifvdin/qumemo/refs/heads/main/chapters.json",
  );
  const chapters: QuranChapter[] = await res.json();
  const chapter = chapters[Number(id) - 1];

  if (!chapter) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      chapter,
    },
  };
}

export default function InfoPage({ chapter }: { chapter: QuranChapter }) {
  return (
    <div className="container font-sans font-bold">
      <div className="card">
        <p className="title">
          {chapter.id}. {chapter.name_arabic} ({chapter.name_complex})
        </p>
        <p>Page: {chapter.pages}</p>
        <p>Order of revelation: {chapter.revelation_order}</p>
        <p>Place of revelation: {chapter.revelation_place}</p>
        <p>Translated name: {chapter.translated_name.name}</p>
        <p>Total ayah: {chapter.verses_count}</p>
      </div>
      <div className="action">
        <button>
          <a href="/">Back to home</a>
        </button>
      </div>
    </div>
  );
}
