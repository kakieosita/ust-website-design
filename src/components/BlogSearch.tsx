import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BlogSearchProps {
  onSearch: (query: string) => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const BlogSearch = ({ onSearch, categories, activeCategory, onCategoryChange }: BlogSearchProps) => (
  <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto mb-16">
    <div className="relative group">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent transition-colors">
        <Search size={20} />
      </div>
      <Input 
        type="text" 
        placeholder="Search for articles, guides, or insights..." 
        className="pl-12 h-14 rounded-2xl border-border/60 bg-card shadow-sm text-lg focus:ring-accent focus:border-accent"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>

    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button 
        variant={activeCategory === "All" ? "cta" : "outline"} 
        size="sm" 
        onClick={() => onCategoryChange("All")}
        className="rounded-full px-6 transition-all"
      >
        All Articles
      </Button>
      {categories.map((category) => (
        <Button 
          key={category} 
          variant={activeCategory === category ? "cta" : "outline"} 
          size="sm" 
          onClick={() => onCategoryChange(category)}
          className="rounded-full px-6 transition-all"
        >
          {category}
        </Button>
      ))}
    </div>
  </div>
);

export default BlogSearch;
