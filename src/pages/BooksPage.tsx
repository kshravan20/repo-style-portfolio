import { GitHubHeader } from "@/components/GitHubHeader";
import BooksReadSection from "@/components/BooksReadSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BooksPage = () => {
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
            <h1 className="text-4xl font-bold text-foreground mb-4">My Reading Journey</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Exploring the world of knowledge through books. Here's my collection of reads, 
              insights, and the continuous journey of learning through literature.
            </p>
          </div>
        </div>
        
        <BooksReadSection />
      </div>
    </div>
  );
};

export default BooksPage;