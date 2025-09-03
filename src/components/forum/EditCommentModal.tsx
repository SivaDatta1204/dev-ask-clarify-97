import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface EditCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedComment: any) => void;
  comment: any;
}

export function EditCommentModal({ isOpen, onClose, onSubmit, comment }: EditCommentModalProps) {
  const [content, setContent] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (comment) {
      setContent(comment.content);
    }
  }, [comment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Comment content is required",
        variant: "destructive",
      });
      return;
    }

    const updatedComment = {
      ...comment,
      content: content.trim(),
    };

    onSubmit(updatedComment);
    onClose();
    
    toast({
      title: "Success",
      description: "Comment updated successfully!",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg" onKeyDown={handleKeyDown}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Edit Comment</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="comment-content">Comment</Label>
            <Textarea
              id="comment-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="resize-none"
              placeholder="Edit your comment..."
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Tip: Press Ctrl+Enter (Cmd+Enter on Mac) to save quickly
            </p>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}