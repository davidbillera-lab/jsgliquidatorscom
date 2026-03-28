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

  // Author bio map for E-E-A-T
  const authorBios: Record<string, { name: string; title: string; bio: string; phone?: string }> = {
    "David Billera": {
      name: "David Billera",
      title: "Co-Founder & Lead Liquidation Specialist",
      bio: "David Billera is the co-founder of JSG Liquidators and has personally overseen hundreds of estate liquidations across the Denver metro area. He specializes in antique valuation, online auction strategy, and helping Colorado families navigate estate transitions with no upfront costs.",
      phone: "(805) 444-4069",
    },
    "Penny": {
      name: "Penny",
      title: "Estate Liquidation Specialist & Content Writer",
      bio: "Penny is an estate liquidation specialist at JSG Liquidators with firsthand experience in estate sales, downsizing, and the Colorado auction market. She writes to help families understand their options and make informed decisions during estate transitions.",
    },
    "JSG Team": {
      name: "JSG Liquidators Team",
      title: "Estate Liquidation Experts",
      bio: "The JSG Liquidators team brings decades of combined experience in estate sales, antique valuation, e-commerce consignment, and junk removal across the Denver metro area and Colorado Front Range.",
    },
  };

  // Generate Article structured data for SEO
  const generateArticleSchema = () => {
    if (!post) return null;
    
    const publishDate = post.published_at || post.created_at;
    const authorName = post.author || "JSG Liquidators";
    const authorBio = authorBios[authorName] || authorBios["JSG Team"];
    
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt || `Read ${post.title} on the JSG Liquidators blog.`,
      "image": post.featured_image_url || "https://jsgliquidators.com/logo.png",
      "author": {
        "@type": "Person",
        "name": authorBio.name,
        "jobTitle": authorBio.title,
        "description": authorBio.bio,
        "worksFor": {
          "@type": "Organization",
          "name": "JSG Liquidators",
          "url": "https://jsgliquidators.com"
        }
      },
      "publisher": {
        "@type": "Organization",
        "name": "JSG Liquidators",
        "url": "https://jsgliquidators.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://jsgliquidators.com/logo.png",
          "width": 240,
          "height": 72
        }
      },
      "datePublished": publishDate,
      "dateModified": post.updated_at,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://jsgliquidators.com/blog/${post.slug}`
      },
      "articleSection": "Estate Liquidation",
      "inLanguage": "en-US",
      "keywords": "estate sale Denver, estate liquidation Colorado, downsizing, consignment, auction, junk removal Denver"
    };
  };

  const generateBreadcrumbSchema = () => {
    if (!post) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jsgliquidators.com/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://jsgliquidators.com/blog" },
        { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://jsgliquidators.com/blog/${post.slug}` }
      ]
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
  const breadcrumbSchema = generateBreadcrumbSchema();
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
        <meta property="og:site_name" content="JSG Liquidators - Estate Sales & Liquidation Denver" />
        <meta property="og:locale" content="en_US" />
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
        
        {/* Geo */}
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Denver" />
        
        {/* Article Structured Data */}
        {articleSchema && (
          <script type="application/ld+json">
            {JSON.stringify(articleSchema)}
          </script>
        )}
        
        {/* Breadcrumb Schema */}
        {breadcrumbSchema && (
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchema)}
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

            {/* Author Bio Card - E-E-A-T */}
            {(() => {
              const authorName = post.author || "JSG Team";
              const bio = authorBios[authorName] || authorBios["JSG Team"];
              return (
                <div className="mt-12 p-6 bg-secondary rounded-2xl border border-border flex gap-5 items-start">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">Written by</p>
                    <p className="text-lg font-display font-bold text-foreground">{bio.name}</p>
                    <p className="text-sm text-muted-foreground font-medium mb-2">{bio.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{bio.bio}</p>
                    {bio.phone && (
                      <a href={`tel:${bio.phone.replace(/[^0-9]/g, "")}`} className="inline-flex items-center gap-2 mt-3 text-sm text-primary font-medium hover:text-accent transition-colors">
                        <Calendar className="w-4 h-4" />
                        Call {bio.name.split(" ")[0]}: {bio.phone}
                      </a>
                    )}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
