import type { ContentItem } from "../types";

interface ContentCardProps {
    item: ContentItem;
}

const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
    const renderCardContent = () => {
        switch (item.type) {
            case "news":
                return (
                    <>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Read More
                        </a>
                    </>
                );
            case "recommendation":
                return (
                    <>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Play Now
                        </a>
                    </>
                );
            case "social":
                return (
                    <>
                        <h3>{item.username}</h3>
                        <p>{item.text}</p>
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Post
                        </a>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="content-card">
            <img src={item.imageUrl} alt={item.title} />
            <div className="card-content">{renderCardContent()}</div>
        </div>
    );
};

export default ContentCard;
