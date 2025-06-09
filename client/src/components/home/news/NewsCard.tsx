import type { Article } from "@/types/news";

export function NewsCard({ article }: { article: Article }) {
  return (
    <a
      href={article.url}
      target="_blank"
      title="news"
      className="block no-underline text-[#222] text-base font-bold mb-2 leading-snug hover:underline"
    >
      {article.urlToImage ? (
        <img
          src={article.urlToImage}
          alt={article.content}
          className="w-[500px] h-[200px] object-cover rounded-lg"
        />
      ) : (
        <div className="w-[500px] h-[200px] bg-gray-200 rounded-lg flex items-center justify-center text-sm text-gray-600">
          이미지 없음
        </div>
      )}
      <p className="mt-2">{article.title}</p>
    </a>
  );
}