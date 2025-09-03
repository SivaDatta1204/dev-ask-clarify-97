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
      
      <div className="flex gap-6">
        {/* Voting Section - Left Side */}
        <div className="flex flex-col items-center gap-2 min-w-[60px]">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onUpvote(reply.id)}
            className="h-8 w-8 p-0 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
          
          <div className="text-lg font-bold text-center min-w-[2rem] py-1">
            {reply.upvotes - reply.downvotes}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onDownvote(reply.id)}
            className="h-8 w-8 p-0 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowDown className="w-5 h-5" />
          </Button>
          
          {canModerate && !reply.isAccepted && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onAccept(reply.id)}
              className="h-8 w-8 p-0 rounded-full text-forum-success hover:bg-forum-success/10 mt-2"
              title="Accept Answer"
            >
              <CheckCircle className="w-5 h-5" />
            </Button>
          )}
        </div>
        
        {/* Content Section - Right Side */}
        <div className="flex-1">
          <div className="prose max-w-none mb-4">
            <p className="text-foreground whitespace-pre-wrap">{reply.content}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
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
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t ml-[84px]">
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