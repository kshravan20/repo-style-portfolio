import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog } from '@/components/ui/dialog';
import { FileText, Folder, Mail, Bug, Code, Home, Search, Terminal } from 'lucide-react';

interface CommandItem {
  title: string;
  description?: string;
  icon: React.ComponentType<any>;
  action: () => void;
  group: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const commands: CommandItem[] = [
    // Navigation
    {
      title: 'Home',
      description: 'Go to main repository',
      icon: Home,
      action: () => navigate('/'),
      group: 'Navigation'
    },
    {
      title: 'Projects',
      description: 'View all projects',
      icon: Folder,
      action: () => navigate('/projects'),
      group: 'Navigation'
    },
    {
      title: 'Blog Posts',
      description: 'Read latest articles',
      icon: FileText,
      action: () => navigate('/blogs'),
      group: 'Navigation'
    },
    {
      title: 'Bug Tales',
      description: 'Debugging stories',
      icon: Bug,
      action: () => navigate('/bug-tales'),
      group: 'Navigation'
    },
    {
      title: 'Newsletter',
      description: 'Weekly developer insights',
      icon: Mail,
      action: () => navigate('/newsletter'),
      group: 'Navigation'
    },
    {
      title: 'Contact',
      description: 'Get in touch',
      icon: Mail,
      action: () => navigate('/contact'),
      group: 'Navigation'
    },
    // Quick Actions
    {
      title: 'Toggle Theme',
      description: 'Switch between light and dark mode',
      icon: Terminal,
      action: () => {
        const theme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', theme);
      },
      group: 'Actions'
    },
    {
      title: 'Search Files',
      description: 'Find files in repository',
      icon: Search,
      action: () => {
        // Focus on file explorer search if available
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      },
      group: 'Actions'
    },
    {
      title: 'View Source',
      description: 'Open GitHub repository',
      icon: Code,
      action: () => window.open('https://github.com', '_blank'),
      group: 'Actions'
    }
  ];

  const runCommand = (command: CommandItem) => {
    setOpen(false);
    command.action();
  };

  const groupedCommands = commands.reduce((groups, command) => {
    if (!groups[command.group]) {
      groups[command.group] = [];
    }
    groups[command.group].push(command);
    return groups;
  }, {} as Record<string, CommandItem[]>);

  return (
    <>
      {/* Trigger hint */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-muted/80 backdrop-blur-sm border border-border rounded-md text-xs text-muted-foreground">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
          <span>Open command palette</span>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {Object.entries(groupedCommands).map(([group, items]) => (
            <CommandGroup key={group} heading={group}>
              {items.map((item) => (
                <CommandItem
                  key={item.title}
                  onSelect={() => runCommand(item)}
                  className="flex items-center gap-2 py-3"
                >
                  <item.icon className="h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{item.title}</span>
                    {item.description && (
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}