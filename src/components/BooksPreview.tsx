import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowRight, Star, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BooksPreview = () => {
  const navigate = useNavigate();

  const stats = {
    booksCompleted: 24,
    currentlyReading: "Clean Architecture",
    averageRating: 4.2,
    pagesRead: 7856
  };

  const recentBooks = [
    {
      title: "The Pragmatic Programmer",
      author: "David Thomas",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=140&fit=crop",
      rating: 5,
      favorite: true
    },
    {
      title: "System Design Interview",
      author: "Alex Xu",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&h=140&fit=crop",
      rating: 4
    },
    {
      title: "Clean Architecture",
      author: "Robert C. Martin",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=140&fit=crop",
      rating: 5,
      favorite: true
    }
  ];

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Reading Journey</h3>
            <p className="text-sm text-muted-foreground">Continuous learning through books</p>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/books')}
          className="text-primary hover:text-primary hover:bg-primary/10"
        >
          View All
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{stats.booksCompleted}</div>
          <div className="text-xs text-muted-foreground">Books Read</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-github-success">{stats.pagesRead.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Pages</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-2xl font-bold text-github-attention">{stats.averageRating}</span>
            <Star className="w-4 h-4 text-github-attention fill-github-attention" />
          </div>
          <div className="text-xs text-muted-foreground">Avg Rating</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-bold text-foreground">Currently</div>
          <div className="text-xs text-muted-foreground truncate">{stats.currentlyReading}</div>
        </div>
      </div>

      {/* Recent Books */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Recent Reads
        </h4>
        
        <div className="grid grid-cols-3 gap-3">
          {recentBooks.map((book, index) => (
            <div key={index} className="relative group">
              <img 
                src={book.cover}
                alt={book.title}
                className="w-full h-20 object-cover rounded shadow-md group-hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate('/books')}
              />
              {book.favorite && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-github-attention rounded-full flex items-center justify-center">
                  <Star className="w-2 h-2 text-white fill-white" />
                </div>
              )}
              <div className="mt-1">
                <div className="text-xs font-medium text-foreground truncate">{book.title}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-2 h-2 ${i < book.rating ? 'text-github-attention fill-github-attention' : 'text-muted-foreground'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default BooksPreview;