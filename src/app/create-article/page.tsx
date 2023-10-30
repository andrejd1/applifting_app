import Article from "@/components/Article/Article";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create new article | Applifting Cat Blog",
};

export default function CreateArticlePage() {
  return <Article />;
}
