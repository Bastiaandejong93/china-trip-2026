// src/lib/loadContent.ts
import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface LoadedMarkdown {
    frontmatter: Record<string, any>
    content: string
}

export interface CityContent {
    id: string;
    name: string;
    subtitle: string;
    summary: string;
    quickFacts: {
        population?: string;
        knownFor?: string;
        mustEat?: string;
    };
    logistics: string;
    sections: {
        details: string;
        physical: string;
        political: string;
        demographics: string;
    };
}

/**
 * Load a markdown file from the project root.
 * Example: loadMarkdown("src/content/geography/physical.md")
 */
export function loadMarkdown(relativePath: string): LoadedMarkdown {
    const fullPath = path.join(process.cwd(), relativePath)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
        frontmatter: data,
        content,
    }
}

function extractSection(content: string, header: string): string {
    const regex = new RegExp(`## ${header}\\n([\\s\\S]*?)(?=\\n## |$)`);
    const match = content.match(regex);
    return match ? match[1].trim() : "";
}

export function getAllCityContent(): Record<string, CityContent> {
    const citiesDir = path.join(process.cwd(), "src/content/cities");
    const files = fs.readdirSync(citiesDir);
    const contentMap: Record<string, CityContent> = {};

    files.forEach(file => {
        if (!file.endsWith(".md")) return;
        
        const id = file.replace(".md", "");
        const { frontmatter, content } = loadMarkdown(`src/content/cities/${file}`);
        
        contentMap[id] = {
            id,
            name: frontmatter.name,
            subtitle: frontmatter.subtitle,
            summary: frontmatter.summary,
            quickFacts: frontmatter.quickFacts,
            logistics: frontmatter.logistics,
            sections: {
                details: extractSection(content, "Details"),
                physical: extractSection(content, "Physical Geography"),
                political: extractSection(content, "Political Context"),
                demographics: extractSection(content, "People & Culture"),
            }
        };
    });

    return contentMap;
}
