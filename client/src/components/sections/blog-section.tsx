import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { fetchBlogPosts, sanityImageUrl } from "@/lib/sanity";
import type { BlogPost } from "@/types/cms";

export default function BlogSection() {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const { data: articles = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["sanity-blog-posts"],
    queryFn: fetchBlogPosts,
  });

  const featuredArticles = articles.slice(0, 6);

  if (isLoading) {
    return (
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Resources & Blog</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 bg-muted animate-pulse rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background" id="blog">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex p-3 rounded-xl bg-secondary w-fit mx-auto mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-blog-title">
            Resources & Blog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert insights on education, career planning, mental health, and digital safety
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {featuredArticles.map((article, index) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate transition-all duration-300 group" data-testid={`card-article-${index}`}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{article.category || "Blog"}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(article.publishedAt), "MMM dd, yyyy")}
                    </div>
                  </div>
                  {article.image && (
                    <img
                      src={sanityImageUrl(article.image)}
                      alt={article.title}
                      className="w-full h-44 object-cover rounded-lg mb-4"
                      loading="lazy"
                    />
                  )}
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {expandedIds.includes(article._id) ? article.content || article.excerpt : article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="group/btn p-0 h-auto"
                    onClick={() =>
                      setExpandedIds((prev) => (prev.includes(article._id) ? prev.filter((id) => id !== article._id) : [...prev, article._id]))
                    }
                  >
                    {expandedIds.includes(article._id) ? "Read Less" : "Read More"}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {featuredArticles.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Check back soon for new articles and resources!</p>
          </div>
        )}
      </div>
    </section>
  );
}
