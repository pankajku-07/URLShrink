import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import URLShortenerForm from "@/components/url-shortener-form";
import ResultDisplay from "@/components/result-display";
import FeaturesSection from "@/components/features-section";

interface ShortenResponse {
  originalUrl: string;
  shortCode: string;
  shortenedUrl: string;
  qrCode: string;
}

export default function Home() {
  const [result, setResult] = useState<ShortenResponse | null>(null);
  const { toast } = useToast();

  const shortenMutation = useMutation({
    mutationFn: async (data: { url: string; customShortCode?: string }) => {
      const response = await apiRequest("POST", "/api/shorten", { 
        originalUrl: data.url,
        customShortCode: data.customShortCode 
      });
      return response.json() as Promise<ShortenResponse>;
    },
    onSuccess: (data) => {
      setResult(data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to shorten URL",
        variant: "destructive",
      });
    },
  });

  const handleShortenUrl = (data: { url: string; customShortCode?: string }) => {
    shortenMutation.mutate(data);
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link className="text-primary text-2xl" data-testid="logo-icon" />
              <h1 className="text-2xl font-bold text-foreground" data-testid="logo-text">
                LinkSnap
              </h1>
            </div>
            <div className="text-sm text-muted-foreground" data-testid="tagline">
              No signup required • Links never expire
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="hero-title">
            Shorten URLs Instantly
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="hero-description">
            Transform long, unwieldy URLs into clean, shareable links in seconds. 
            No registration required, and your links never expire.
          </p>
        </section>

        {/* URL Shortener Form */}
        <URLShortenerForm 
          onSubmit={handleShortenUrl} 
          isLoading={shortenMutation.isPending}
        />

        {/* Result Section */}
        {result && (
          <ResultDisplay 
            originalUrl={result.originalUrl}
            shortenedUrl={result.shortenedUrl}
            qrCode={result.qrCode}
          />
        )}

        {/* Features Section */}
        <FeaturesSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Link className="text-primary" data-testid="footer-logo-icon" />
              <span className="font-semibold text-foreground" data-testid="footer-logo-text">
                LinkSnap
              </span>
            </div>
            <p className="text-muted-foreground text-sm" data-testid="footer-description">
              Simple, fast, and reliable URL shortening service.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
