import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Prompt } from '@/lib/types';
import PromptCard from "./prompt-card";
import { Bot, Code, ImageIcon, Mic, Pencil } from "lucide-react";
import Link from "next/link";

async function getPrompts(category?: string): Promise<Prompt[]> {
    try {
        const promptsRef = collection(db, 'prompts');
        const q = category 
            ? query(
                promptsRef,
                where('status', '==', 'approved'),
                where('category', '==', category),
                orderBy('createdAt', 'desc'),
                limit(20)
            ) : query(
                promptsRef,
                where('status', '==', 'approved'),
                orderBy('metrics.copies', 'desc'),
                limit(6)
            );

        const querySnapshot = await getDocs(q);
        const prompts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Prompt));

        return prompts;
    } catch (error) {
        console.error("Error fetching prompts: ", error);
        return [];
    }
}

const categories = [
    { name: 'Trending', slug: 'trending', icon: <Bot /> },
    { name: 'ChatGPT', slug: 'chatgpt', icon: <Mic /> },
    { name: 'Midjourney', slug: 'midjourney', icon: <ImageIcon /> },
    { name: 'Stable Diffusion', slug: 'stable-diffusion', icon: <Pencil /> },
    { name: 'Coding', slug: 'coding', icon: <Code /> },
    { name: 'Digital Art', slug: 'digital-art', icon: <ImageIcon /> },
    { name: 'Marketing', slug: 'marketing', icon: <Pencil /> },
];

export default async function PromptList() {
    const trendingPrompts = await getPrompts();
    
    const promptsByCategory = await Promise.all(
        categories.slice(1).map(async (cat) => {
            const prompts = await getPrompts(cat.slug);
            return { ...cat, prompts };
        })
    );
    
    const cardMocks = [
        { imageUrl: 'https://picsum.photos/seed/1/600/400', tag: 'MIDJOURNEY' },
        { icon: <div className="text-5xl font-bold">&lt;/&gt;</div>, tag: 'GPT-4' },
        { imageUrl: 'https://picsum.photos/seed/2/600/400', tag: 'DALL-E 3' },
        { icon: <div className="text-5xl font-bold">&#9776;</div>, tag: 'CLAUDE 2' },
        { imageUrl: 'https://picsum.photos/seed/3/600/400', tag: 'SDXL' },
        { imageUrl: 'https://picsum.photos/seed/4/600/400', tag: 'MIDJOURNEY' },
    ];
    
    const renderPromptGrid = (prompts: Prompt[]) => {
        if (prompts.length === 0) {
            return <p className="text-muted-foreground text-center col-span-full">No prompts found.</p>
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {prompts.map((prompt, index) => (
                    <PromptCard 
                        key={prompt.id} 
                        prompt={prompt} 
                        imageUrl={cardMocks[index % cardMocks.length].imageUrl}
                        tag={cardMocks[index % cardMocks.length].tag}
                        icon={cardMocks[index % cardMocks.length].icon}
                    />
                ))}
            </div>
        )
    }

    return (
        <Tabs defaultValue="trending" className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-headline font-bold">
                    Trending Prompts
                </h2>
                <Link href="#" className="text-sm text-primary hover:underline">View all &rarr;</Link>
            </div>
            <TabsList className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 bg-transparent p-0 h-auto">
                {categories.map((cat) => (
                    <TabsTrigger key={cat.slug} value={cat.slug} className="w-full flex items-center justify-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-secondary">
                        {cat.icon}
                        <span className="hidden md:inline">{cat.name}</span>
                    </TabsTrigger>
                ))}
            </TabsList>
            <TabsContent value="trending" className="mt-6">
                {renderPromptGrid(trendingPrompts)}
            </TabsContent>
            {promptsByCategory.map(cat => (
                 <TabsContent key={cat.slug} value={cat.slug} className="mt-6">
                    {renderPromptGrid(cat.prompts)}
                </TabsContent>
            ))}
        </Tabs>
    );
}