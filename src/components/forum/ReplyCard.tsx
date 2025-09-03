import { ArrowUp, ArrowDown, Calendar, Edit, Trash2, CheckCircle, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CommentCard } from "./CommentCard";
import { CommentForm } from "./CommentForm";
import { useState } from "react";

interface ReplyCardProps {
  reply: {
    id: string;
    content: string;
    author: string;
    createdAt: string;
    upvotes: number;
    downvotes: number;
    isAccepted?: boolean;
    comments?: Array<{
      id: string;
      content: string;
      author: string;
      createdAt: string;
    }>;
  };
  onEdit: (reply: any) => void;
  onDelete: (id: string) => void;
  onAccept: (id: string) => void;
  onUpvote: (id: string) => void;
  onDownvote: (id: string) => void;
  onAddComment: (replyId: string, content: string) => void;
  onEditComment: (comment: any) => void;
  onDeleteComment: (commentId: string) => void;
  canModerate?: boolean;
}

export function ReplyCard({ 
  reply, 
  onEdit, 
  onDelete, 
  onAccept, 
  onUpvote, 
  onDownvote, 
  onAddComment, 
  onEditComment, 
  onDeleteComment, 
  canModerate 
}: ReplyCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  return (
    <Card className={`p-6 ${reply.isAccepted ? 'border-forum-success bg-forum-success/5' : ''}`}>
      {reply.isAccepted && (
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-forum-success" />
          <Badge className="bg-forum-success text-white">Accepted Answer</Badge>
        </div>
      )}
      
      <div className="prose max-w-none mb-4">
        <p className="text-foreground whitespace-pre-wrap">{reply.content}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onUpvote(reply.id)}
              className="flex items-center gap-1 px-2"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium min-w-[2rem] text-center">
              {reply.upvotes - reply.downvotes}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onDownvote(reply.id)}
              className="flex items-center gap-1 px-2"
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
          </div>
          
          {canModerate && !reply.isAccepted && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onAccept(reply.id)}
              className="text-forum-success hover:text-forum-success"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Accept Answer
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{reply.comments?.length || 0} comments</span>
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{reply.createdAt}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xs">{reply.author.charAt(0)}</span>
              </div>
              <span>{reply.author}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onEdit(reply)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onDelete(reply.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t">
          <div className="space-y-3">
            {reply.comments?.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                onEdit={onEditComment}
                onDelete={onDeleteComment}
              />
            ))}
          </div>
          
          {!showCommentForm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCommentForm(true)}
              className="mt-3 text-muted-foreground"
            >
              Add a comment
            </Button>
          )}
          
          {showCommentForm && (
            <CommentForm
              onSubmit={(content) => {
                onAddComment(reply.id, content);
                setShowCommentForm(false);
              }}
              placeholder="Add a comment to this reply..."
            />
          )}
        </div>
      )}
    </Card>
  );
}