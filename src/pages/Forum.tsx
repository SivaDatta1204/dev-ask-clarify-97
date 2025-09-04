import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Filter, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { Sidebar } from "@/components/forum/Sidebar";
import { Header } from "@/components/forum/Header";
import { QuestionCard } from "@/components/forum/QuestionCard";
import { NewQuestionModal } from "@/components/forum/NewQuestionModal";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";

const mockQuestions = [
  {
    id: "1",
    title: "API integration failing with 403 error in production",
    content: "I'm getting a 403 Forbidden error when trying to connect to our partner API in production environment. The same code works perfectly in development. I've checked the API keys and they seem correct...",
    author: "John Developer",
    createdAt: "2 hours ago",
    tags: ["api", "production", "error", "authentication"],
    replies: 5,
    views: 23,
    upvotes: 8,
    status: "open" as const,
  },
  {
    id: "2",
    title: "Best practices for implementing OAuth 2.0 with Tekion platform",
    content: "What are the recommended approaches for implementing OAuth 2.0 authentication when integrating with Tekion's APIs? Looking for secure implementation patterns...",
    author: "Sarah Tech",
    createdAt: "4 hours ago",
    tags: ["oauth", "authentication", "security", "best-practices"],
    replies: 12,
    views: 45,
    upvotes: 15,
    status: "solved" as const,
  },
  {
    id: "3",
    title: "Database connection timeout in Node.js application",
    content: "Experiencing intermittent database connection timeouts in our Node.js microservice. This started happening after we scaled to handle more traffic...",
    author: "Mike Backend",
    createdAt: "6 hours ago",
    tags: ["nodejs", "database", "timeout", "performance"],
    replies: 3,
    views: 18,
    upvotes: 4,
    status: "open" as const,
  },
  {
    id: "4",
    title: "React component re-rendering optimization question",
    content: "I have a complex React component that's re-rendering too frequently, causing performance issues. What are the best strategies to optimize this?",
    author: "Alex Frontend",
    createdAt: "1 day ago",
    tags: ["react", "performance", "optimization", "frontend"],
    replies: 8,
    views: 67,
    upvotes: 12,
    status: "open" as const,
  },
];

export default function Forum() {
  const [questions, setQuestions] = useState(mockQuestions);
  const [isNewQuestionModalOpen, setIsNewQuestionModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;
  const navigate = useNavigate();

  const handleNewQuestion = (newQuestion: any) => {
    setQuestions([newQuestion, ...questions]);
  };

  const handleQuestionClick = (questionId: string) => {
    navigate(`/forum/question/${questionId}`);
  };

  const filteredQuestions = questions.filter(question => {
    if (filterBy === "all") return true;
    return question.status === filterBy;
  });

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.upvotes - a.upvotes;
      case "mostReplies":
        return b.replies - a.replies;
      case "mostViews":
        return b.views - a.views;
      default: // newest
        return 0; // In real app, would sort by actual date
    }
  });

  const totalPages = Math.ceil(sortedQuestions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const paginatedQuestions = sortedQuestions.slice(startIndex, startIndex + questionsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Developer Forum</h1>
              <p className="text-muted-foreground">
                Get help from the community and share your knowledge
              </p>
            </div>
            <Button onClick={() => setIsNewQuestionModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Ask Question
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="font-semibold">124</span>
              </div>
              <p className="text-sm text-muted-foreground">Total Questions</p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-forum-success" />
                <span className="font-semibold">89</span>
              </div>
              <p className="text-sm text-muted-foreground">Solved</p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-forum-warning" />
                <span className="font-semibold">35</span>
              </div>
              <p className="text-sm text-muted-foreground">Open</p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                <span className="font-semibold">67</span>
              </div>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="mostReplies">Most Replies</SelectItem>
                <SelectItem value="mostViews">Most Views</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Questions</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="solved">Solved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {paginatedQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onQuestionClick={handleQuestionClick}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          onClick={() => handlePageChange(pageNumber)}
                          isActive={currentPage === pageNumber}
                          className="cursor-pointer"
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {sortedQuestions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No questions found matching your criteria.</p>
              <Button onClick={() => setIsNewQuestionModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Ask the First Question
              </Button>
            </div>
          )}
        </main>
      </div>

      <NewQuestionModal
        isOpen={isNewQuestionModalOpen}
        onClose={() => setIsNewQuestionModalOpen(false)}
        onSubmit={handleNewQuestion}
      />
    </div>
  );
}