import { Button } from "@/components/ui/button";
import { MessageSquare, Users, HelpCircle, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-primary font-bold text-2xl">TEKION</div>
              <span className="text-muted-foreground">Developer Platform</span>
            </div>
            <Button onClick={() => navigate('/forum')}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Go to Forum
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Developer <span className="text-primary">Support Forum</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get help from our developer community. Ask questions, share knowledge, 
            and find solutions to your integration challenges.
          </p>
          <Button size="lg" onClick={() => navigate('/forum')}>
            <MessageSquare className="w-5 h-5 mr-2" />
            Start Asking Questions
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Use Our Forum?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Expert Community</h3>
              <p className="text-muted-foreground">
                Get answers from experienced developers and Tekion experts
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Fast Solutions</h3>
              <p className="text-muted-foreground">
                Most questions get answered within hours by our active community
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-lg border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Knowledge Sharing</h3>
              <p className="text-muted-foreground">
                Learn from real-world examples and best practices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">
            Join our developer community and get the help you need
          </p>
          <Button size="lg" onClick={() => navigate('/forum')}>
            Access Developer Forum
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
