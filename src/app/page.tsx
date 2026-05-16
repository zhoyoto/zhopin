import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import CategoriesCarousel from "@/components/home/CategoriesCarousel";
import FeaturedSpotlight from "@/components/home/FeaturedSpotlight";
import MasonryGrid from "@/components/home/MasonryGrid";
import NewsletterSection from "@/components/home/NewsletterSection";
import FeaturedCreators from "@/components/home/FeaturedCreators";
import GoogleAd from "@/components/GoogleAd";

export const metadata: Metadata = {
  title: "PromptNest AI – Discover AI Inspirations That Spark Creativity",
  description:
    "Curated AI prompts, stunning visuals, and endless inspiration. From Midjourney to ChatGPT – discover, share, and monetize your best AI creations on PromptNest AI.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Quick Categories */}
      <CategoriesCarousel />

      {/* Featured Spotlight */}
      <FeaturedSpotlight />

      {/* Trending Masonry Grid */}
      <MasonryGrid
        title="Trending Inspirations"
        subtitle="Discover what the community loves most right now"
        filterType="trending"
      />

      <div className="container-main">
        <GoogleAd slot="2616084302" />
      </div>

      {/* Newsletter */}
      <NewsletterSection />

      {/* Featured Creators */}
      <FeaturedCreators />
    </>
  );
}
