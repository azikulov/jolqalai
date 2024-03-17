import { LngLatLike } from 'mapbox-gl';

export interface Coordinates {
  type: string;
  coordinates: number[][];
}

export interface GeoJSONFeature {
  type: string;
  geometry: Coordinates;
  properties?: object;
}

export interface MapContainerProps {
  accessToken: string;
  center?: LngLatLike;
  zoom?: number;
  lines: GeoJSONFeature[];
}