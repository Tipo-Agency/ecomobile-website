import Header from "@/components/header";
import Footer from "@/components/footer";
import { ArticlePage } from "@/components/eco-ui";
import { NEWS, newsBySlug, pick } from "@/components/news-data";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = newsBySlug(slug);
  return a
    ? { title: `${pick(a.title, "ru")} | ECOMOBILE`, description: pick(a.excerpt, "ru") }
    : { title: "News | ECOMOBILE" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!newsBySlug(slug)) notFound();
  return (
    <>
      <Header />
      <ArticlePage slug={slug} />
      <Footer />
    </>
  );
}
