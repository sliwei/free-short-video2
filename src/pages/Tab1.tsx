import 'swiper/css'
import './Tab1.css'

import { CapacitorHttp } from '@capacitor/core'
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave
} from '@ionic/react'
import axios from 'axios'
import { h } from 'ionicons/dist/types/stencil-public-runtime'
import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { useAsyncFn } from 'react-use'
import { Virtual } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import type { Video } from '@/components/Player'
import Player from '@/components/Player'
import useObjAtom from '@/hooks/useObjAtom'
import useObjState from '@/hooks/useObjState'
import { urlState } from '@/store/global'

const Videos: React.FC = () => {
  // Create array with 500 slides
  // const videosRef = useRef<{ [key: string]: Artplayer | null }>({})
  const [allVideos, setAllVideos] = useState<Video[]>([])
  const page = useRef(0)
  const indexs = useRef([])
  const isLastPage = useRef(false)
  const [realIndex, setRealIndex] = useState(-1)
  const [paused, setPaused] = useState(false)
  const url = useObjAtom(urlState)

  useIonViewDidEnter(() => {
    console.log('ionViewDidEnter event fired')
    setPaused(false)
  })

  useIonViewDidLeave(() => {
    console.log('ionViewDidLeave event fired')
    setPaused(true)
  })

  useIonViewWillEnter(() => {
    console.log('ionViewWillEnter event fired')
  })

  useIonViewWillLeave(() => {
    console.log('ionViewWillLeave event fired')
  })

  const [video, doVideoFetch] = useAsyncFn(async () => {
    const options = {
      url: `${url.value}/api/video/recommend`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        page: page.current,
        indexs: indexs.current
      }
    }
    const response = await CapacitorHttp.post(options)
    console.log('response', response)
    // const response = await axios.post(`${url.value}/api/video/recommend`, {
    //   page: page.current,
    //   indexs: indexs.current
    // })
    const res = response.data

    isLastPage.current = res.data.isLastPage

    const list = res.data.videos
    const newList = list.map((item: Video) => ({
      ...item,
      url: (url.value || '/videos') + item.url
    }))

    setAllVideos([...allVideos, ...newList])
    page.current += 1
    indexs.current = res.data.indexs

    realIndex === -1 && setRealIndex(res.data.videos[0].index)

    console.log('allVideos', allVideos)
    return response
  }, [allVideos, realIndex])

  useEffect(() => {
    doVideoFetch()
  }, [])

  return (
    <div className="h-full overflow-hidden">
      <Swiper
        modules={[Virtual]}
        slidesPerView={1}
        centeredSlides={true}
        pagination={{
          type: 'fraction'
        }}
        direction={'vertical'}
        navigation={true}
        virtual
        onSlideChange={(e) => {
          // console.log('first', e.realIndex, allVideos.length, videosRef.current)
          e.realIndex > allVideos.length - 3 && !isLastPage.current && doVideoFetch()
          setRealIndex(allVideos[e.realIndex].index)
        }}
      >
        {allVideos.map((video, index) => (
          <SwiperSlide key={video.index} virtualIndex={index} className="">
            <div className="w-full h-full relative">
              <Player data={video} realIndex={realIndex} paused={paused} className="w-full h-full" />
              <div className="absolute z-10 left-[5px] bottom-[10px] text-white text-[14px]">{video.title}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const Tab1: React.FC = () => {
  const url = useObjAtom(urlState)
  const isOpen = useObjState(!!url.value)
  const val = useObjState(url.value)

  useEffect(() => {
    if (url.value) {
      isOpen.set(false)
    } else {
      isOpen.set(true)
    }
  }, [url.value])

  const confirm = () => {
    if (val.value) {
      url.set(val.value)
      val.set('')
    }
  }

  console.log('url.value', url.value)

  return (
    <IonPage>
      <IonContent fullscreen>
        {url.value ? (
          <Videos />
        ) : (
          <IonModal isOpen={isOpen.value}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>输入URL</IonTitle>
                <IonButtons slot="end">
                  <IonButton strong={true} onClick={() => confirm()}>
                    确认
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonItem>
                <IonInput
                  label="URL"
                  labelPlacement="stacked"
                  value={val.value}
                  onInput={(e) => val.set((e.target as HTMLInputElement).value)}
                  type="text"
                  placeholder="输入URL"
                />
              </IonItem>
            </IonContent>
          </IonModal>
        )}
      </IonContent>
    </IonPage>
  )
}

export default Tab1
