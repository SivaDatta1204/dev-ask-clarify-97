import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowUp, ArrowDown, Eye, Edit, CheckCircle, MessageSquare } from "lucide-react";
import { CommentCard } from "@/components/forum/CommentCard";
import { CommentForm } from "@/components/forum/CommentForm";
import { Sidebar } from "@/components/forum/Sidebar";
import { Header } from "@/components/forum/Header";
import { ReplyCard } from "@/components/forum/ReplyCard";
import { EditQuestionModal } from "@/components/forum/EditQuestionModal";
import { EditReplyModal } from "@/components/forum/EditReplyModal";
import { useToast } from "@/hooks/use-toast";

// Mock data - in real app, this would come from API
const mockQuestion = {
  id: "1",
  title: "API integration failing with 403 error in production",
  content: `I'm getting a 403 Forbidden error when trying to connect to our partner API in production environment. The same code works perfectly in development. I've checked the API keys and they seem correct.

Here's the error I'm getting:

\`\`\`
Error: Request failed with status code 403
at createError (createError.js:16)
at settle (settle.js:17)
at XMLHttpRequest.handleLoad (xhr.js:62)
\`\`\`

And here's my code:

\`\`\`javascript
const response = await axios.get('https://api.partner.com/v1/data', {
  headers: {
    'Authorization': \`Bearer \${process.env.API_KEY}\`,
    'Content-Type': 'application/json'
  }
});
\`\`\`

Any ideas what might be causing this? The API key is definitely correct and has the right permissions.`,
  author: "John Developer",
  createdAt: "2 hours ago",
  tags: ["api", "production", "error", "authentication"],
  replies: 5,
  views: 23,
  upvotes: 8,
  status: "open" as const,
};

const mockReplies = [
  {
    id: "1",
    content: `This looks like a CORS issue or an environment-specific configuration problem. A few things to check:

1. **Environment Variables**: Make sure your production environment has the correct API_KEY set
2. **API Key Permissions**: Check if the API key has different permissions in production vs development
3. **IP Whitelisting**: Some APIs restrict access based on IP addresses
4. **Rate Limiting**: You might be hitting rate limits in production

Try logging the actual API key (first few characters only) to verify it's being loaded correctly in production.`,
    author: "Sarah Tech",
    createdAt: "1 hour ago",
    upvotes: 12,
    downvotes: 0,
    isAccepted: true,
    comments: [
      {
        id: "c1",
        content: "Great answer! The IP whitelisting was exactly my issue.",
        author: "John Developer",
        createdAt: "30 minutes ago"
      },
      {
        id: "c2", 
        content: "Thanks for the detailed explanation about environment variables.",
        author: "Jane Coder",
        createdAt: "25 minutes ago"
      }
    ]
  },
  {
    id: "2",
    content: `Had a similar issue. In my case, it was because the production API endpoint was slightly different. Check if you need to use a different base URL for production vs development.

Also, try making the request with curl to isolate whether it's a code issue or environment issue:

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://api.partner.com/v1/data
\`\`\``,
    author: "Mike Backend",
    createdAt: "45 minutes ago",
    upvotes: 5,
    downvotes: 1,
    comments: [
      {
        id: "c3",
        content: "The curl approach helped me debug my issue too!",
        author: "Dev User",
        createdAt: "20 minutes ago"
      }
    ]
  },
  {
    id: "3",
    content: "Check your Content-Type header. Some APIs are picky about this. Also, make sure you're not sending any extra headers that might be causing issues.",
    author: "Alex Frontend",
    createdAt: "30 minutes ago",
    upvotes: 2,
    downvotes: 0,
    comments: []
  },
];

