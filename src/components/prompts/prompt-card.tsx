'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Heart, MessageSquare } from "lucide-react";
import type { Prompt } from "@/lib/types";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useLoginModal } from "../providers/app-provider";
import { useToast } from "@/hooks/use-toast";
import { PrompterIcon } from "../icons";

interface PromptCardProps {
    prompt: Prompt;
}

export default function PromptCard({ prompt }: PromptCardProps) {
    const { user } = useAuth();
    const { showLoginModal } = useLoginModal();
    const { toast } = useToast();

    const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            showLoginModal();
            return;
        }

        navigator.clipboard.writeText(prompt.content).then(() => {
            toast({ title: 'Prompt copied to clipboard!' });
            // Here you would also call a server action to increment the copy count
            // e.g., copyPromptAction(prompt.id);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            toast({ title: 'Failed to copy', variant: 'destructive' });
        });
    };
    
    const getInitials = (name: string | null | undefined) => {
        if (!name) return 'U';
        const names = name.split(' ');
        return names.length > 1
          ? `${names[0][0]}${names[names.length - 1][0]}`
          : name.substring(0, 2);
    };


    return (
        <Link href={`/prompts/${prompt.id}`} className="block group">
            <Card className="h-full flex flex-col transition-all duration-200 group-hover:shadow-lg group-hover:-translate-y-1">
                <CardHeader>
                    <CardTitle className="font-headline text-xl tracking-tight">{prompt.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{prompt.content}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Link href={`/profile/${prompt.author_uid}`} className="flex items-center gap-2 hover:text-primary z-10 relative" onClick={(e) => e.stopPropagation()}>
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={prompt.author_image} />
                                <AvatarFallback>{getInitials(prompt.author_name)}</AvatarFallback>
                            </Avatar>
                            <span>{prompt.author_name}</span>
                        </Link>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                         <Badge variant="secondary">{prompt.category}</Badge>
                         <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{prompt.metrics.likes}</span>
                         </div>
                         <div className="flex items-center gap-1">
                            <Copy className="h-4 w-4" />
                            <span>{prompt.metrics.copies}</span>
                         </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleCopy} className="z-10 relative">
                        <Copy className="h-5 w-5" />
                        <span className="sr-only">Copy prompt</span>
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
