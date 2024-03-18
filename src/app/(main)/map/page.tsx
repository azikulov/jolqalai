'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import mapboxgl from 'mapbox-gl';
import cities from './cities.json'; // Импортируем данные о городах
import styles from './page.module.scss';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@/assets/styles/mapboxgl.scss';
import Link from 'next/link';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiYXppa3Vsb3YiLCJhIjoiY2xzM3Y4b3cwMHo1aDJwbWVoaTkwN2t1eCJ9.SbYQVyer5eYtViYE63aRAQ';

const MapClusterPage = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    const initializeMap = ({ setMap, mapContainer }: any) => {
      const mapInstance = new mapboxgl.Map({
        container: mapContainer,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [73.1091787640697, 49.80889236276244],
        zoom: 12,
      });

      mapInstance.on('load', () => {
        // Добавляем источник данных для кластеров с использованием данных о городах
        mapInstance.addSource('cities', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: cities.map((city) => ({
              type: 'Feature',
              properties: {
                id: city.id,
                date: city.date,
                time: city.time,
                photo: city.photo,
              },
              geometry: {
                type: 'Point',
                coordinates: [city.longitude, city.latitude],
              },
            })),
          },
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });

        // Добавляем слой кластеров на карту
        mapInstance.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'cities',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#51bbd6',
              100,
              '#f1f075',
              750,
              '#f28cb1',
            ],
            'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
          },
        });

        // Добавляем слой для отображения числа точек в кластере
        mapInstance.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'cities',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 20,
          },
        });

        // Добавляем слой для отображения не кластеризованных точек
        mapInstance.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'cities',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': '#11b4da',
            'circle-radius': 8,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff',
          },
        });

        // Обработчик клика на кластере
        mapInstance.on('click', 'clusters', (e) => {
          const features = mapInstance.queryRenderedFeatures(e.point, {
            layers: ['clusters'],
          });

          const clusterId = (features[0].properties as any).cluster_id;
          (mapInstance.getSource('cities') as any).getClusterExpansionZoom(
            clusterId,
            (err: any, zoom: any) => {
              if (err) return;

              mapInstance.easeTo({
                center: (features[0].geometry as any).coordinates,
                zoom: zoom,
              });
            },
          );
        });

        // Обработчик клика на не кластеризованной точке
        mapInstance.on('click', 'unclustered-point', (e) => {
          const features = e.features as any[];
          const coordinates = features[0].geometry.coordinates.slice();
          const properties = features[0].properties;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
              `
              <p class="${styles['mapboxgl-popup__title']}">Дата: ${properties.date}</p>
              <p class="${styles['mapboxgl-popup__title']}">Время: ${properties.time}</p>
              <img class="${styles['mapboxgl-popup__img']}" width='100%' src="/assets/photos/${properties.photo}" />
            `,
            )
            .addTo(mapInstance);
        });

        // Изменение курсора при наведении на кластер
        mapInstance.on('mouseenter', 'clusters', () => {
          mapInstance.getCanvas().style.cursor = 'pointer';
        });
        mapInstance.on('mouseleave', 'clusters', () => {
          mapInstance.getCanvas().style.cursor = '';
        });

        setMap(mapInstance);
      });

      mapInstance.on('error', (error) => {
        console.error('Mapbox GL Error:', error);
      });
    };

    if (!map) initializeMap({ setMap, mapContainer: 'map' });

    return () => (map as any)?.remove();
  }, [map]);

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
        <div id='map' />
      </div>
    </div>
  );
};

export default MapClusterPage;
