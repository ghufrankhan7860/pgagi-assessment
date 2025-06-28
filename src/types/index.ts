export interface NewsArticle {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    url: string;
    category: string;
    type: "news";
}

export interface Recommendation {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    url: string;
    recommendationType: "movie" | "music";
    type: "recommendation";
}

export interface SocialPost {
    id: string;
    username: string;
    text: string;
    imageUrl: string;
    url: string;
    type: "social";
}

export interface ApiArticle {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export type ContentItem = NewsArticle | Recommendation | SocialPost;
