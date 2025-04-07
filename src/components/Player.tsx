import Artplayer from 'artplayer'
import flvjs from 'flv.js'
import Hls from 'hls.js'
import { useEffect, useRef, useState } from 'react'

export type Video = {
  title: string
  type: string
  number: number
  indexTitle: string
  poster: string
  url: string
  index: number
}

type PlayerProps = {
  data: Video
  realIndex: number
  paused: boolean
  getInstance?: (art: Artplayer) => void
  [key: string]: unknown
}

Artplayer.PLAYBACK_RATE = [0.5, 1, 3, 5]

function playM3u8(video: HTMLVideoElement, url: string, art: Artplayer) {
  if (Hls.isSupported()) {
    if (art.hls) art.hls.destroy()
    const hls = new Hls()
    hls.loadSource(url)
    hls.attachMedia(video)
    art.hls = hls
    art.on('destroy', () => {
      try {
        hls.destroy()
      } catch (error) {
        console.error(error)
      }
    })
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = url
  } else {
    art.notice.show = 'Unsupported playback format: m3u8'
  }
}

function playFlv(video: HTMLMediaElement, url: string, art: Artplayer) {
  if (flvjs.isSupported()) {
    if (art.flv) art.flv.destroy()
    const flv = flvjs.createPlayer({ type: 'flv', url })
    flv.attachMediaElement(video)
    flv.load()
    art.flv = flv
    art.on('destroy', () => {
      try {
        flv.destroy()
      } catch (error) {
        console.error(error)
      }
    })
  } else {
    art.notice.show = 'Unsupported playback format: flv'
  }
}

export default function Player({ data, realIndex, paused, getInstance, ...rest }: PlayerProps) {
  const artRef = useRef(null)
  const artCtrl = useRef<Artplayer | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (artRef.current) {
      artCtrl.current = new Artplayer({
        volume: 0.5,
        isLive: false,
        muted: false,
        autoplay: false,
        pip: true,
        // autoSize: true,
        autoMini: true,
        screenshot: true,
        setting: true,
        loop: true,
        flip: true,
        playbackRate: true,
        aspectRatio: true,
        fullscreen: true,
        fullscreenWeb: true,
        subtitleOffset: true,
        miniProgressBar: true,
        mutex: true,
        backdrop: true,
        playsInline: true,
        autoPlayback: true,
        airplay: true,
        // theme: '#23ade5',
        lang: navigator.language.toLowerCase(),
        moreVideoAttr: {
          crossOrigin: 'anonymous'
        },
        url: data.url,
        container: artRef.current,
        type: data.type,
        customType: {
          m3u8: data.type === 'm3u8' ? playM3u8 : undefined,
          flv: data.type === 'flv' ? playFlv : undefined
        }
      })

      artCtrl.current.on('play', () => {})
      artCtrl.current.on('pause', () => {})
      artCtrl.current.on('video:loadeddata', () => {})
      artCtrl.current.on('video:loadedmetadata', () => {
        setReady(true)
      })

      artCtrl.current.on('ready', () => {})

      if (getInstance && typeof getInstance === 'function') {
        getInstance(artCtrl.current)
      }
    }

    return () => {
      if (artCtrl.current && artCtrl.current.destroy) {
        artCtrl.current.destroy(false)
      }
    }
  }, [])

  useEffect(() => {
    console.log('data:', data)
    console.log('ready:', ready)
    console.log('realIndex:', realIndex)
    console.log('paused:', paused)

    if (artCtrl.current && ready && data.index === realIndex && !paused) {
      console.log('play', data.index, realIndex)
      artCtrl.current.play()
    }

    if (artCtrl.current && ready && artCtrl.current.playing) {
      if (data.index !== realIndex) {
        artCtrl.current.pause()
      }
      if (paused) {
        artCtrl.current.pause()
      }
    }
  }, [data, realIndex, ready, paused])

  return <div ref={artRef} {...rest}></div>
}
