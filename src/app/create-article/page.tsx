"use client";

import ArticleForm from "@/components/ArticleForm/ArticleForm";
import { SessionProvider } from "next-auth/react";

export default function CreateArticlePage() {
  return (
    <SessionProvider>
      <ArticleForm />
    </SessionProvider>
  );
}
