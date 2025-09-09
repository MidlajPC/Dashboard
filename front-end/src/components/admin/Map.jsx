import React, { useEffect, useRef, useState } from "react";
import axios from "../../config/axios.config";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap
} from "react-leaflet";
import "../../css/dropdown.css";
import { RiArrowDownWideLine } from "react-icons/ri";

const Map = () => {
  const ZoomToMarker = ({ position, z }) => {
    const map = useMap();
    useEffect(() => {
      if (position[0] === 13.0827 && position[1] === 80.2707) {
        z = 12;
      }
      map.flyTo(position, z, {
        animate: true,
        duration: 2,
        easeLinearity: 0.25
      });
    }, [position, map]);
    return null
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
  const locationRef = useRef(null);
  const operatorRef = useRef(null);
  const [isLctnDrpDwnOpen, setisLctnDropDownOpen] = useState(false);
  const [isOprtrDrpDwnOpen, setisOprtrDrpDwnOpen] = useState(false);
  const toggleLctnDrpDwn = () => {
    setisLctnDropDownOpen(!isLctnDrpDwnOpen);
  };
  const toggleOprtrDrpDwn = () => {
    setisOprtrDrpDwnOpen(!isOprtrDrpDwnOpen);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setisLctnDropDownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (operatorRef.current && !operatorRef.current.contains(event.target)) {
        setisOprtrDrpDwnOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const uniqueCities = ["All", ...new Set(bots.map((bot) => bot.city))];
  const uniqueOprtr = ["All", ...new Set(bots.map((bot) => bot.operator))];
  const [selectedCity, setselectedCity] = useState("");
  const [selectedOprtr, setselectedOprtr] = useState("");
  const [filteredBots, setfilteredBots] = useState([]);
  useEffect(() => {
    const handleFilteredBots = () => {
      let filtered = bots;
      if (selectedCity && selectedCity !== "All") {
        filtered = filtered.filter((bot) => bot.city === selectedCity);
      }
      if (selectedOprtr && selectedOprtr !== "All") {
        filtered = filtered.filter((bot) => bot.operator === selectedOprtr);
      }
      setfilteredBots(filtered);
    };
    handleFilteredBots();
    setzoomTo([13.0827, 80.2707]);
  }, [bots, selectedCity, selectedOprtr]);
  return (
    <div className="m-2 flex flex-1 flex-col ">
      <div className="flex mb-1 gap-1">
        {/* city dropdown */}
        <div className="relative w-[130px]" ref={locationRef}>
          <div className="dropdown" onClick={toggleLctnDrpDwn}>
            <p>
              {selectedCity.length > 0
                ? selectedCity === "All"
                  ? "City"
                  : selectedCity
                : "City"}
            </p>
            <span>
              <RiArrowDownWideLine />
            </span>
          </div>
          {isLctnDrpDwnOpen && (
            <div
              className="relative "
              style={{
                background: "radial-gradient(circle at top, #3a6db0, #1b1b1b)"
              }}
            >
              <div className="options-div-map dropdown-glass">
                <ul className="dropdown-ul">
                  {uniqueCities.map((city, idx) => (
                    <li
                      key={idx}
                      className="dropdown-li"
                      onClick={() => {
                        setselectedCity(city);
                        setisLctnDropDownOpen(!isLctnDrpDwnOpen);
                      }}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        {/* operator dropdown */}
        <div className="relative w-[130px]" ref={operatorRef}>
          <div className="dropdown" onClick={toggleOprtrDrpDwn}>
            <p>
              {selectedOprtr.length > 0
                ? selectedOprtr === "All"
                  ? "Operator"
                  : selectedOprtr
                : "Operator"}
            </p>
            <span>
              <RiArrowDownWideLine />
            </span>
          </div>
          {isOprtrDrpDwnOpen && (
            <div
              className="relative "
              style={{
                background: "radial-gradient(circle at top, #3a6db0, #1b1b1b)"
              }}
            >
              <div className="options-div-map dropdown-glass">
                <ul className="dropdown-ul">
                  {uniqueOprtr.map((operator, idx) => (
                    <li
                      key={idx}
                      className="dropdown-li"
                      onClick={() => {
                        setselectedOprtr(operator);
                        setisOprtrDrpDwnOpen(!isOprtrDrpDwnOpen);
                      }}
                    >
                      {operator}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className=" w-full h-[calc(100vh-190px)] ">
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
          {filteredBots.map((bot, idx) => (
            <Marker
              key={idx}
              position={[bot.Position.lat[0], bot.Position.lng[0]]}
              eventHandlers={{
                click: () => {
                  setzoomTo([bot.Position.lat[0], bot.Position.lng[0]]);
                  setselectedPin(bot);
                },
                popupclose: () => {
                  setselectedPin(null);
                  setzoomTo(null);
                }
              }}
            >
              <Popup>{bot.name}</Popup>
            </Marker>
          ))}
          {zoomTo && <ZoomToMarker position={zoomTo} z={16} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
