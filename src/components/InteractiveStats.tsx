import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, GitCommit, Users, Star, Coffee } from 'lucide-react';

interface StatItem {
  label: string;
  value: number;
  target: number;
  icon: React.ComponentType<any>;
  color: string;
  suffix?: string;
}

export function InteractiveStats() {
  const [animatedStats, setAnimatedStats] = useState<StatItem[]>([
    { label: 'Commits', value: 0, target: 1247, icon: GitCommit, color: 'text-blue-500', suffix: '' },
    { label: 'Stars', value: 0, target: 89, icon: Star, color: 'text-yellow-500', suffix: '' },
    { label: 'Contributors', value: 0, target: 3, icon: Users, color: 'text-green-500', suffix: '' },
    { label: 'Coffee Cups', value: 0, target: 2847, icon: Coffee, color: 'text-orange-500', suffix: '' },
    { label: 'Lines of Code', value: 0, target: 25, icon: TrendingUp, color: 'text-purple-500', suffix: 'k' }
  ]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('interactive-stats');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animateStats = () => {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 FPS
      const stepDuration = duration / steps;

      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

        setAnimatedStats(prev => prev.map(stat => ({
          ...stat,
          value: Math.floor(stat.target * easeOutProgress)
        })));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    };

    const cleanup = animateStats();
    return cleanup;
  }, [isVisible]);

  return (
    <div id="interactive-stats" className="grid grid-cols-2 md:grid-cols-5 gap-4 my-8">
      {animatedStats.map((stat, index) => (
        <Card 
          key={stat.label}
          className="p-4 text-center hover:scale-105 transition-all duration-300 cursor-pointer group border-border bg-card"
          style={{ 
            animationDelay: `${index * 0.1}s`,
            animation: isVisible ? 'fade-in 0.5s ease-out forwards' : 'none'
          }}
        >
          <div className="space-y-2">
            <div className={`mx-auto w-8 h-8 flex items-center justify-center rounded-full bg-muted/50 group-hover:bg-muted transition-colors ${stat.color}`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold font-mono">
                {stat.value.toLocaleString()}{stat.suffix}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}