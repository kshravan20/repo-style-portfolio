import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Star, Calendar, User, Target, TrendingUp } from "lucide-react";

const BooksReadSection = () => {
  const currentlyReading = {
    title: "Clean Architecture",
    author: "Robert C. Martin", 
    progress: 65,
    pages: 432,
    currentPage: 281,
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop&crop=face"
  };

  const recentBooks = [
    {
      id: 1,
      title: "The Pragmatic Programmer",
      author: "David Thomas & Andy Hunt",
      rating: 5,
      completedDate: "2024-01-15",
      category: "Software Engineering",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=220&fit=crop",
      notes: "Excellent insights on craftsmanship",
      favorite: true
    },
    {
      id: 2,
      title: "System Design Interview",
      author: "Alex Xu",
      rating: 4,
      completedDate: "2023-12-20",
      category: "System Design",
      cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&h=220&fit=crop",
      notes: "Great for technical interviews"
    },
    {
      id: 3,
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      rating: 5,
      completedDate: "2023-11-30",
      category: "Data Engineering",
      cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=150&h=220&fit=crop",
      notes: "Deep dive into distributed systems",
      favorite: true
    },
    {
      id: 4,
      title: "You Don't Know JS",
      author: "Kyle Simpson",
      rating: 4,
      completedDate: "2023-10-15",
      category: "JavaScript",
      cover: "https://images.unsplash.com/photo-1569235186275-626cb53b83ce?w=150&h=220&fit=crop",
      notes: "JavaScript fundamentals mastery"
    }
  ];

  const yearStats = {
    booksCompleted: 24,
    pagesRead: 7856,
    goal: 30,
    averageRating: 4.2,
    favoriteGenre: "Software Engineering"
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Reading Journey</h2>
            <p className="text-muted-foreground">Exploring knowledge, one book at a time</p>
          </div>
        </div>
        
        {/* Year Progress */}
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{yearStats.booksCompleted}/{yearStats.goal}</div>
          <div className="text-sm text-muted-foreground">2024 Goal</div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <div className="text-sm font-medium">Progress</div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">{Math.round((yearStats.booksCompleted / yearStats.goal) * 100)}%</div>
            <Progress value={(yearStats.booksCompleted / yearStats.goal) * 100} className="mt-1 h-1" />
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-github-success/5 to-github-success/10 border-github-success/20">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-github-success" />
            <div className="text-sm font-medium">Pages Read</div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">{yearStats.pagesRead.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">This year</div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-github-attention/5 to-github-attention/10 border-github-attention/20">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-github-attention" />
            <div className="text-sm font-medium">Avg Rating</div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold">{yearStats.averageRating}</div>
            <div className="flex text-github-attention">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.floor(yearStats.averageRating) ? 'fill-current' : ''}`} />
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/50 to-muted border-border">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-foreground" />
            <div className="text-sm font-medium">Top Genre</div>
          </div>
          <div className="mt-2">
            <div className="text-sm font-bold">{yearStats.favoriteGenre}</div>
            <div className="text-xs text-muted-foreground">Most read</div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Currently Reading - Left Column */}
        <div className="lg:col-span-1">
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 sticky top-8">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Currently Reading</h3>
            </div>
            
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg blur-sm group-hover:blur-none transition-all duration-300" />
                <img 
                  src={currentlyReading.cover} 
                  alt={currentlyReading.title}
                  className="relative w-full h-48 object-cover rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="font-medium">{currentlyReading.title}</div>
                  <div className="text-sm opacity-90">{currentlyReading.author}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{currentlyReading.progress}%</span>
                </div>
                <Progress value={currentlyReading.progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Page {currentlyReading.currentPage}</span>
                  <span>of {currentlyReading.pages}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Books Grid - Right Columns */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Recently Completed</h3>
            <Badge variant="outline" className="text-xs">
              {recentBooks.length} books
            </Badge>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {recentBooks.map((book) => (
              <Card key={book.id} className="group p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card border-border">
                <div className="flex gap-3">
                  <div className="relative flex-shrink-0">
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      className="w-16 h-24 object-cover rounded shadow-md group-hover:shadow-lg transition-shadow"
                    />
                    {book.favorite && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-github-attention rounded-full flex items-center justify-center">
                        <Star className="w-2 h-2 text-white fill-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {book.title}
                    </h4>
                    <div className="flex items-center gap-1 mt-1">
                      <User className="w-3 h-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground truncate">{book.author}</p>
                    </div>
                    
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < book.rating ? 'text-github-attention fill-github-attention' : 'text-muted-foreground'}`} 
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">({book.rating})</span>
                    </div>
                    
                    <div className="mt-2 space-y-1">
                      <Badge variant="secondary" className="text-xs px-2 py-0">
                        {book.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(book.completedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    
                    {book.notes && (
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground italic line-clamp-2">{book.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksReadSection;