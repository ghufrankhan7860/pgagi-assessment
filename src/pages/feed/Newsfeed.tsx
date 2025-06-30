import { useEffect, useState } from "react";
import type { NewsArticle } from "../../types";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { fetchNews } from "../../services/newsApi";
import NewsCard from "../../components/FeedCards/NewsCard";

const Newsfeed = () => {
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(false);

    const selectedCategories = useSelector(
        (store: RootState) => store.preferences.categories
    );

    const getNews = async () => {
        try {
            setLoading(true);

            setNewsArticles([]);

            const fetchPromises = selectedCategories.map(
                async (category: string) => {
                    const articles = await fetchNews(
                        category,
                        "top-headlines",
                        ""
                    );
                    // Add category property to each article for filtering
                    return articles.map((article) => ({
                        ...article,
                        category,
                    }));
                }
            );

            // waiting till all fetch promises resolve
            const articlesArrays = await Promise.all(fetchPromises);

            // Flatten the array of arrays into a single array of articles
            const allArticles = articlesArrays.flat();

            // Set all articles at once to avoid multiple re-renders
            setNewsArticles(allArticles);
        } catch (error) {
            console.error("Error fetching news articles:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch news when selected categories change
    useEffect(() => {
        if (selectedCategories.length > 0) {
            getNews();
        } else {
            setNewsArticles([]);
        }
    }, [selectedCategories]);

    return (
        <div className="container mx-auto px-4 pb-4">
            <h1 className="text-3xl font-bold mb-4">News Feed</h1>

            {loading ? (
                <div className="flex justify-center my-12">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-lg">
                        <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        <span>Loading articles...</span>
                    </div>
                </div>
            ) : (
                <div className="mt-1">
                    {newsArticles.length > 0 ? (
                        <div>
                            <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">
                                Personalized Feed ({newsArticles.length}{" "}
                                articles)
                            </h2>
                            {/* Grid layout for article cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {newsArticles.map((article, index) => (
                                    <NewsCard
                                        key={`${article.url}-${index}`}
                                        article={article}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
                            {selectedCategories.length > 0 ? (
                                <div>
                                    <svg
                                        className="w-12 h-12 mx-auto text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                    <p className="mt-4 text-lg text-gray-600">
                                        No news articles found.
                                    </p>
                                    <p className="text-gray-500">
                                        Try selecting different categories.
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <svg
                                        className="w-12 h-12 mx-auto text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                    <p className="mt-4 text-lg text-gray-600">
                                        Please select categories to see news
                                        articles.
                                    </p>
                                    <p className="text-gray-500">
                                        Use the Category Settings panel above.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Newsfeed;
