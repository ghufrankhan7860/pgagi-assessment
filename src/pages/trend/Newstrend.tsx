import { useEffect, useState, useRef, useContext, useCallback } from "react";
import type { NewsArticle } from "../../types";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { fetchNews } from "../../services/newsApi";
import NewsCard from "../../components/FeedCards/NewsCard";
import searchContext from "../../contexts/SearchContext";

// Debounce utility function
const debounce = <T extends (...args: any[]) => any>(
    func: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (...args: Parameters<T>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

const filterNews = (
    allNews: NewsArticle[],
    setFavNews: React.Dispatch<React.SetStateAction<NewsArticle[]>>,
    searchQuery: string
) => {
    if (searchQuery.trim() === "") {
        setFavNews(allNews);
    } else {
        const filteredNews = allNews.filter(
            (news: NewsArticle) =>
                news.title &&
                news.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFavNews(filteredNews);
    }
};

const Newstrend = () => {
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(false);
    const [displayCount, setDisplayCount] = useState(9); // Start with 9 articles
    const loaderRef = useRef<HTMLDivElement>(null);

    const selectedQueries = useSelector(
        (store: RootState) => store.preferences.queries
    );

    const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
    const { searchQuery } = useContext(searchContext);

    // Create debounced filter function
    const debouncedFilterNews = useCallback(
        debounce(
            (
                news: NewsArticle[],
                setNews: React.Dispatch<React.SetStateAction<NewsArticle[]>>,
                query: string
            ) => {
                filterNews(news, setNews, query);
            },
            300
        ),
        []
    );

    const getNews = async () => {
        try {
            setLoading(true);
            setNewsArticles([]);
            setDisplayCount(9); // Reset display count when fetching new articles

            const fetchPromises = selectedQueries.map(async (query: string) => {
                const articles = await fetchNews("", "everything", query);
                // Add category property to each article for filtering
                return articles.map((article) => ({
                    ...article,
                    query,
                }));
            });

            const articlesArrays = await Promise.all(fetchPromises);

            const allArticles = articlesArrays.flat();

            setNewsArticles(allArticles);
            setFilteredNews(allArticles);
        } catch (error) {
            console.error("Error fetching news articles:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedQueries.length > 0) {
            getNews();
        } else {
            setNewsArticles([]);
            setDisplayCount(9);
        }
    }, [selectedQueries]);

    useEffect(() => {
        if (loading || newsArticles.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (
                    entry.isIntersecting &&
                    !loading &&
                    displayCount < newsArticles.length
                ) {
                    setDisplayCount((prevCount) => prevCount + 9);
                }
            },
            { threshold: 0.1 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [displayCount, loading, newsArticles.length]);

    useEffect(() => {
        debouncedFilterNews(newsArticles, setFilteredNews, searchQuery);
    }, [searchQuery, newsArticles, debouncedFilterNews]);

    // Get only the articles we want to display currently
    const visibleArticles = filteredNews.slice(0, displayCount);
    const hasMoreArticles = displayCount < newsArticles.length;

    return (
        <div className="container mx-auto px-4 pb-4 dark:bg-neutral-900">
            <h1 className="text-3xl font-bold mb-6 dark:text-white">
                Top-Headlines
            </h1>

            {loading ? (
                <div className="flex justify-center my-12">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg">
                        <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600 dark:text-blue-300"
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
                <div className="mt-8">
                    {newsArticles.length > 0 ? (
                        <div>
                            <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 dark:text-white">
                                Latest News ({newsArticles.length} articles)
                            </h2>
                            {/* Grid layout for article cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {visibleArticles.map((article, index) => (
                                    <NewsCard
                                        key={`${article.url}-${index}`}
                                        article={article}
                                    />
                                ))}
                            </div>

                            {/* Loader element for infinite scrolling */}
                            {hasMoreArticles && (
                                <div
                                    ref={loaderRef}
                                    className="flex justify-center items-center mt-8 py-4"
                                >
                                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600 dark:text-blue-300"
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
                                        <span>Loading more articles...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-gray-50 dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            {selectedQueries.length > 0 ? (
                                <div>
                                    <svg
                                        className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500"
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
                                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                                        No news articles found.
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Try selecting different queries.
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <svg
                                        className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500"
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
                                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                                        Please select queries to see news
                                        articles.
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400">
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

export default Newstrend;
