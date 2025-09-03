import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface EditReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reply: any) => void;
  reply: any;
}

export function EditReplyModal({ isOpen, onClose, onSubmit, reply }: EditReplyModalProps) {
  const [content, setContent] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (reply) {
      setContent(reply.content || "");
    }
  }, [reply]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please provide your reply content",
        variant: "destructive",
      });
      return;
    }

    const updatedReply = {
      ...reply,
      content: content.trim(),
    };

    onSubmit(updatedReply);
    
    toast({
      title: "Success",
      description: "Reply updated successfully!",
    });
    
    onClose();
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
      <DialogContent className="max-w-2xl" onKeyDown={handleKeyDown}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Answer</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="edit-reply-content">Answer Content *</Label>
            <Textarea
              id="edit-reply-content"
              placeholder="Share your solution, advice, or thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="resize-none"
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
              Update Answer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}