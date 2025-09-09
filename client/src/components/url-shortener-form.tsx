import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, ArrowRight, Loader2, AlertTriangle } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL (must start with http:// or https://)"),
  customShortCode: z.string()
    .optional()
    .refine((val) => !val || /^[a-zA-Z0-9]{3,20}$/.test(val), {
      message: "Custom code must be 3-20 alphanumeric characters"
    }),
});

type FormData = z.infer<typeof formSchema>;

interface URLShortenerFormProps {
  onSubmit: (data: { url: string; customShortCode?: string }) => void;
  isLoading: boolean;
}

export default function URLShortenerForm({ onSubmit, isLoading }: URLShortenerFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      customShortCode: "",
    },
  });

  const handleSubmit = (data: FormData) => {
    onSubmit({
      url: data.url,
      customShortCode: data.customShortCode || undefined,
    });
  };

  return (
    <section className="mb-8">
      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Enter your long URL
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="url"
                          placeholder="https://example.com/very/long/url/path/here"
                          className="pr-10"
                          data-testid="input-url"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="flex items-center gap-2">
                      {form.formState.errors.url && (
                        <>
                          <AlertTriangle className="h-4 w-4" />
                          {form.formState.errors.url.message}
                        </>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customShortCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Custom short code (optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="my-custom-link (3-20 characters)"
                        data-testid="input-custom-code"
                        className="font-mono"
                      />
                    </FormControl>
                    <FormMessage className="flex items-center gap-2">
                      {form.formState.errors.customShortCode && (
                        <>
                          <AlertTriangle className="h-4 w-4" />
                          {form.formState.errors.customShortCode.message}
                        </>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
                data-testid="button-shorten"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Shortening...
                  </>
                ) : (
                  <>
                    Shorten URL
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
