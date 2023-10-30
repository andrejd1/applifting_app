import { Article } from "@/types/article";
import axios from "axios";

export async function useFetchAllArticles(): Promise<Article[]> {
  const articlesUrl = `${process.env.BASE_API_URL}/articles`;

  const res = await axios({
    method: "GET",
    url: articlesUrl,
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY || "",
      "Content-Type": "application/json",
    },
  });

  return res.data.items;
}
