import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import NewsCard from "../../components/FeedCards/NewsCard";
import type { NewsArticle } from "../../types";

const NewsFav = () => {
    const selectedFavNews = useSelector(
        (store: RootState) => store.fav.favNews as []
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Favorite News</h1>
            {selectedFavNews.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedFavNews.map((news: NewsArticle) => (
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
