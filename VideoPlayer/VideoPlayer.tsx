import React, { useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import './VideoPlayer.scss'

interface IVideoPlayer {
  options: {}
  onReady: (player) => void
}

const VideoPlayer: React.FC<IVideoPlayer> = React.memo(props => {
  const { options, onReady } = props
  const videoRef = useRef(null)
  const playerRef = useRef(null)

  const optionsDefault = {
    playsinline: true,
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    errorDisplay: false,
    hls: {
      overrideNative: true,
    },
    ...options,
  }

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current
      if (!videoElement) return

      const player = (playerRef.current = videojs(videoElement, optionsDefault, () => {
        // console.log('player is ready')
        onReady && onReady(player)
      }))
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current
      // player.autoplay(options.autoplay);
      // player.src(options.sources)
    }
  }, [options, videoRef])

  useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  )
})

export default VideoPlayer
