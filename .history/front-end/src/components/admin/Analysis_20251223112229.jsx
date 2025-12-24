import React, { useEffect, useRef, useState } from "react";
import "../../css/dropdown.css";
import axios from "../../config/axios.config";
import { FaFilePdf } from "react-icons/fa6";
import { BsFiletypeXlsx } from "react-icons/bs";
import { RiArrowDownWideLine } from "react-icons/ri";
import { BsFilterLeft } from "react-icons/bs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";

import { TextField, Box } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { createPortal } from "react-dom";
import { useBotData } from "../../context/BotContext";

const Analysis = () => {
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);
  dayjs.extend(isBetween);
  dayjs.extend(utc);

  const { botData, setbotData, botHistory } = useBotData();
  const [search, setsearch] = useState("");
  const [filteredAnalysis, setfilteredAnalysis] = useState([]);
  // useEffect(() => {
  //   axios.get("/getlogs").then((res) => {
  //     console.log(res);
  //     setlogs(res.data.logs);
  //   });
  // }, []);
  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  const [startTime, setstartTime] = useState("");
  const [endTime, setendTime] = useState("");
  const [filterRole, setfilterRole] = useState("");
  useEffect(() => {
    const handleFilter = () => {
      let filtered = botHistory;
      if (search.trim().length > 0) {
        filtered = filtered.filter((log) => {
          return (log.UniqueCode || log.name.toLowerCase()).includes(
            search.toLocaleLowerCase()
          );
        });
      }
      setfilteredAnalysis(filtered);
    };
    handleFilter();
  }, [search]);
  const handleFilter = () => {
    let filtered = botHistory;
    if (filterRole && filterRole !== "All") {
      filtered = filtered.filter(
        (log) =>
          log.data[0].operator?.role.toLocaleLowerCase() ===
          filterRole.toLocaleLowerCase()
      );
    }
    if (startDate && endDate) {
      filtered = filtered.filter((log) => {
        const rawDate = log.data?.[0]?.date;
        if (!rawDate) return false;

        const logDate = dayjs(rawDate).local();

        return logDate.isBetween(
          dayjs(startDate).startOf("day"),
          dayjs(endDate).endOf("day"),
          null,
          "[]"
        );
      });
    }
    if (startTime && endTime) {
      filtered = filtered.filter((log) => {
        const rawDate = log.data?.[0]?.date;
        if (!rawDate) return false;
        const logDate = dayjs(rawDate).local();
        const [startH, startM] = startTime.split(":").map(Number);
        const [endH, endM] = endTime.split(":").map(Number);
        const minutes = logDate.hour() * 60 + logDate.minute();
        const startMinutes = startH * 60 + startM;
        const endMinutes = endH * 60 + endM;

        return minutes >= startMinutes && minutes <= endMinutes;
      });
    }
    console.log(filtered);
    setfilteredAnalysis(filtered);
  };
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Analysis", 5, 10);
    const tabledata = filteredAnalysis.flatMap((log, idx) =>
      (log.data ?? [])
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((data, didx) => [
          idx + 1,
          log.UniqueCode,
          log.name,
          data.position?.city ?? "N/A",
          data.Status ?? "N/A",
          data.operator?.name ?? "N/A",
          data.operator?.email ?? "N/A",
          data.operator?.role ?? "N/A",
          new Date(data.date).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          }),
          new Date(data.date).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
          })
        ])
    );
    autoTable(doc, {
      head: [
        [
          "Sl No",
          "Bot ID",
          "Bot Name",
          "Location",
          "Status",
          "Operator Name",
          "Operator Email",
          "Operator Role",
          "Time",
          "Date"
        ]
      ],
      body: tabledata,
      startY: 15,
      margin: { left: 2 },
      theme: "grid", // gives proper borders
      headStyles: {
        fillColor: [41, 128, 185], // nice blue header
        textColor: [255, 255, 255],
        fontStyle: "bold"
      },
      bodyStyles: {
        fontSize: 10,
        cellPadding: 3
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245] // zebra stripe effect
      },
      styles: {
        overflow: "linebreak", // wrap long text
        cellWidth: "wrap"
      },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 15 },
        2: { cellWidth: 15 },
        3: { cellWidth: 20 },
        4: { cellWidth: 20 },
        5: { cellWidth: 30 },
        6: { cellWidth: 35 },
        7: { cellWidth: 20 },
        8: { cellWidth: 20 },
        9: { cellWidth: 20 }
      }
    });
    doc.save("Analysis.pdf");
  };
  const flattenedAnalysis = filteredAnalysis.flatMap((log, idx) => {
    (log ?? []).slice().sort((a,b)=> new Date(b.date)-new Date(a.date))
  });
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(flate);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "UserLog");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "userLog.xlsx");
  };
  const [isfilterDrpdwnOpn, setisfilterDrpdwnOpn] = useState(false);
  const toggleDrpDwn = () => {
    setisfilterDrpdwnOpn(!isfilterDrpdwnOpn);
  };
  const [isRoleDropdownOpen, setisRoleDropdownOpen] = useState(false);
  const roleDropdownRef = useRef(null);
  const roleDropdown = () => {
    setisRoleDropdownOpen(!isRoleDropdownOpen);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        roleDropdownRef.current &&
        !roleDropdownRef.current.contains(event.target)
      ) {
        setisRoleDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <div className="m-2 flex flex-col">
      <div className="mb-2 flex gap-1 ">
        {/* search */}
        <div>
          <input
            type="search"
            placeholder="Search"
            className="search"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>
        {/* filter */}
        <div className="ml-1 flex items-center">
          <BsFilterLeft
            onClick={toggleDrpDwn}
            className="h-[30px] w-[35px] mt-0"
          />
          {isfilterDrpdwnOpn &&
            createPortal(
              <div className="add-user-modal-prnt-div">
                <div className="overlay-blur-div"></div>
                <div
                  className="add-usr-modal rounded-lg shadow-lg border border-gray-300 p-5 w-full
                     max-w-md sm:max-w-lg md:max-w-xl min-h-[200px] flex flex-col z-50"
                >
                  <div className="backdrop-blur-2xl bg-black/20"></div>
                  <div className="">
                    <div className="rounded-2xl h-full">
                      <ul className="dropdown-ul">
                        {/* role dropedown  */}
                        <div
                          className="dropdown-prnt-div mb-3.5"
                          ref={roleDropdownRef}
                        >
                          <div onClick={roleDropdown} className="dropdown">
                            <div className="dropdown-div2">
                              <p>{filterRole ? filterRole : "User Role"}</p>
                            </div>
                            <span>
                              <RiArrowDownWideLine />
                            </span>
                          </div>
                          {isRoleDropdownOpen && (
                            <div
                              className=""
                              // style={{
                              //   background:
                              //     "radial-gradient(circle at top, #3a6db0, #1b1b1b)"
                              // }}
                            >
                              <div className="inner-options-div dropdown-glass">
                                <ul className="dropdown-ul">
                                  {["All", "Admin", "Operator"].map((role) => (
                                    <li
                                      className="dropdown-li"
                                      key={role}
                                      onClick={() => {
                                        setfilterRole(
                                          role === "All" ? "" : role
                                        );
                                        setisRoleDropdownOpen(false);
                                      }}
                                    >
                                      {role}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* date range */}
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box
                              sx={{
                                display: "flex",
                                gap: 2,
                                mb: 3,
                                color: "wheat"
                              }}
                            >
                              <DatePicker
                                className=""
                                label="Start Date"
                                value={startDate}
                                onChange={(newvalue) => setstartDate(newvalue)}
                              />
                              <DatePicker
                                label="End Date"
                                value={endDate}
                                minDate={startDate}
                                onChange={(newvalue) => setendDate(newvalue)}
                              />
                            </Box>
                            <ul></ul>
                          </LocalizationProvider>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          {/* time range */}
                          <div className="flex gap-2 mb-3">
                            <TextField
                              label="Start Time"
                              type="time"
                              value={startTime}
                              onChange={(e) => setstartTime(e.target.value)}
                              InputLabelProps={{
                                shrink: true
                              }}
                              inputProps={{
                                step: 300 // 5 min steps
                              }}
                            />
                            <TextField
                              label="End Time"
                              type="time"
                              value={endTime}
                              onChange={(e) => setendTime(e.target.value)}
                              InputLabelProps={{
                                shrink: true
                              }}
                              inputProps={{
                                step: 300
                              }}
                            />
                          </div>
                          {/*  buttons */}
                          <div className="flex gap-2 ">
                            <button
                              onClick={() => {
                                setstartDate(null), setendDate(null);
                              }}
                              className="btn2 bg-green-600 text-white py-2 px-5 rounded-md shadow-md hover:bg-green-700 transition-colors duration-200"
                            >
                              All Dates
                            </button>
                            <button
                              onClick={() => {
                                setstartTime(""), setendTime("");
                              }}
                              className="btn2 bg-green-600 text-white py-2 px-5 rounded-md shadow-md hover:bg-green-700 transition-colors duration-200"
                            >
                              All Time
                            </button>
                          </div>
                        </div>
                        <div className=" mt-2 flex gap-2">
                          <button
                            onClick={() => {
                              toggleDrpDwn(), handleFilter();
                            }}
                            className="btn bg-blue-600 text-white py-2 px-5 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200"
                          >
                            Apply
                          </button>
                          <button
                            onClick={toggleDrpDwn}
                            className="btn !bg-red-500 text-gray-800 py-2 px-5 rounded-md shadow-sm hover:bg-gray-300 transition-colors duration-200"
                          >
                            Cancel
                          </button>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>,
              document.body
            )}
        </div>
        <div className="flex items-center ">
          <FaFilePdf
            onClick={downloadPdf}
            className="h:[30px]  w-[20px] lg:h-[35px] lg:w-[30px]"
          />
        </div>
        <div className="flex items-center">
          <BsFiletypeXlsx
            onClick={downloadExcel}
            className="h:[30px]  w-[20px] lg:h-[35px] lg:w-[30px]"
          />
        </div>
      </div>
      <div className="tbldiv">
        <table className="tbl">
          <thead className="tblhead">
            <tr>
              <th className="tblhdng">Sl. no.</th>
              <th className="tblhdng">Bot ID</th>
              <th className="tblhdng">Bot Name</th>
              <th className="tblhdng">Location</th>
              <th className="tblhdng">Status</th>
              <th className="tblhdng">Operator Name</th>
              <th className="tblhdng">Operator Email</th>
              <th className="tblhdng">Operator Role</th>
              <th className="tblhdng">Time</th>
              <th className="tblhdng">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnalysis?.flatMap((log, idx) => {
              return log.data.map((data) => (
                <tr key={`${log._id} - ${idx}`} className="bg-e-o">
                  <td className="tblhdng ">{idx + 1}</td>
                  <td className="tblhdng ">{log.UniqueCode}</td>
                  <td className="tblhdng"> {log.name}</td>
                  <td className="tblhdng"> {data.position.city}</td>
                  <td className="tblhdng ">{data.Status}</td>
                  <td className="tblhdng max-w-[500px] break-words ">
                    {data.operator?.name}
                  </td>
                  <td className="tblhdng max-w-[500px] break-words ">
                    {data.operator?.email}
                  </td>
                  <td className="tblhdng max-w-[500px] break-words ">
                    {data.operator?.role}
                  </td>
                  <td className="tblhdng">
                    {new Date(data.date).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true
                    })}
                  </td>
                  <td className="tblhdng">
                    {new Date(data.date).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric"
                      // hour: "2-digit",
                      // minute: "2-digit",
                      // hour12: true
                    })}
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analysis;
