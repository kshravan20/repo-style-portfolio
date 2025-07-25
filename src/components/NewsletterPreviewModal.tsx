
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Clock, User, Mail } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface NewsletterIssue {
  title: string;
  description: string;
  date: string;
  topics: string[];
  readTime: string;
  content: string;
}

interface NewsletterPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  issue: NewsletterIssue | null;
}

export function NewsletterPreviewModal({ isOpen, onClose, issue }: NewsletterPreviewModalProps) {
  if (!issue) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full h-[90vh] p-0 overflow-hidden bg-background border border-border">
        {/* GitHub-style header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-github-canvas-subtle">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-github-fg-muted" />
            <div className="text-sm text-github-fg-muted">
              <span className="font-medium text-github-fg-default">DevPortfolio</span>
              <span className="mx-2">/</span>
              <span className="font-medium text-github-fg-default">newsletter</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-github-fg-muted">
            <Calendar className="w-4 h-4" />
            <span>{new Date(issue.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}</span>
            <span className="mx-2">•</span>
            <Clock className="w-4 h-4" />
            <span>{issue.readTime}</span>
          </div>
        </div>

        {/* Title and meta section */}
        <div className="px-6 py-4 border-b border-border">
          <DialogTitle className="text-2xl font-semibold text-github-fg-default mb-3 leading-tight">
            {issue.title}
          </DialogTitle>
          
          <p className="text-github-fg-muted text-base leading-relaxed mb-4">
            {issue.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {issue.topics.map((topic) => (
              <Badge 
                key={topic} 
                variant="secondary" 
                className="bg-github-accent-subtle text-github-accent-fg border-github-border-default text-xs font-medium px-2 py-1"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Content area with GitHub-style scrolling */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="px-6 py-6">
              {/* GitHub-style markdown content */}
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    img: ({ src, alt, ...props }) => (
                      <div className="my-4">
                        <img 
                          src={src} 
                          alt={alt} 
                          {...props}
                          className="max-w-full h-auto rounded-md border border-github-border-default"
                        />
                      </div>
                    ),
                    code: ({ children, className, ...props }) => {
                      const match = /language-(\w+)/.exec(className || '');
                      const isInline = !match;
                      
                      if (isInline) {
                        return (
                          <code className="bg-github-neutral-muted px-1.5 py-0.5 rounded text-sm font-mono text-github-fg-default border border-github-border-default" {...props}>
                            {children}
                          </code>
                        );
                      }
                      
                      return (
                        <div className="my-4">
                          <pre className="bg-github-canvas-subtle border border-github-border-default rounded-md p-4 overflow-x-auto">
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </pre>
                        </div>
                      );
                    },
                    pre: ({ children, ...props }) => (
                      <div className="my-4">
                        <pre className="bg-github-canvas-subtle border border-github-border-default rounded-md p-4 overflow-x-auto" {...props}>
                          {children}
                        </pre>
                      </div>
                    ),
                    h1: ({ children, ...props }) => (
                      <h1 className="text-2xl font-semibold mt-6 mb-4 first:mt-0 text-github-fg-default border-b border-github-border-muted pb-2" {...props}>
                        {children}
                      </h1>
                    ),
                    h2: ({ children, ...props }) => (
                      <h2 className="text-xl font-semibold mt-6 mb-3 text-github-fg-default border-b border-github-border-muted pb-1" {...props}>
                        {children}
                      </h2>
                    ),
                    h3: ({ children, ...props }) => (
                      <h3 className="text-lg font-semibold mt-5 mb-2 text-github-fg-default" {...props}>
                        {children}
                      </h3>
                    ),
                    p: ({ children, ...props }) => (
                      <p className="mb-4 leading-relaxed text-github-fg-default" {...props}>
                        {children}
                      </p>
                    ),
                    ul: ({ children, ...props }) => (
                      <ul className="mb-4 space-y-1 list-disc pl-6 text-github-fg-default" {...props}>
                        {children}
                      </ul>
                    ),
                    ol: ({ children, ...props }) => (
                      <ol className="mb-4 space-y-1 list-decimal pl-6 text-github-fg-default" {...props}>
                        {children}
                      </ol>
                    ),
                    li: ({ children, ...props }) => (
                      <li className="leading-relaxed" {...props}>
                        {children}
                      </li>
                    ),
                    blockquote: ({ children, ...props }) => (
                      <blockquote className="border-l-4 border-github-border-default pl-4 my-4 text-github-fg-muted bg-github-attention-subtle p-3 rounded-r-md" {...props}>
                        {children}
                      </blockquote>
                    ),
                    hr: ({ ...props }) => (
                      <hr className="my-6 border-github-border-muted" {...props} />
                    )
                  }}
                >
                  {issue.content}
                </ReactMarkdown>
              </div>
              
              {/* GitHub-style CTA */}
              <div className="mt-8 p-4 border border-github-border-default rounded-md bg-github-canvas-subtle">
                <div className="text-center space-y-3">
                  <div className="text-2xl">📬</div>
                  <h3 className="text-lg font-semibold text-github-fg-default">Subscribe to The Developer's Weekly</h3>
                  <p className="text-github-fg-muted text-sm max-w-md mx-auto">
                    Get weekly insights like this delivered straight to your inbox. Join 1,247+ developers who trust our content.
                  </p>
                  <Button size="sm" className="bg-github-success-emphasis hover:bg-github-success-emphasis/90 text-white border-0">
                    Subscribe Now
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
