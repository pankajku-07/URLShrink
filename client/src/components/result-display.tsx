import { useState } from "react";
import { CheckCircle, Copy, Check, Download, QrCode } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ResultDisplayProps {
  originalUrl: string;
  shortenedUrl: string;
  qrCode: string;
}

export default function ResultDisplay({ originalUrl, shortenedUrl, qrCode }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Create a much shorter display version while keeping the actual URL for copying
  const getShortCode = (url: string) => {
    // Extract just the short code from the URL
    const parts = url.split('/');
    return parts[parts.length - 1]; // Get the last part (the short code)
  };
  
  const displayUrl = `ly/${getShortCode(shortenedUrl)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      setCopied(true);
      toast({
        title: "Success",
        description: "URL copied to clipboard!",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy URL to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleDownloadQR = () => {
    try {
      const link = document.createElement('a');
      link.href = qrCode;
      link.download = `qr-code-${getShortCode(shortenedUrl)}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Success",
        description: "QR code downloaded!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download QR code",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="mb-8 animate-in fade-in duration-300" data-testid="result-section">
      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="text-green-500 text-xl" />
            <h3 className="text-lg font-semibold text-foreground" data-testid="result-title">
              Your shortened URL is ready!
            </h3>
          </div>
          
          <div className="space-y-4">
            {/* Original URL */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Original URL
              </label>
              <div className="bg-muted rounded-md p-3 break-all text-sm" data-testid="text-original-url">
                {originalUrl}
              </div>
            </div>
            
            {/* Shortened URL */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Shortened URL
              </label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-accent border border-border rounded-md p-3">
                  <span className="text-lg font-medium text-primary" data-testid="text-shortened-url">
                    {displayUrl}
                  </span>
                </div>
                <Button 
                  variant="secondary"
                  onClick={handleCopy}
                  className="px-4 py-3"
                  data-testid="button-copy"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span className="hidden sm:inline ml-2">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span className="hidden sm:inline ml-2">Copy</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* QR Code Section */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                QR Code
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="bg-white p-4 rounded-lg border border-border">
                  <img 
                    src={qrCode} 
                    alt="QR Code for shortened URL" 
                    className="w-24 h-24"
                    data-testid="img-qr-code"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Scan this QR code to open the link directly
                  </p>
                  <Button 
                    variant="outline"
                    onClick={handleDownloadQR}
                    className="w-fit"
                    data-testid="button-download-qr"
                  >
                    <Download className="h-4 w-4" />
                    <span className="ml-2">Download QR Code</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
