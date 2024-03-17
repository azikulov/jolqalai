'use client';

import Cities from './cities.json';
import { useMemo, useState } from 'react';
import { MAPBOXGL_TOKEN } from '@/config';
import type { MapPin } from '@/types/map';

import {
  Marker,
  Popup,
  Map,
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
} from 'react-map-gl';
import Link from 'next/link';
import PinIcon from '@/assets/icons/map/pin.svg';
import styles from './page.module.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@/assets/styles/mapboxgl.scss';

export default function MapPage() {
  const [popupInfo, setPopupInfo] = useState<MapPin | null>(null);

  const pins = useMemo(
    () =>
      Cities.map((city: any, index) => (
        <Marker
          key={`marker-${index}`}
          latitude={city.latitude}
          longitude={city.longitude}
          anchor='bottom'
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <PinIcon className={styles['marker-pin']} />
        </Marker>
      )),
    [],
  );

  return (
    <div className={styles['wrapper']}>
      <div className={styles['header']}>
        <p className={styles['header__title']}>Таблица</p>
        <div className={styles['breadcrumb']}>
          <Link href='/table' className={styles['breadcrumb__link']}>
            Главная
          </Link>
          <span className={styles['breadcrumb__text']}>/</span>
          <span className={styles['breadcrumb__text']}>Карта</span>
        </div>
      </div>

      <div className={styles['main']}>
        <Map
          initialViewState={{
            latitude: 49.80889236276244,
            longitude: 73.1091787640697,
            zoom: 12,
            bearing: 0,
            pitch: 0,
          }}
          mapStyle='mapbox://styles/mapbox/satellite-streets-v12'
          mapboxAccessToken={MAPBOXGL_TOKEN}
        >
          <GeolocateControl position='top-left' />
          <FullscreenControl position='top-left' />
          <NavigationControl position='top-left' />
          <ScaleControl />

          {pins}

          {popupInfo && (
            <Popup
              anchor='top'
              className={styles['mapboxgl-popup']}
              latitude={Number(popupInfo.latitude)}
              longitude={Number(popupInfo.longitude)}
              onClose={() => setPopupInfo(null)}
            >
              <p className={styles['mapboxgl-popup__title']}>Дата: {popupInfo.date}</p>
              <p className={styles['mapboxgl-popup__title']}>Время: {popupInfo.time}</p>
              <img className={styles['mapboxgl-popup__img']} width='100%' src={`/assets/photos/${popupInfo.photo}`} />
            </Popup>
          )}
        </Map>
      </div>
    </div>
  );
}

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none',
};

function Pin({ size = 20 }: any) {
  return (
    <svg height={size} viewBox='0 0 24 24' style={pinStyle}>
      <path d={ICON} />
    </svg>
  );
}
