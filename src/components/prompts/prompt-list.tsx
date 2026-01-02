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

async function getPrompts(sortBy: 'copies' | 'createdAt'): Promise<Prompt[]> {
    try {
        const promptsRef = collection(db, 'prompts');
        const q = query(
            promptsRef,
            where('status', '==', 'approved'),
            orderBy(sortBy === 'copies' ? 'metrics.copies' : 'createdAt', 'desc'),
            limit(20)
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


export default async function PromptList() {
    const popularPrompts = await getPrompts('copies');
    const newestPrompts = await getPrompts('createdAt');

    const renderPromptGrid = (prompts: Prompt[]) => {
        if (prompts.length === 0) {
            return <p className="text-muted-foreground text-center col-span-full">No prompts found.</p>
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {prompts.map(prompt => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                ))}
            </div>
        )
    }

    return (
        <Tabs defaultValue="popular" className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-headline font-bold">
                    Explore Prompts
                </h2>
                <TabsList>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="newest">Newest</TabsTrigger>
                    <TabsTrigger value="following" disabled>Following</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="popular">
                {renderPromptGrid(popularPrompts)}
            </TabsContent>
            <TabsContent value="newest">
                {renderPromptGrid(newestPrompts)}
            </TabsContent>
            <TabsContent value="following">
                <p className="text-muted-foreground text-center">Feature coming soon! Follow users to see their prompts here.</p>
            </TabsContent>
        </Tabs>
    );
}
