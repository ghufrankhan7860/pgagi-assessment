import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import NewsCard from "../../components/FeedCards/NewsCard";
import type { NewsArticle } from "../../types";
import { useContext, useEffect, useState, useCallback } from "react";
import SearchContext from "../../contexts/SearchContext";

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

const NewsFav = () => {
    const selectedFavNews = useSelector(
        (store: RootState) => store.fav.favNews as []
    );

    const [favNews, setFavNews] = useState<NewsArticle[]>(selectedFavNews);
    const { searchQuery } = useContext(SearchContext);

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

    useEffect(() => {
        debouncedFilterNews(selectedFavNews, setFavNews, searchQuery);
    }, [searchQuery, debouncedFilterNews, selectedFavNews]);

    return (
        <div className="dark:bg-neutral-900 p-4">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">
                Favorite News
            </h1>
            {favNews.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {favNews.map((news: NewsArticle) => (
                        <NewsCard key={news.id} article={news} />
                    ))}
                </div>
            ) : (
                <p className="dark:text-gray-300">No favorite News found.</p>
            )}
        </div>
    );
};

export default NewsFav;
