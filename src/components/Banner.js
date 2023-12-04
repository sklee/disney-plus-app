import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import styled from 'styled-components';
import requests from '../api/requests';
import "./Banner.css"

const Banner = () => {

  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, [])
  
  const fetchData = async() => {
    const response = await axios.get(requests.fetchNowPlaying)
    console.log("response:", response);
    // 여러 영화 중 하나의 ID 가져오기
    const movieId = response.data.results[
      Math.floor(Math.random() * response.data.results.length)
    ].id

    console.log("movieId:", movieId);
    // 특정 영화의 상세정보 조회
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: {append_to_response: "videos"}
    })
    setMovie(movieDetail);
    console.log("movieDetail: ", movieDetail)
    console.log("movie: ", movie.backdrop_path)
  }

  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  }

  if(isClicked) {
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe /* Youtube 제공 소스 */
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
              width="640"
              height="360"
              frameborder="0"
              allow="autoplay; fullscreen"
            ></Iframe>
          </HomeContainer>
        </Container>
        <button onClick={() => setIsClicked(false)}>X</button>
      </>
    )
  } else {
    return (
      <header
        className='banner'
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize:"cover"
        }}
      >
        <div className='banner__contents'>
          <h1 className='banner__title'>
            {movie.title || movie.name || movie.original_name}
          </h1>
  
          <div className='banner__buttons'>
            {movie?.videos?.results[0]?.key &&
              <button
                className='banner__button play'
                onClick={()=>setIsClicked(true)}
              >
                play
              </button>
            }
  
          </div>
          <p className='banner__description'>
          {truncate(movie.overview, 100)}
          </p>
        </div>
        <div className='banner--fadeBottom'/>
      </header> 
    ) 
  }
}

export default Banner

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1; 
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;