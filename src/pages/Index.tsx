import { GitHubHeader } from "@/components/GitHubHeader";
import { FileExplorer } from "@/components/FileExplorer";
import { ReadmeSection } from "@/components/ReadmeSection";
import { InteractiveStats } from "@/components/InteractiveStats";
import { TypingAnimation } from "@/components/TypingAnimation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative z-10">
      <GitHubHeader />
      
      {/* Hero Section with Typing Animation */}
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Welcome to DevPortfolio
          </h1>
          <div className="text-xl md:text-2xl text-muted-foreground mb-8 h-16 flex items-center justify-center">
            <TypingAnimation 
              texts={[
                "Building amazing web experiences",
                "Crafting clean, efficient code",
                "Solving complex problems",
                "Learning new technologies daily"
              ]}
              className="font-mono"
            />
          </div>
          <InteractiveStats />
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* File Explorer - Left side */}
          <div className="lg:col-span-2">
            <FileExplorer />
          </div>
          
          {/* Quick Actions - Right side */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-md bg-background sticky top-8">
              <div className="bg-muted/30 px-4 py-3 border-b border-border">
                <span className="font-mono text-sm text-foreground">Quick Actions</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="text-sm">
                  <div className="font-medium text-foreground mb-2">Repository Stats</div>
                  <div className="space-y-1 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Commits:</span>
                      <span className="font-mono">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Branches:</span>
                      <span className="font-mono">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Contributors:</span>
                      <span className="font-mono">1</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-border pt-3">
                  <div className="font-medium text-foreground mb-2 text-sm">Languages</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">TypeScript 68.3%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">JavaScript 21.7%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">CSS 8.4%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">HTML 1.6%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* README Section */}
        <ReadmeSection />
      </div>
    </div>
  );
};

export default Index;
