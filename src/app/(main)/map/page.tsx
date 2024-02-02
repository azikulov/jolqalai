'use client';

import { useMemo, useState } from 'react';
import Cities from './cities.json';

import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from 'react-map-gl';
import Link from 'next/link';
import styles from './page.module.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapPage() {
  const [popupInfo, setPopupInfo] = useState<any>(null);

  const pins = useMemo(
    () =>
      Cities.map((city: any, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor='bottom'
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <Pin />
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
          mapStyle='mapbox://styles/mapbox/dark-v9'
          mapboxAccessToken={
            'pk.eyJ1IjoiYXppa3Vsb3YiLCJhIjoiY2xzM3Y4b3cwMHo1aDJwbWVoaTkwN2t1eCJ9.SbYQVyer5eYtViYE63aRAQ'
          }
        >
          <GeolocateControl position='top-left' />
          <FullscreenControl position='top-left' />
          <NavigationControl position='top-left' />
          <ScaleControl />

          {pins}

          {popupInfo && (
            <Popup
              anchor='top'
              longitude={Number(popupInfo.longitude)}
              latitude={Number(popupInfo.latitude)}
              onClose={() => setPopupInfo(null)}
            >
              <div>
                {popupInfo.city}, {popupInfo.state} |{' '}
                <a
                  target='_new'
                  href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
                >
                  Wikipedia
                </a>
              </div>
              <img width='100%' src={popupInfo.image} />
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
