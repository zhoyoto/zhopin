import { MOCK_POSTS, MOCK_USERS } from "@/lib/constants";
import { notFound } from "next/navigation";
import PostDetailClient from "./PostDetailClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = MOCK_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.seoTitle}`,
    description: post.seoDescription,
    keywords: post.tags.join(", "),
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      images: [{ url: post.featuredImage.url, alt: post.featuredImage.alt }],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.displayName],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: [post.featuredImage.url],
    },
  };
}

export async function generateStaticParams() {
  return MOCK_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = MOCK_POSTS.find((p) => p.slug === slug);

  if (!post) notFound();

  const similarPosts = MOCK_POSTS.filter(
    (p) => p.id !== post.id && p.category.id === post.category.id
  ).slice(0, 4);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            image: post.featuredImage.url,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            author: {
              "@type": "Person",
              name: post.author.displayName,
            },
            publisher: {
              "@type": "Organization",
              name: "PromptNest AI",
              logo: "https://promptnest.ai/logo.png",
            },
            description: post.seoDescription,
          }),
        }}
      />
      <PostDetailClient post={post} similarPosts={similarPosts} />
    </>
  );
}
