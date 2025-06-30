import type { SocialPost } from "../types";

export const fetchSocialPosts = async (
    category: string,
    page: number = 1,
    limit: number = 10
): Promise<SocialPost[]> => {
    try {
        const response = await fetch(
            `https://api.example.com/social/${category}?page=${page}&limit=${limit}`
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.posts || [];
    } catch (error) {
        console.error("Failed to fetch social posts:", error);
        return [];
    }
};
