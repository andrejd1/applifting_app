"use server";

import { Session } from "next-auth";
import axios from "axios";
import { TArticleFormValues } from "@/types/article";

export async function createArticleAction(
  data: TArticleFormValues,
  session: Session | null,
) {
  const createArticleUrl = `${process.env.BASE_API_URL}/articles`;

  const formData: TArticleFormValues = {
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

export async function createArticleImage(
  data: FormData,
  session: Session | null,
) {
  const createArticleImageUrl = `${process.env.BASE_API_URL}/images`;

  const res = await axios({
    method: "POST",
    url: createArticleImageUrl,
    data: data,
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY || "",
      Authorization: `Bearer ${session?.user.access_token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.status;
}
