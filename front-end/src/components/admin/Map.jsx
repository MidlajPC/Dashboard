import React, { useEffect, useState } from "react";
import axios from "../../config/axios.config";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap
} from "react-leaflet";
const Map = () => {
  const ZoomToMarker = ({position}) => {
    console.log(position);
    const map = useMap();
    map.flyTo(position, 16, {
      animate: true,
      duration: 2,
      easeLinearity: 0.25
    });
  };
  const [bots, setbots] = useState([]);
  const [zoomTo, setzoomTo] = useState(null);
  const [selectedPin, setselectedPin] = useState(null);
  useEffect(() => {
    axios.get("/getbots").then((res) => {
      console.log(res);
      setbots(res.data.bots);
    });
  }, []);
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
          {bots.map((bot, idx) => (
            <Marker
              key={idx}
              position={[bot.Position.lat[0], bot.Position.lng[0]]}
              eventHandlers={{
                click: () => {
                  setzoomTo([bot.Position.lat[0], bot.Position.lng[0]]);
                  setselectedPin(bot);
                }
              }}
            >
              <Popup>{bot.name}</Popup>
            </Marker>
          ))}
          {zoomTo && <ZoomToMarker position={zoomTo} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
