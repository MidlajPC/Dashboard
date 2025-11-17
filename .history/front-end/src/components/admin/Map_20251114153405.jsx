import React, { useEffect, useRef, useState } from "react";
import axios from "../../config/axios.config";
import "../../css/map.css";
import { ImLocation } from "react-icons/im";
import { divIcon } from "leaflet";
import ReactDOMServer from "react-dom/server";
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
import { useBotData } from "../../context/BotContext";

const Map = () => {
  const iconMarkup = ReactDOMServer.renderToString(
    <ImLocation size={30} color="#7393b3  " />
  );
  const customIcon = divIcon({
    html: iconMarkup,
    className: "",
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });
  const [bots, setbots] = useState([]);
  const { botData } = useBotData();
  const [zoomTo, setzoomTo] = useState(null);
  const [selectedPin, setselectedPin] = useState(null);
  const ZoomToMarker = ({ position, z }) => {
    const map = useMap();
    useEffect(() => {
      if (position[0] === 13.0827 && position[1] === 80.2707) {
        z = 12;
      }
      map.flyTo(position, z, {
        animate: true,
        duration: 3,
        easeLinearity: 0.25
      });
    }, [position, map]);
    return null;
  };
  const chennaiCenter = [13.0827, 80.2707];
  const kochiCenter = [9.9312, 76.2673];
  const FlyToCity = React.({ city }) => {
    const map = useMap();
    useEffect(() => {
      let center = chennaiCenter;
      if (city === "Kochi") center = kochiCenter;
      map.flyTo(center, 12, {
        animate: true,
        duration: 3,
        easeLinearity: 0.25
      });
    }, [city, map]);
    return null;
  };
  useEffect(() => {
    // axios.get("/getbots").then((res) => {
    //   console.log(res);
    //   setbots(res.data.bots);
    // });
    setbots(botData);
  }, [botData]);
  const locationRef = useRef(null);
  // const operatorRef = useRef(null);
  const [isLctnDrpDwnOpen, setisLctnDropDownOpen] = useState(false);
  // const [isOprtrDrpDwnOpen, setisOprtrDrpDwnOpen] = useState(false);
  const toggleLctnDrpDwn = () => {
    setisLctnDropDownOpen(!isLctnDrpDwnOpen);
  };
  // const toggleOprtrDrpDwn = () => {
  //   setisOprtrDrpDwnOpen(!isOprtrDrpDwnOpen);
  // };
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
  // useEffect(() => {
  //   const handleOutsideClick = (event) => {
  //     if (operatorRef.current && !operatorRef.current.contains(event.target)) {
  //       setisOprtrDrpDwnOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleOutsideClick);
  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, []);
  const uniqueCities = [
    "All",
    ...new Set(bots.map((bot) => bot.data[0].position.city))
  ];
  // const uniqueOprtr = [
  //   "All",
  //   ...new Set(bots.map((bot) => bot.data[0].operator.name))
  // ];
  const [selectedCity, setselectedCity] = useState("All");
  const [slctdCityTitle, setslctdCityTitle] = useState("All");
  // const [selectedOprtr, setselectedOprtr] = useState("");
  const [filteredBots, setfilteredBots] = useState([]);
  const [filtervalues, setfiltervalues] = useState({
    selectedCity: ""
    // selectedOprtr
  });
  const handleApplyBtn = () => {
    setselectedCity(filtervalues.selectedCity);
    // setselectedOprtr(filtervalues.selectedOprtr);
  };
  useEffect(() => {
    const handleFilteredBots = () => {
      let filtered = bots;
      if (selectedCity && selectedCity !== "All") {
        filtered = filtered.filter(
          (bot) => bot.data[0].position.city === selectedCity
        );
      }
      // if (selectedOprtr && selectedOprtr !== "All") {
      //   filtered = filtered.filter(
      //     (bot) => bot.data[0].operator.name === selectedOprtr
      //   );
      // }
      setfilteredBots(filtered);
    };
    handleFilteredBots();
  }, [
    bots,
    selectedCity
    // , selectedOprtr
  ]);
  useEffect(() => {
    setzoomTo(null);
    setselectedPin(null);
  }, [
    selectedCity
    // , selectedOprtr
  ]);
  console.log(selectedPin);
  return (
    <div className="m-2 flex flex-1 flex-col ">
      <div className="flex mb-1 gap-1">
        {/* city dropdown */}
        <div className="relative w-[130px]" ref={locationRef}>
          <div className="dropdown" onClick={toggleLctnDrpDwn}>
            <p>
              {slctdCityTitle.length > 0
                ? slctdCityTitle === "All"
                  ? "City"
                  : slctdCityTitle
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
                        setfiltervalues({
                          ...filtervalues,
                          selectedCity: city
                        });
                        setisLctnDropDownOpen(!isLctnDrpDwnOpen);
                        setslctdCityTitle(city);
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
        {/* <div className="relative w-[130px]" ref={operatorRef}>
          <div className="dropdown overflow-x-hidden" onClick={toggleOprtrDrpDwn}>
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
                        setfiltervalues({
                          ...filtervalues,
                          selectedOprtr: operator
                        });
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
        </div> */}
        <button onClick={handleApplyBtn} className="apply-btn">
          Apply
        </button>
      </div>
      <div className="w-full h-[calc(100vh-190px)] flex flex-col overflow-y-auto ">
        <div className={` w-full ${selectedPin ? "h-3/4" : "flex-1"} `}>
          <MapContainer
            center={chennaiCenter}
            zoom={13}
            className="h-full w-full"
            scrollWheelZoom={true}
          >
            <LayersControl position="bottomleft">
              <LayersControl.BaseLayer checked name="OpenSreetMap">
                <TileLayer
                  // attribution="&copy; openstreetmap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="sataliteMap">
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  maxZoom={20}
                  subdomains={["mt1", "mt2", "mt3"]}
                />
              </LayersControl.BaseLayer>
            </LayersControl>
            {filteredBots.map((bot, idx) => (
              <Marker
                icon={customIcon}
                key={idx}
                position={[bot.data[0].position.lat, bot.data[0].position.lng]}
                eventHandlers={{
                  click: () => {
                    setzoomTo([
                      bot.data[0].position.lat,
                      bot.data[0].position.lng
                    ]);
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
            <FlyToCity city={selectedCity} />
            {zoomTo && <ZoomToMarker position={zoomTo} z={16} />}
          </MapContainer>
        </div>
        {selectedPin && (
          <div className="grid grid-cols-4 gap-1 overflow-y-auto pb-2">
            {console.log(selectedPin)}
            <div className="d-card bg-amber-300 col-span-4 pl-[10px] pt-[2px] h-[30px]">
              Id: {selectedPin.UniqueCode}
            </div>
            <div className="d-card bg-amber-200 pl-[10px] pt-[10px] h-[50px]">
              Uptime: {selectedPin.data[0].Robotuptime}
            </div>
            <div className="d-card bg-amber-200 pl-[10px] pt-[10px] h-[50px]">
              Battery: {selectedPin.data[0].Battery}%
            </div>
            <div className="d-card bg-amber-200 pl-[10px] pt-[10px] h-[50px]">
              Didtance Covered: {selectedPin.data[0].DistanceCovered} KM
            </div>
            <div className="d-card bg-amber-200 pl-[10px] pt-[10px] h-[50px]">
              Wastetraystatus: {selectedPin.data[0].Wastetraystatus}
            </div>
            <div className="col-span-4 flex gap-1">
              <div className=" bg-white rounded-sm overflow-hidden flex-1">
                <table className="tbl">
                  <thead className="tblhead h-[25px]">
                    <tr className="tblhdng">
                      <th className="pl-5">Date</th>
                      <th>User Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPin.operators.map((operator, idx) => (
                      <tr key={idx}>
                        <td className="pl-5">
                          {new Date(operator.date).toLocaleString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                          })}
                        </td>
                        {/* <td>{operator.user.name}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className=" bg-white w-[100px] flex-1 overflow-hidden !rounded-sm">
                <table className="tbl rounded-2xl ">
                  <thead className="tblhead h-[25px]">
                    <tr className="tblhdng">
                      <th className="pl-5">Runtime</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPin.operators.map((operator, idx) => (
                      <tr key={idx}>
                        <td className="pl-5">{operator.runtime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
