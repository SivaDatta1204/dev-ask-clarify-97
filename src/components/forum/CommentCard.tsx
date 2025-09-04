import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommentCardProps {
  comment: {
    id: string;
    content: string;
    author: string;
    createdAt: string;
  };
  onEdit: (comment: any) => void;
  onDelete: (id: string) => void;
}

export function CommentCard({ comment, onEdit, onDelete }: CommentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatTimeAgo = (timeStr: string) => {
    // Convert time strings like "30 minutes ago" to "30m"
    if (timeStr.includes('minute')) return timeStr.replace(' minutes ago', 'm').replace(' minute ago', 'm');
    if (timeStr.includes('hour')) return timeStr.replace(' hours ago', 'h').replace(' hour ago', 'h');
    if (timeStr.includes('day')) return timeStr.replace(' days ago', 'd').replace(' day ago', 'd');
    if (timeStr === 'Just now') return 'now';
    return timeStr;
  };

  return (
    <div 
      className="group bg-card rounded-lg border border-border/40 p-4 hover:border-border/60 hover:bg-card/80 transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground leading-relaxed mb-3">{comment.content}</p>
          
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary text-xs font-medium">{comment.author.charAt(0)}</span>
              </div>
              <span className="text-muted-foreground font-medium">{comment.author}</span>
            </div>
            <span className="text-muted-foreground/70">{formatTimeAgo(comment.createdAt)}</span>
          </div>
        </div>
        
        <div className={`flex items-center gap-1 transition-opacity duration-200 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onEdit(comment)}
            className="h-7 w-7 p-0 hover:bg-muted/60"
          >
            <Edit className="w-3.5 h-3.5" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onDelete(comment.id)}
            className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}