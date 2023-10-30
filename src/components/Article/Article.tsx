"use client";
import ArticleForm from "./ArticleForm/ArticleForm";
import { SessionProvider } from "next-auth/react";

export default function Article() {
  return (
    <SessionProvider>
      <ArticleForm />
    </SessionProvider>
  );
}
