import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, MessageCircle, Github, Coffee, Code, Sparkles } from 'lucide-react';

export function FloatingActionButtons() {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    {
      icon: MessageCircle,
      label: 'Contact Me',
      action: () => window.location.href = '/contact',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: Github,
      label: 'View GitHub',
      action: () => window.open('https://github.com', '_blank'),
      color: 'bg-gray-700 hover:bg-gray-800'
    },
    {
      icon: Coffee,
      label: 'Buy Me Coffee',
      action: () => window.open('https://buymeacoffee.com', '_blank'),
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      icon: Code,
      label: 'Latest Project',
      action: () => window.location.href = '/projects',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col-reverse items-start gap-3">
      {/* Action buttons */}
      {isExpanded && actions.map((action, index) => (
        <div
          key={action.label}
          className="animate-scale-in opacity-0"
          style={{
            animation: `scale-in 0.2s ease-out ${index * 0.05}s forwards`
          }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                className={`${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-200 w-12 h-12 rounded-full p-0`}
                onClick={action.action}
              >
                <action.icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{action.label}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      ))}

      {/* Main toggle button */}
      <Button
        size="sm"
        className={`bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 w-14 h-14 rounded-full p-0 ${
          isExpanded ? 'rotate-45' : 'rotate-0'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <Plus className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </Button>
    </div>
  );
}