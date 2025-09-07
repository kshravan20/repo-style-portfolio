import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Eye, 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  Clock, 
  Calendar,
  Users,
  Mic,
  Video,
  ExternalLink
} from "lucide-react";

const TechTalksSection = () => {
  const talks = [
    {
      id: 1,
      title: "Building Scalable React Applications with Modern Architecture",
      description: "Deep dive into advanced React patterns, state management strategies, and performance optimization techniques for enterprise-scale applications.",
      thumbnail: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=225&fit=crop",
      duration: "45 min",
      views: "12.5K",
      likes: "856",
      comments: "127",
      date: "2024-01-15",
      event: "React Conference 2024",
      topics: ["React", "Architecture", "Performance", "State Management"],
      type: "conference",
      featured: true,
      videoUrl: "https://youtube.com/watch?v=example1"
    },
    {
      id: 2,
      title: "The Future of Web Development: AI-Driven Development Tools",
      description: "Exploring how artificial intelligence is revolutionizing the way we build web applications, from code generation to automated testing.",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=225&fit=crop",
      duration: "38 min",
      views: "8.9K",
      likes: "634",
      comments: "89",
      date: "2023-11-20",
      event: "DevFest 2023",
      topics: ["AI", "Development Tools", "Future Tech", "Automation"],
      type: "keynote",
      videoUrl: "https://youtube.com/watch?v=example2"
    },
    {
      id: 3,
      title: "Microservices Architecture: Lessons Learned from Production",
      description: "Real-world experiences and best practices for designing, implementing, and maintaining microservices at scale.",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop",
      duration: "52 min",
      views: "15.2K",
      likes: "1.1K",
      comments: "203",
      date: "2023-09-10",
      event: "Cloud Native Summit",
      topics: ["Microservices", "Cloud Native", "DevOps", "Scalability"],
      type: "workshop",
      videoUrl: "https://youtube.com/watch?v=example3"
    },
    {
      id: 4,
      title: "Modern CSS: From Flexbox to Container Queries",
      description: "A comprehensive guide to modern CSS features and how they're changing the way we approach responsive web design.",
      thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=225&fit=crop",
      duration: "42 min",
      views: "6.7K",
      likes: "445",
      comments: "76",
      date: "2023-08-05",
      event: "CSS-in-JS Conference",
      topics: ["CSS", "Responsive Design", "Web Standards", "Frontend"],
      type: "talk",
      videoUrl: "https://youtube.com/watch?v=example4"
    }
  ];

  const stats = {
    totalTalks: talks.length,
    totalViews: "43.3K",
    averageLikes: "758",
    totalEvents: 8
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'conference': return <Mic className="w-4 h-4" />;
      case 'keynote': return <Users className="w-4 h-4" />;
      case 'workshop': return <Video className="w-4 h-4" />;
      default: return <Play className="w-4 h-4" />;
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Mic className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Tech Talks & Presentations</h2>
            <p className="text-muted-foreground">Sharing knowledge and insights with the community</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-primary" />
            <div className="text-sm font-medium">Total Talks</div>
          </div>
          <div className="mt-2 text-2xl font-bold">{stats.totalTalks}</div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-github-success/5 to-github-success/10 border-github-success/20">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-github-success" />
            <div className="text-sm font-medium">Total Views</div>
          </div>
          <div className="mt-2 text-2xl font-bold">{stats.totalViews}</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-github-attention/5 to-github-attention/10 border-github-attention/20">
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-github-attention" />
            <div className="text-sm font-medium">Avg Likes</div>
          </div>
          <div className="mt-2 text-2xl font-bold">{stats.averageLikes}</div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-secondary/50 to-muted border-border">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-foreground" />
            <div className="text-sm font-medium">Events</div>
          </div>
          <div className="mt-2 text-2xl font-bold">{stats.totalEvents}</div>
        </Card>
      </div>

      {/* Featured Talk */}
      {talks.find(talk => talk.featured) && (
        <Card className="p-6 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-primary text-primary-foreground">Featured</Badge>
            <span className="text-sm text-muted-foreground">Most Popular</span>
          </div>
          
          {(() => {
            const featured = talks.find(talk => talk.featured)!;
            return (
              <div className="grid lg:grid-cols-2 gap-6 items-center">
                <div className="relative group cursor-pointer">
                  <img 
                    src={featured.thumbnail}
                    alt={featured.title}
                    className="w-full h-48 lg:h-64 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-sm px-2 py-1 rounded">
                    {featured.duration}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{featured.title}</h3>
                    <p className="text-muted-foreground">{featured.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {featured.topics.map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {featured.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {featured.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {featured.comments}
                    </div>
                  </div>
                  
                  <Button className="w-full lg:w-auto">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Now
                  </Button>
                </div>
              </div>
            );
          })()}
        </Card>
      )}

      {/* All Talks Grid */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">All Presentations</h3>
        
        <div className="grid gap-4">
          {talks.map((talk) => (
            <Card key={talk.id} className="group p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] bg-card border-border">
              <div className="grid lg:grid-cols-4 gap-4 items-start">
                {/* Thumbnail */}
                <div className="relative cursor-pointer">
                  <img 
                    src={talk.thumbnail}
                    alt={talk.title}
                    className="w-full h-24 lg:h-20 object-cover rounded shadow-md group-hover:shadow-lg transition-shadow"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1 py-0.5 rounded">
                    {talk.duration}
                  </div>
                </div>
                
                {/* Content */}
                <div className="lg:col-span-2 space-y-2">
                  <div className="flex items-start gap-2">
                    <Badge className={getTypeColor(talk.type)} variant="outline">
                      {getTypeIcon(talk.type)}
                      <span className="ml-1 capitalize">{talk.type}</span>
                    </Badge>
                    {talk.featured && (
                      <Badge variant="default" className="text-xs bg-primary text-primary-foreground">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {talk.title}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {talk.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {talk.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs px-2 py-0">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Stats & Actions */}
                <div className="flex lg:flex-col justify-between lg:items-end gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-4 lg:gap-2 lg:flex-col lg:items-end text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {talk.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        {talk.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {talk.comments}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(talk.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric' 
                      })}
                    </div>
                    
                    <div className="text-xs text-muted-foreground font-medium">
                      {talk.event}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <Share2 className="w-3 h-3" />
                    </Button>
                    <Button size="sm" className="h-8 px-3">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Watch
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechTalksSection;