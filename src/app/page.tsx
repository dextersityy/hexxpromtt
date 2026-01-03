import { Button } from "@/components/ui/button";
import PromptList from "@/components/prompts/prompt-list";
import Link from "next/link";
import { Sparkles, Copy, Search, User, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-background">
        <div className="container mx-auto max-w-5xl text-center py-20 md:py-32 px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-4">
            Find your next <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">inspiration</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover, share, and download the world&apos;s best AI prompts for Midjourney, ChatGPT, Stable Diffusion, and more.
          </p>
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Try 'cyberpunk city' or 'SEO blog post'..."
                className="w-full rounded-full h-12 pl-12 pr-32 text-base"
              />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-9">
                Search
              </Button>
            </div>
            <div className="flex justify-center items-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>10k+ Prompts</span>
                </div>
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>5k+ Creators</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      <section id="prompts" className="w-full container mx-auto max-w-7xl py-16 px-4">
        <PromptList />
      </section>
      <div className="my-8">
        <Button variant="outline" size="lg">Load More Prompts</Button>
      </div>
    </div>
  );
}
