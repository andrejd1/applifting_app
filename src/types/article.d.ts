export type TArticle = {
  articleId: string;
  title: string;
  perex: string;
  imageId: string | null;
  createdAt: string;
  lastUpdatedAt: string;
};

export type TArticleFormValues = {
  articleId: string;
  title: string;
  perex: string;
  imageId: string | null;
  content: string;
};

export type TArticleImage = {
  imageId: string;
  name: string;
};
