import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, ArrowRight, Eye, ThumbsUp, Play, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TechTalksPreview = () => {
  const navigate = useNavigate();

  const stats = {
    totalTalks: 12,
    totalViews: "43.3K",
    averageLikes: "758",
    upcomingEvents: 3
  };

  const featuredTalks = [
    {
      title: "Building Scalable React Applications",
      event: "React Conference 2024",
      thumbnail: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=120&h=68&fit=crop",
      views: "12.5K",
      likes: "856",
      type: "conference",
      featured: true
    },
    {
      title: "The Future of Web Development",
      event: "DevFest 2023",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=120&h=68&fit=crop",
      views: "8.9K",
      likes: "634",
      type: "keynote"
    },
    {
      title: "Microservices Architecture",
      event: "Cloud Native Summit",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=120&h=68&fit=crop",
      views: "15.2K",
      likes: "1.1K",
      type: "workshop"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'conference': return <Mic className="w-3 h-3" />;
      case 'keynote': return <Users className="w-3 h-3" />;
      case 'workshop': return <Play className="w-3 h-3" />;
      default: return <Play className="w-3 h-3" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'conference': return 'bg-primary/10 text-primary border-primary/20';
      case 'keynote': return 'bg-github-success/10 text-github-success border-github-success/20';
      case 'workshop': return 'bg-github-attention/10 text-github-attention border-github-attention/20';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-github-success/5 to-github-success/10 border-github-success/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-github-success/10 rounded-lg">
            <Mic className="w-6 h-6 text-github-success" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Tech Talks</h3>
            <p className="text-sm text-muted-foreground">Sharing knowledge with the community</p>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/tech-talks')}
          className="text-github-success hover:text-github-success hover:bg-github-success/10"
        >
          View All
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-github-success">{stats.totalTalks}</div>
          <div className="text-xs text-muted-foreground">Talks</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{stats.totalViews}</div>
          <div className="text-xs text-muted-foreground">Views</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-github-attention">{stats.averageLikes}</div>
          <div className="text-xs text-muted-foreground">Avg Likes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{stats.upcomingEvents}</div>
          <div className="text-xs text-muted-foreground">Upcoming</div>
        </div>
      </div>

      {/* Featured Talks */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Play className="w-4 h-4" />
          Featured Talks
        </h4>
        
        <div className="space-y-2">
          {featuredTalks.slice(0, 2).map((talk, index) => (
            <div 
              key={index} 
              className="flex gap-3 p-2 rounded hover:bg-background/50 cursor-pointer transition-colors group"
              onClick={() => navigate('/tech-talks')}
            >
              <div className="relative flex-shrink-0">
                <img 
                  src={talk.thumbnail}
                  alt={talk.title}
                  className="w-16 h-9 object-cover rounded shadow-sm group-hover:shadow-md transition-shadow"
                />
                <div className="absolute inset-0 bg-black/20 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-1">
                  <h5 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {talk.title}
                  </h5>
                  {talk.featured && (
                    <Badge variant="default" className="text-xs bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={`${getTypeColor(talk.type)} text-xs`} variant="outline">
                    {getTypeIcon(talk.type)}
                    <span className="ml-1 capitalize">{talk.type}</span>
                  </Badge>
                </div>
                
                <div className="text-xs text-muted-foreground mb-1">{talk.event}</div>
                
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {talk.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    {talk.likes}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TechTalksPreview;