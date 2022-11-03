import React from 'react'
import { useDispatch } from 'react-redux'
import { ClearButton, SvgButton } from '../../theme'

export default function LikeButton({ video }) {
    const dispatch = useDispatch();

    const doLike = (videoId) => {
        dispatch(
            likeVideo(videoId)
        )
    }
    return (
        <ClearButton onClick={() => doLike(video.id)}>
            <SvgButton src="/heart.svg" active={`${video.isLikedByCurrentUser > 0}`} />
        </ClearButton>
    )
}
