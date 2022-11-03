import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadVideos } from '../../store/videos';
import { SmallContainer as SmallContainerTemplate} from '../../theme';
import VideosList from './VideosList';
import devices from '../../theme/breakpoints';
import styled from 'styled-components';

const SmallContainer = styled(SmallContainerTemplate)`
  height: 100%;
  @media ${devices.mediumLaptop}{
    width: ${({theme})=>theme.dims.widths.medium};
  }
`;


export default function Videos() {
  const videos = useSelector(state => state.videos);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(videos.status==='not_load')dispatch(loadVideos());
  }, []);

  const loadNextPage = async()=>{
    await dispatch( loadVideos() )
  }

  return (
    <div>
      <SmallContainer>
        <VideosList videos={videos.data.videos}/>
      </SmallContainer>
    </div>
  )
}
