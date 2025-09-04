import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface NewReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
}

export function NewReplyModal({ isOpen, onClose, onSubmit }: NewReplyModalProps) {
  const [content, setContent] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please provide your answer content",
        variant: "destructive",
      });
      return;
    }

    onSubmit(content.trim());
    setContent("");
    onClose();
    
    toast({
      title: "Success",
      description: "Your answer has been posted!",
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
      <DialogContent className="sm:max-w-2xl" onKeyDown={handleKeyDown}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Post Your Answer</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="answer-content" className="text-base">
              Share your solution or advice
            </Label>
            <Textarea
              id="answer-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="resize-none text-sm"
              placeholder="Help solve this question..."
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Tip: Press Ctrl+Enter (Cmd+Enter on Mac) to post quickly
            </p>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="min-w-[120px]">
              Post Answer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}