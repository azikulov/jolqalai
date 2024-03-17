'use client';
import React, { useEffect, useState } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOXGL_TOKEN } from '@/config';

interface Coordinates {
  type: string;
  coordinates: number[][];
}

interface GeoJSONFeature {
  type: string;
  geometry: Coordinates;
  properties?: object;
}

interface MapContainerProps {
  accessToken: string;
  center?: LngLatLike;
  zoom?: number;
  lines: GeoJSONFeature[];
}

const MapContainer: React.FC<MapContainerProps> = ({ lines, accessToken, center, zoom }) => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    const newMap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v11',
      center: center || [-77.0214, 38.897],
      zoom: zoom || 12,
    });

    setMap(newMap);

    return () => newMap.remove();
  }, [accessToken, center, zoom]);

  useEffect(() => {
    if (!map) return;

    map.on('load', () => {
      lines.forEach((line, index) => {
        const sourceId = `line-${index}`;
        const layerId = `line-layer-${index}`;

        map.addSource(sourceId, {
          type: 'geojson',
          data: line,
        });

        map.addLayer({
          id: layerId,
          type: 'line',
          source: sourceId,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': 'red',
            'line-width': 5,
          },
        });
      });

      map.on('click', (e) => {
        const features = map.queryRenderedFeatures(e.point);
        const lineFeatures = features.filter((feature) => feature.layer?.id?.includes('line-layer-'));
        if (lineFeatures.length > 0) {
          const coordinates = lineFeatures[0].geometry.coordinates;
          const popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<div>Coordinates: ${coordinates.toString()}</div>`)
            .addTo(map);
        }
      });
    });
  }, [lines, map]);

  return <div id='map' style={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }} />;
};

export{ MapContainer};
