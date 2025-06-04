export type Article = {
  source:{
    id:string|null;
    name:string;
  };
  author:string|null;
  title:string;
  description:string;
  url:string;
  urlToImage:string|Blob|undefined;
  publishedAt:string;
  content:string;
}