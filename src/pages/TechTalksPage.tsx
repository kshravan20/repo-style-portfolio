import { GitHubHeader } from "@/components/GitHubHeader";
import TechTalksSection from "@/components/TechTalksSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TechTalksPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <GitHubHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Tech Talks & Presentations</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sharing knowledge and insights with the developer community. 
              A collection of my presentations, workshops, and technical discussions.
            </p>
          </div>
        </div>
        
        <TechTalksSection />
      </div>
    </div>
  );
};

export default TechTalksPage;