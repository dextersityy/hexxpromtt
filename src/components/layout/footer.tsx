import { Logo } from "@/components/logo";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 py-8 px-4 md:px-6">
        <Logo />
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">DMCA</Link>
            <Link href="#" className="hover:text-primary">Community Guidelines</Link>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} PromptHub Inc.
        </p>
      </div>
    </footer>
  );
}
