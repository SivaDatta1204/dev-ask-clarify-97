import { Calendar, Edit, Trash2 } from "lucide-react";
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
  return (
    <div className="border-l-2 border-muted pl-4 py-2 text-sm">
      <p className="text-foreground mb-2">{comment.content}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{comment.createdAt}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs">{comment.author.charAt(0)}</span>
            </div>
            <span>{comment.author}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onEdit(comment)}
            className="h-6 px-2"
          >
            <Edit className="w-3 h-3" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onDelete(comment.id)}
            className="h-6 px-2 text-destructive hover:text-destructive"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}