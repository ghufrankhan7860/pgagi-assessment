import type { SocialPost } from "../types";

const mockSocialPosts: SocialPost[] = [
    {
        id: "1",
        username: "reactjs",
        text: "Check out the new React 19 features!",
        imageUrl:
            "https://pbs.twimg.com/profile_images/1786498234833379328/p-48B2OK_400x400.jpg",
        url: "https://x.com/reactjs",
    },
    {
        id: "2",
        username: "typescript",
        text: "TypeScript 5.5 is here!",
        imageUrl:
            "https://pbs.twimg.com/profile_images/1768312214943395840/BPAA2229_400x400.jpg",
        url: "https://x.com/typescript",
    },
];

export const fetchSocialPosts = async (
    hashtags: string[]
): Promise<SocialPost[]> => {
    console.log(`Fetching social posts for hashtags: ${hashtags.join(", ")}`);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockSocialPosts);
        }, 500);
    });
};
