import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import NewsCard from "../../components/FeedCards/NewsCard";
import type { NewsArticle } from "../../types";
import { useContext, useEffect, useState } from "react";
import SearchContext from "../../contexts/SearchContext";

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

    useEffect(() => {
        filterNews(selectedFavNews, setFavNews, searchQuery);
    }, [searchQuery]);
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Favorite News</h1>
            {favNews.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {favNews.map((news: NewsArticle) => (
                        <NewsCard key={news.id} article={news} />
                    ))}
                </div>
            ) : (
                <p>No favorite News found.</p>
            )}
        </div>
    );
};

export default NewsFav;
