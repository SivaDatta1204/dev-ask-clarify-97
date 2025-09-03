import { MessageSquare, Eye, ThumbsUp, Calendar, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface QuestionCardProps {
  question: {
    id: string;
    title: string;
    content: string;
    author: string;
    authorAvatar?: string;
    createdAt: string;
    tags: string[];
    replies: number;
    views: number;
    upvotes: number;
    status: 'open' | 'solved' | 'closed';
  };
  onQuestionClick: (id: string) => void;
}

export function QuestionCard({ question, onQuestionClick }: QuestionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'solved': return 'bg-forum-success';
      case 'closed': return 'bg-muted';
      default: return 'bg-forum-info';
    }
  };

  return (
    <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onQuestionClick(question.id)}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg hover:text-primary transition-colors">
              {question.title}
            </h3>
            <Badge className={`${getStatusColor(question.status)} text-white`}>
              {question.status}
            </Badge>
          </div>
          <p className="text-muted-foreground line-clamp-2 mb-3">
            {question.content}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {question.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>{question.replies}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{question.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <span>{question.upvotes}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{question.createdAt}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs">{question.author.charAt(0)}</span>
            </div>
            <span>{question.author}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}