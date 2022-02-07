import image from "../components/image.jpg";
import React from 'react'

const Newsitem = (props) => {
    let { title, description, imageUrl, url, author, date, source } =props;
    return (
        <div className="my-3">
            <div className="card">
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-info" style={{ left: '80%', zIndex: '1' }}>{source}</span>
                <img src={!imageUrl ? image : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-danger">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={url} target="_blank" className="btn btn-sm btn-primary">Read more</a>
                </div>
            </div>
        </div>
    )
}


export default Newsitem;
