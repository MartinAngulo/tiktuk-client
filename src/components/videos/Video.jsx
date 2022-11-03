import React from 'react';
import Player from './Player';
import styled from 'styled-components';
import LikeButton from './LikeButton';
import Sharebutton from './ShareButton';
import devices from '../../theme/breakpoints';

let VideoContainer = styled.div`
  position:relative;
  padding-bottom:177%;
  margin-bottom:${({ theme }) => theme.dims.margin.normal};
  background-color: ${({ theme }) => theme.colors.black};
  & iframe{
    z-index:1;
  }
  & .info{
    position:absolute;
    z-index:2;
    display: grid;
    grid-template-rows: minmax(0,1fr) 100px;
    grid-template-columns: minmax(0,1fr) auto;
    grid-template-areas: 'main sidebar'
                          ' info sidebar ';
    
    align-items:flex-start;
    transition:opacity 0.2s ease-in;
    width:100%;
    height:100%;
    top:0px;
    left:0px;
    & article, & aside, & .user-info{
      padding: ${({ theme }) => theme.dims.padding.largePadding};
    }
    & article.main{ grid-area: main; }
    & aside.sidebar{ grid-area: sidebar; }
    & .user-info{ grid-area: info; align-self: middle; }
  }

  @media ${devices.mediumLaptop}{
    background-color: transparent;
    display: flex;
    padding-bottom: 0;
    & .player-container {
      flex: 1;
      padding-bottom: 177%;
      position: relative;
    }
    & .info{
      position: relative;
      width: ${({theme})=>theme.dims.widths.smallControl};
      order: 1;
      grid-template-areas: 'sidebar sidebar'
                          'info info';
    }

    &.sidebar {
      display: flex;
    }
  }
`;

const PaddingContainer = styled.div`
  padding-bottom: ${({ theme }) => theme.dims.padding.mediumPadding};
`;

export default function Video({ index, video }) {
  return (
    <PaddingContainer>
      <VideoContainer key={index}>


        <div className='info'>
          <aside className='sidebar'>
            <LikeButton video={video} />
            <Sharebutton />
          </aside>
          <div className='user-info'>
            <h2>{video.title}</h2>
          </div>
        </div>
        <div className='player-container'>
          <Player video={video} />
        </div>
      </VideoContainer>
    </PaddingContainer>
  )
}
