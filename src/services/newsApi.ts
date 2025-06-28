import type { NewsArticle, ApiArticle } from "../types";

const API_KEY = "17a5b9628c6041769270728492ea1cd1";
const BASE_URL = "https://newsapi.org/v2";
// https://newsapi.org/v2/top-headlines?category=business&apiKey=17a5b9628c6041769270728492ea1cd1
// ${BASE_URL}/top-headlines?country=in&category=${category}&apiKey=${API_KEY}

export const fetchNews = async (category: string): Promise<NewsArticle[]> => {
    if (!category || category === "") {
        console.warn("NO category provided. Returning empty news list.");
        return [];
    }

    const url = `${BASE_URL}/top-headlines?category=${category}&apiKey=${API_KEY}`;
    console.log("Fetching news from URL:", url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: { articles: ApiArticle[] } = await response.json();
        console.log("Fetched news data:", data);
        return data.articles.map((article: ApiArticle) => ({
            id: article.url,
            title: article.title,
            description: article.description || "",
            imageUrl: article.urlToImage || "https://via.placeholder.com/150",
            url: article.url,
            category: category[0],
            type: "news",
        }));
    } catch (error) {
        console.error("Error fetching news data:", error);
        return [];
    }
};
