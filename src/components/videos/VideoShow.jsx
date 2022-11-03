import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getVideo } from '../../store/videos';
import { SmallContainer } from '../../theme';
import Video from './Video';

export default function VideoShow() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentVideo = useSelector(state => state.videos.currentVideo);

    useEffect(()=>{
        dispatch(getVideo(id))
    },[])
    return (
        <SmallContainer>
            { currentVideo && <Video video={currentVideo}/> }
        </SmallContainer>
    )
}
