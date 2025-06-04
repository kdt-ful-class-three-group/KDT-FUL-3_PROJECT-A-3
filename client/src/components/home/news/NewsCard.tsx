import type { Article } from "@/types/news";
import styles from './NewsStyles.module.css'

export function NewsCard({ article }: { article: Article }) {
  return (
    <a className={styles.title} href={article.url} target="_blank" title="news">
      {article.urlToImage ? (
        <img
        className={styles.image}
        src={article.urlToImage}
        alt={article.content} />
      ) : (
        <div>이미지</div>
      )}
      <p>{article.title}</p>
    </a>
  );
}