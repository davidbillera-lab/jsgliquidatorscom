import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet-async";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  useEffect(() => {
    if (!isLoading && !post && !error) {
      navigate("/blog");
    }
  }, [post, isLoading, error, navigate]);

  // Generate Article structured data for SEO
  const generateArticleSchema = () => {
    if (!post) return null;
    
    const publishDate = post.published_at || post.created_at;
    
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.excerpt || `Read ${post.title} on the JSG Liquidators blog.`,
      "image": post.featured_image_url || "https://jsgliquidators.com/logo.png",
      "author": {
        "@type": "Person",
        "name": post.author || "JSG Liquidators"
      },
      "publisher": {
        "@type": "Organization",
        "name": "JSG Liquidators",
        "logo": {
          "@type": "ImageObject",
          "url": "https://jsgliquidators.com/logo.png"
        }
      },
      "datePublished": publishDate,
      "dateModified": post.updated_at,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://jsgliquidators.com/blog/${post.slug}`
      },
      "articleSection": "Estate Liquidation",
      "keywords": "estate sale, liquidation, downsizing, consignment, estate planning, California"
    };
  };

  if (isLoading) {
    return (
      <Layout>
        <Helmet>
          <title>Loading... | JSG Liquidators Blog</title>
        </Helmet>
        <section className="pt-32 pb-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="h-64 w-full mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!post) {
    return null;
  }

  const articleSchema = generateArticleSchema();
  const canonicalUrl = `https://jsgliquidators.com/blog/${post.slug}`;
  const metaDescription = post.excerpt || `Read ${post.title} on the JSG Liquidators blog.`;

  return (
    <Layout>
      <Helmet>
        <title>{post.title} | JSG Liquidators Blog</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        {post.featured_image_url && <meta property="og:image" content={post.featured_image_url} />}
        <meta property="article:published_time" content={post.published_at || post.created_at} />
        <meta property="article:modified_time" content={post.updated_at} />
        <meta property="article:author" content={post.author || "JSG Liquidators"} />
        <meta property="article:section" content="Estate Liquidation" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={metaDescription} />
        {post.featured_image_url && <meta name="twitter:image" content={post.featured_image_url} />}
        
        {/* Article Structured Data */}
        {articleSchema && (
          <script type="application/ld+json">
            {JSON.stringify(articleSchema)}
          </script>
        )}
      </Helmet>

      <article className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button asChild variant="ghost" className="mb-8">
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>

            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {post.published_at
                    ? format(new Date(post.published_at), "MMMM d, yyyy")
                    : format(new Date(post.created_at), "MMMM d, yyyy")}
                </span>
                {post.author && (
                  <span className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {post.author}
                  </span>
                )}
              </div>
            </header>

            {(() => {
              // Check if content already contains the featured image to avoid duplicates
              const contentHasFeaturedImage = post.featured_image_url && 
                post.content.includes(post.featured_image_url);
              
              // Only show standalone featured image if it's not already in content
              const showStandaloneFeaturedImage = post.featured_image_url && !contentHasFeaturedImage;
              
              const sanitizedContent = DOMPurify.sanitize(post.content, {
                ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
                               'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre', 'span', 'div'],
                ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'class', 'id', 'style'],
                ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
              });
              
              return (
                <>
                  {showStandaloneFeaturedImage && (
                    <div className="rounded-xl overflow-hidden mb-8">
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-auto max-w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div
                    className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-img:rounded-xl prose-img:my-8 prose-img:w-full prose-img:max-w-full prose-img:h-auto [&_img]:!w-full [&_img]:!max-w-full [&_img]:!h-auto [&_img]:object-cover"
                    dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                  />
                </>
              );
            })()}
          </motion.div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
