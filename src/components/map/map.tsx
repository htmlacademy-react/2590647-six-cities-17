import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map/use-map';
import { City, Points, Point } from '../../types/offer';
import { mapMarker } from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  points: Points;
  selectedPoint: Point | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: mapMarker.Default,
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: mapMarker.Current,
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

function Map(props: MapProps): JSX.Element {
  const { city, points, selectedPoint } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point === selectedPoint
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      if (selectedPoint && map.getContainer() && map.getContainer().closest('.offer__map')) {
        const currentOfferMarker = new Marker({
          lat: selectedPoint.latitude,
          lng: selectedPoint.longitude,
        }).setIcon(currentCustomIcon);

        currentOfferMarker.addTo(markerLayer);

        map.scrollWheelZoom.disable();
        map.touchZoom.disable();
        map.dragging.disable();
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}

export default Map;
