import { Button } from "@/components/ui/button";
import PromptList from "@/components/prompts/prompt-list";
import Link from "next/link";
import { Sparkles, Copy } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-card border-b">
        <div className="container mx-auto max-w-5xl text-center py-20 md:py-32 px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-4">
            The Universe of AI Prompts
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover, share, and supercharge your creativity with the best prompts for any AI.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="#prompts">
                <Sparkles className="mr-2" />
                Explore Prompts
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/upload">
                <Copy className="mr-2" />
                Share a Prompt
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="prompts" className="w-full container mx-auto max-w-7xl py-16 px-4">
        <PromptList />
      </section>
    </div>
  );
}
