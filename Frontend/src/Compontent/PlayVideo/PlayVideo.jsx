import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { API_KEY, value_converter } from '../../data';

const PlayVideo = () => {
  const { videoId } = useParams();

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    const response = await fetch(videoDetails_url);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      setApiData(data.items[0]);
    }
  };

  const fetchOtherData = async () => {
    if (apiData) {
      const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails%2Csnippet%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const channelResponse = await fetch(channelData_url);
      const channelData = await channelResponse.json();
      if (channelData.items && channelData.items.length > 0) {
        setChannelData(channelData.items[0]);
      }

      const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
      const commentResponse = await fetch(comment_url);
      const commentData = await commentResponse.json();
      setCommentData(commentData.items);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className="play-video">
      {apiData && (
        <>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title=""
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <h3>{apiData.snippet.title}</h3>
          <div className="play-video-info">
            <p>
              {value_converter(apiData.statistics.viewCount)} Views &bull;{' '}
              {moment(apiData.snippet.publishedAt).fromNow()}
            </p>
            <div>
              <span>
                {' '}
                <img src={like} alt="like" />
                {value_converter(apiData.statistics.likeCount)}
              </span>
              <span>
                {' '}
                <img src={dislike} alt="dislike" />
                {value_converter(apiData.statistics.dislikeCount)}
              </span>
              <span>
                {' '}
                <img src={save} alt="save" />
                Save
              </span>
              <span>
                {' '}
                <img src={share} alt="share" />
                Share
              </span>
            </div>
          </div>
          <hr />
          {channelData && (
            <div className="publisher">
              <img
                src={channelData.snippet.thumbnails.default.url}
                alt="publisher"
              />
              <div>
                <p>{apiData.snippet.channelTitle}</p>
                <span>
                  {value_converter(channelData.statistics.subscriberCount)}{' '}
                  Subscribe
                </span>
              </div>
              <button>Subscribe</button>
            </div>
          )}
          <div className="video-description">
            <p>
              {apiData.snippet.description.slice(0, 250) ||
                'Description is Here....'}
            </p>
            <hr />
            <h4>{value_converter(apiData.statistics.commentCount)} Comments</h4>
            {commentData.map((item, index) => (
              <div key={index} className="comment">
                <img
                  src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                  alt="comment-author"
                />
                <div>
                  <h3>
                    {item.snippet.topLevelComment.snippet.authorDisplayName}{' '}
                    <span>
                      {moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}
                    </span>
                  </h3>
                  <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                  <div className="comment-action">
                    <img src={like} alt="like" />
                    <span>
                      {value_converter(item.snippet.topLevelComment.snippet.likeCount)}
                    </span>
                    <img src={dislike} alt="dislike" />
                    <span>{value_converter(item.snippet.topLevelComment.snippet.dislikeCount)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PlayVideo;
