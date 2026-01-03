'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import type { Prompt } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

interface PromptCardProps {
    prompt: Prompt;
    tag?: string;
    imageUrl?: string;
    icon?: React.ReactNode;
}

export default function PromptCard({ prompt, tag, imageUrl, icon }: PromptCardProps) {
    const getInitials = (name: string | null | undefined) => {
        if (!name) return 'U';
        const names = name.split(' ');
        return names.length > 1
          ? `${names[0][0]}${names[names.length - 1][0]}`
          : name.substring(0, 2);
    };

    return (
        <Link href={`/prompts/${prompt.id}`} className="block group">
            <Card className="h-full flex flex-col transition-all duration-200 group-hover:shadow-lg group-hover:-translate-y-1 bg-transparent border-none shadow-none rounded-lg overflow-hidden">
                <CardHeader className="p-0 relative h-64">
                    {imageUrl ? (
                        <Image src={imageUrl} alt={prompt.title} fill className="object-cover" />
                    ) : (
                        <div className="w-full h-full bg-secondary flex items-center justify-center p-4">
                           <div className="text-center">
                            {icon && <div className="mb-4 flex justify-center">{icon}</div>}
                             <p className="text-muted-foreground font-semibold">{prompt.title}</p>
                           </div>
                        </div>
                    )}
                    {tag && (
                        <Badge variant="secondary" className="absolute top-2 left-2 flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            {tag}
                        </Badge>
                    )}
                </CardHeader>
                <CardContent className="p-4 bg-card rounded-b-lg flex-grow">
                    <CardTitle className="font-headline text-lg tracking-tight mb-2">{prompt.title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">{prompt.content}</CardDescription>
                </CardContent>
                <CardFooter className="p-4 bg-card rounded-b-lg flex justify-between items-center text-sm text-muted-foreground">
                    <Link href={`/profile/${prompt.author_uid}`} className="flex items-center gap-2 hover:text-primary z-10 relative" onClick={(e) => e.stopPropagation()}>
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={prompt.author_image} />
                            <AvatarFallback>{getInitials(prompt.author_name)}</AvatarFallback>
                        </Avatar>
                        <span>{prompt.author_name}</span>
                    </Link>
                    <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{prompt.metrics.likes}</span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}
