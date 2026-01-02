import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="w-full border-t bg-card">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Logo />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Promptify. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
