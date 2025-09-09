import { Zap, Infinity, UserX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get your shortened URL in milliseconds. No waiting, no delays.",
  },
  {
    icon: Infinity,
    title: "Never Expires",
    description: "Your links work forever. No expiration dates, no broken links.",
  },
  {
    icon: UserX,
    title: "No Registration",
    description: "Start shortening URLs immediately. No accounts, no personal data required.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="mt-16">
      <h3 className="text-2xl font-bold text-foreground text-center mb-8" data-testid="features-title">
        Why Choose LinkSnap?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="text-center" data-testid={`feature-card-${index}`}>
              <CardContent className="p-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-primary text-xl" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2" data-testid={`feature-title-${index}`}>
                  {feature.title}
                </h4>
                <p className="text-muted-foreground text-sm" data-testid={`feature-description-${index}`}>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
