import { Metadata } from "next";
import { Article } from "@/types/article";
import Image from "next/image";
import { formatStringDate } from "@/utils/converters";
import { useFetchAllArticles } from "@/hooks/useFetchAllArticles";

export const metadata: Metadata = {
  title: "Recent Articles | Applifting Cat Blog",
};

export default async function Home() {
  const articles: Article[] = await useFetchAllArticles();

  return (
    <>
      <div className="my-5">
        <h1>Recent Articles</h1>
      </div>
      {articles
        .sort(({ createdAt: a }, { createdAt: b }) =>
          a > b ? -1 : a < b ? 1 : 0,
        )
        .map((article: Article) => (
          <div key={article.articleId} style={{ maxWidth: "860px" }}>
            {article.imageId && (
              <div>
                <Image
                  src={article.imageId}
                  width={272}
                  height={244}
                  alt={article.title}
                />
              </div>
            )}
            <div>
              <h4>{article.title}</h4>
              <p>{formatStringDate(article.createdAt)}</p>
              <p>{article.perex}</p>
            </div>
          </div>
        ))}
    </>
  );
}
