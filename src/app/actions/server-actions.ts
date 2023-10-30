"use server";

import { Session } from "next-auth";
import axios from "axios";
import { TFormValues } from "@/components/ArticleForm/ArticleForm";

export async function createArticleAction(
  data: TFormValues,
  session: Session | null,
) {
  const createArticleUrl = `${process.env.BASE_API_URL}/articles`;

  const formData: TFormValues = {
    title: data.title,
    content: data.content,
    articleId: data.articleId,
    imageId: data.imageId,
    perex: data.perex,
  };

  const res = await axios({
    method: "POST",
    url: createArticleUrl,
    data: formData,
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY || "",
      Authorization: `Bearer ${session?.user.access_token}`,
      "Content-Type": "application/json",
    },
  });

  return res.status;
}
