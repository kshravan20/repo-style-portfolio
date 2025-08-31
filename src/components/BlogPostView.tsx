import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Star, GitFork, Share2, Bookmark, ChevronUp, Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useState, useEffect, useRef } from 'react';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
  content: string;
}

interface BlogPostViewProps {
  post: BlogPost;
  onBack: () => void;
}

export function BlogPostView({ post, onBack }: BlogPostViewProps) {
  const { toast } = useToast();
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Generate table of contents from content
  const generateTOC = () => {
    const headings = post.content.match(/^#{1,3}\s+(.+)$/gm) || [];
    return headings.map((heading, index) => {
      const level = heading.match(/^#+/)?.[0].length || 1;
      const text = heading.replace(/^#+\s+/, '');
      const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
      return { level, text, id, index };
    });
  };

  const tableOfContents = generateTOC();

  // Reading progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
        setShowScrollTop(scrollTop > 300);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Article link has been copied to clipboard",
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Link copied",
      description: "Article link has been copied to clipboard",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={readingProgress} className="h-1 rounded-none" />
      </div>

      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blogs
              </Button>
              <h1 className="text-xl font-semibold truncate max-w-[300px] md:max-w-none">{post.title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center gap-1">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Bookmark className="w-4 h-4" />
                <span className="hidden sm:inline">Save</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span className="hidden sm:inline">Star</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Table of Contents - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="border border-border rounded-lg p-4 bg-background">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                  Table of Contents
                </h3>
                <nav className="space-y-1">
                  {tableOfContents.map((item) => (
                    <button
                      key={item.index}
                      onClick={() => {
                        const element = document.querySelector(`[data-heading="${item.id}"]`);
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`block w-full text-left text-sm hover:text-primary transition-colors py-1 ${
                        item.level === 1 ? 'font-medium' : 
                        item.level === 2 ? 'pl-3' : 'pl-6'
                      }`}
                    >
                      {item.text}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Article Meta */}
              <div className="border border-border rounded-lg p-4 bg-background">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                  Article Info
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <Separator className="my-3" />
                
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCopyLink}
                    className="w-full flex items-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleShare}
                    className="w-full flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Article
                  </Button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="border border-border rounded-lg bg-background overflow-hidden">
              <div className="bg-muted/30 px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">📝</span>
                    <span className="font-mono text-sm font-medium">{post.title.toLowerCase().replace(/\s+/g, '-')}.md</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="hidden sm:inline">
                      {Math.ceil(post.content.split(' ').length / 200)} min read
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span>{post.content.split(' ').length} words</span>
                  </div>
                </div>
              </div>
              
              <article ref={contentRef} className="p-6 lg:p-8">
                {/* Article Header */}
                <header className="mb-8">
                  <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8">
                    <p className="text-lg leading-relaxed text-muted-foreground italic">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Mobile Meta */}
                  <div className="lg:hidden flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                </header>
                
                {/* Article Content */}
                <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      img: ({node, ...props}) => (
                        <figure className="my-8">
                          <img 
                            {...props} 
                            className="rounded-xl border border-border shadow-lg max-w-full h-auto mx-auto" 
                            loading="lazy"
                          />
                        </figure>
                      ),
                      code: ({node, className, children, ...props}: any) => {
                        const isInline = !className || !className.includes('language-');
                        return !isInline ? (
                          <div className="relative group">
                            <pre className="bg-muted/80 p-6 rounded-xl overflow-x-auto border border-border shadow-sm">
                              <code className={className} {...props}>
                                {children}
                              </code>
                            </pre>
                          </div>
                        ) : (
                          <code className="bg-muted/80 px-2 py-1 rounded-md text-sm font-mono border border-border" {...props}>
                            {children}
                          </code>
                        );
                      },
                      blockquote: ({children}) => (
                        <blockquote className="border-l-4 border-primary pl-6 py-2 italic bg-muted/30 rounded-r-xl my-6">
                          {children}
                        </blockquote>
                      ),
                      h1: ({children}) => {
                        const id = children?.toString().toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-') || '';
                        return <h1 data-heading={id} className="text-4xl font-bold mt-12 mb-6 first:mt-0 scroll-mt-24">{children}</h1>;
                      },
                      h2: ({children}) => {
                        const id = children?.toString().toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-') || '';
                        return <h2 data-heading={id} className="text-3xl font-semibold mt-10 mb-4 scroll-mt-24">{children}</h2>;
                      },
                      h3: ({children}) => {
                        const id = children?.toString().toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-') || '';
                        return <h3 data-heading={id} className="text-2xl font-semibold mt-8 mb-3 scroll-mt-24">{children}</h3>;
                      },
                      h4: ({children}) => <h4 className="text-xl font-semibold mt-6 mb-2">{children}</h4>,
                      ul: ({children}) => <ul className="list-disc pl-6 space-y-2 my-6">{children}</ul>,
                      ol: ({children}) => <ol className="list-decimal pl-6 space-y-2 my-6">{children}</ol>,
                      li: ({children}) => <li className="leading-relaxed">{children}</li>,
                      p: ({children}) => <p className="mb-6 leading-relaxed text-foreground/90">{children}</p>,
                      a: ({href, children}) => (
                        <a 
                          href={href} 
                          className="text-primary hover:text-primary/80 underline decoration-2 underline-offset-2 transition-colors font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),
                      table: ({children}) => (
                        <div className="overflow-x-auto my-8 rounded-lg border border-border">
                          <table className="min-w-full">
                            {children}
                          </table>
                        </div>
                      ),
                      thead: ({children}) => <thead className="bg-muted/50">{children}</thead>,
                      th: ({children}) => <th className="border border-border px-6 py-3 text-left font-semibold">{children}</th>,
                      td: ({children}) => <td className="border border-border px-6 py-3">{children}</td>,
                      hr: () => <hr className="border-t-2 border-border my-12" />
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>

                {/* Article Footer */}
                <footer className="mt-16 pt-8 border-t border-border">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-sm text-muted-foreground">
                      Published on {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })} by {post.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleCopyLink}>
                        {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {copied ? 'Copied!' : 'Copy Link'}
                      </Button>
                    </div>
                  </div>
                </footer>
              </article>
            </div>
          </main>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-6 right-6 z-40 shadow-lg"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}