export default function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [question, setQuestion] = useState<any>(mockQuestion);
  const [replies, setReplies] = useState(mockReplies);
  const [newReply, setNewReply] = useState("");
  const [isEditQuestionModalOpen, setIsEditQuestionModalOpen] = useState(false);
  const [isEditReplyModalOpen, setIsEditReplyModalOpen] = useState(false);
  const [editingReply, setEditingReply] = useState<any>(null);
  const [showQuestionComments, setShowQuestionComments] = useState(false);
  const [showQuestionCommentForm, setShowQuestionCommentForm] = useState(false);
  const [questionComments, setQuestionComments] = useState([
    {
      id: "qc1",
      content: "Have you tried checking the network tab to see the exact request being sent?",
      author: "Debug Helper",
      createdAt: "1 hour ago"
    }
  ]);

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReply.trim()) {
      toast({
        title: "Error",
        description: "Please provide your reply content",
        variant: "destructive",
      });
      return;
    }

    const reply = {
      id: Date.now().toString(),
      content: newReply.trim(),
      author: "Current User",
      createdAt: "Just now",
      upvotes: 0,
      downvotes: 0,
      comments: [],
    };

    setReplies([...replies, reply]);
    setNewReply("");
    
    toast({
      title: "Success",
      description: "Your reply has been posted!",
    });
  };

  const handleEditQuestion = (updatedQuestion: any) => {
    setQuestion(updatedQuestion);
  };

  const handleEditReply = (reply: any) => {
    setEditingReply(reply);
    setIsEditReplyModalOpen(true);
  };

  const handleUpdateReply = (updatedReply: any) => {
    setReplies(replies.map(reply => 
      reply.id === updatedReply.id ? updatedReply : reply
    ));
  };

  const handleDeleteReply = (replyId: string) => {
    setReplies(replies.filter(reply => reply.id !== replyId));
    toast({
      title: "Success",
      description: "Reply deleted successfully",
    });
  };

  const handleAcceptReply = (replyId: string) => {
    setReplies(replies.map(reply => ({
      ...reply,
      isAccepted: reply.id === replyId
    })));
    
    setQuestion({ ...question, status: 'solved' as const });
    
    toast({
      title: "Success",
      description: "Answer accepted!",
    });
  };

  const handleUpvoteReply = (replyId: string) => {
    setReplies(replies.map(reply => 
      reply.id === replyId 
        ? { ...reply, upvotes: reply.upvotes + 1 }
        : reply
    ));
  };

  const handleDownvoteReply = (replyId: string) => {
    setReplies(replies.map(reply => 
      reply.id === replyId 
        ? { ...reply, downvotes: reply.downvotes + 1 }
        : reply
    ));
  };

  const handleAddComment = (replyId: string, content: string) => {
    const newComment = {
      id: Date.now().toString(),
      content,
      author: "Current User",
      createdAt: "Just now"
    };

    setReplies(replies.map(reply => 
      reply.id === replyId 
        ? { ...reply, comments: [...(reply.comments || []), newComment] }
        : reply
    ));
    
    toast({
      title: "Success",
      description: "Comment added!",
    });
  };

  const handleEditComment = (comment: any) => {
    // Implementation for editing comments
    toast({
      title: "Info",
      description: "Comment editing not implemented yet",
    });
  };

  const handleDeleteComment = (commentId: string) => {
    setReplies(replies.map(reply => ({
      ...reply,
      comments: reply.comments?.filter(comment => comment.id !== commentId) || []
    })));
    
    toast({
      title: "Success",
      description: "Comment deleted!",
    });
  };

  const handleAddQuestionComment = (content: string) => {
    const newComment = {
      id: Date.now().toString(),
      content,
      author: "Current User",
      createdAt: "Just now"
    };

    setQuestionComments([...questionComments, newComment]);
    setShowQuestionCommentForm(false);
    
    toast({
      title: "Success",
      description: "Comment added!",
    });
  };

  const handleEditQuestionComment = (comment: any) => {
    toast({
      title: "Info",
      description: "Comment editing not implemented yet",
    });
  };

  const handleDeleteQuestionComment = (commentId: string) => {
    setQuestionComments(questionComments.filter(comment => comment.id !== commentId));
    
    toast({
      title: "Success",
      description: "Comment deleted!",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'solved': return 'bg-forum-success';
      case 'closed': return 'bg-muted';
      default: return 'bg-forum-info';
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/forum')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Forum
          </Button>

          {/* Question */}
          <div className="bg-card border rounded-lg p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-2xl font-bold">{question.title}</h1>
                  <Badge className={`${getStatusColor(question.status)} text-white`}>
                    {question.status}
                  </Badge>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => setIsEditQuestionModalOpen(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>

            <div className="prose max-w-none mb-6">
              <p className="text-foreground whitespace-pre-wrap">{question.content}</p>
            </div>

            {/* Question Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium min-w-[2rem] text-center">
                    {question.upvotes}
                  </span>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{question.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{replies.length} replies</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowQuestionComments(!showQuestionComments)}
                  className="flex items-center gap-1"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{questionComments.length} comments</span>
                </Button>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Asked {question.createdAt} by</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">{question.author.charAt(0)}</span>
                  </div>
                  <span>{question.author}</span>
                </div>
              </div>
            </div>

            {/* Question Comments */}
            {showQuestionComments && (
              <div className="mt-6 pt-4 border-t">
                <div className="space-y-3">
                  {questionComments.map((comment) => (
                    <CommentCard
                      key={comment.id}
                      comment={comment}
                      onEdit={handleEditQuestionComment}
                      onDelete={handleDeleteQuestionComment}
                    />
                  ))}
                </div>
                
                {!showQuestionCommentForm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowQuestionCommentForm(true)}
                    className="mt-3 text-muted-foreground"
                  >
                    Add a comment
                  </Button>
                )}
                
                {showQuestionCommentForm && (
                  <CommentForm
                    onSubmit={handleAddQuestionComment}
                    placeholder="Add a comment to this question..."
                  />
                )}
              </div>
            )}
          </div>

          {/* Replies */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
            </h2>
            
            <div className="space-y-4">
              {replies.map((reply) => (
                <ReplyCard
                  key={reply.id}
                  reply={reply}
                  onEdit={handleEditReply}
                  onDelete={handleDeleteReply}
                  onAccept={handleAcceptReply}
                  onUpvote={handleUpvoteReply}
                  onDownvote={handleDownvoteReply}
                  onAddComment={handleAddComment}
                  onEditComment={handleEditComment}
                  onDeleteComment={handleDeleteComment}
                  canModerate={true} // In real app, this would be based on user permissions
                />
              ))}
            </div>
          </div>

          {/* New Reply Form */}
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Your Reply</h3>
            
            <form onSubmit={handleSubmitReply}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="reply-content">Share your solution or advice</Label>
                  <Textarea
                    id="reply-content"
                    placeholder="Help solve this question..."
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Post Reply</Button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>

      <EditQuestionModal
        isOpen={isEditQuestionModalOpen}
        onClose={() => setIsEditQuestionModalOpen(false)}
        onSubmit={handleEditQuestion}
        question={question}
      />

      <EditReplyModal
        isOpen={isEditReplyModalOpen}
        onClose={() => setIsEditReplyModalOpen(false)}
        onSubmit={handleUpdateReply}
        reply={editingReply}
      />
    </div>
  );
}