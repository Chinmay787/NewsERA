import { useEffect,useState } from 'react';
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=>{
     const [articles, setArticles] = useState([])
     const [loading, setLoading] = useState(true)
     const [page, setPage] = useState()
     const [totalResults, setTotalResults] = useState(0)
    
    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const updateNews= async() => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }
    useEffect(() => {
        document.title = `${capitalize(props.category)}-NewsERA`;
        updateNews(); 
        //eslint-disable-next-line
    }, [])

    const fetchMoreData = async() => {
        setPage(page +1)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults) 
      }
        return (
            <div className="container my-3">
                <h1 className="text-center my-3 mt-4 ">NewsERA-Top HeadLines From {capitalize(props.category)}</h1>
                {loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length !== totalResults}
                        loader={<Spinner />}
                    >
                    <div className="container">    
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 78) : ""} imageUrl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>
                    </InfiniteScroll>
            </div>
        )
}

News.defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
export default News;
