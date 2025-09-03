import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
}

export function CommentForm({ onSubmit, placeholder = "Add a comment..." }: CommentFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    onSubmit(content.trim());
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <Textarea
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={2}
        className="resize-none text-sm"
      />
      <div className="flex justify-end mt-2">
        <Button type="submit" size="sm" disabled={!content.trim()}>
          Add Comment
        </Button>
      </div>
    </form>
  );
}