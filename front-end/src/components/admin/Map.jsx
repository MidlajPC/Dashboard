import React from "react";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap
} from "react-leaflet";
const Map = () => {
  const ZoomToMarker = (position) => {
    const map = useMap();
    map.flyTo(position, 16, {
      animate: true,
      duration: 2,
      easeLinearity: 0.25
    });
  };

  return (
    <div className="m-2 flex flex-1 ">
      <div className=" w-full h-[calc(100vh-140px)] ">
        <MapContainer
          center={[13.0827, 80.2707]}
          zoom={13}
          className="h-full w-full"
          // scrollWheelZoom={false}
        >
          <LayersControl position="bottomleft">
            <LayersControl.BaseLayer checked name="OpenSreetMap">
              <TileLayer
                // attribution="&copy; openstreetmap contributors"
                // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z} "
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="sataliteMap">
              <TileLayer
                url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                // url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                maxZoom={20}
                subdomains={["mt1", "mt2", "mt3"]}
              />
            </LayersControl.BaseLayer>
          </LayersControl>
          <Marker position={[51.505, -0.09]}>
            <Popup>a marker</Popup>
          </Marker>
          {/* <ZoomToMarker position={[51.505, -0.09]} /> */}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
