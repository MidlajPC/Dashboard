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
import socket from "../../config/socket";

const Analysis = () => {
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);
  dayjs.extend(isBetween);
  dayjs.extend(utc);

  const { botData, setbotData, getBots } = useBotData();
  console.log(botData);
  const [search, setsearch] = useState("");
  const [filteredLogs, setfilteredLogs] = useState([]);
  // useEffect(() => {
  //   axios.get("/getlogs").then((res) => {
  //     console.log(res);
  //     setlogs(res.data.logs);
  //   });
  // }, []);
  console.log(botData);
  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  const [filterRole, setfilterRole] = useState("");
  console.log(startDate, endDate, filterRole);
  useEffect(() => {
    const handleFilter = () => {
      let filtered = botData;
      if (search.trim().length > 0) {
        filtered = filtered.filter((log) => {
          return (log.UniqueCode || log.name.toLowerCase()).includes(
            search.toLocaleLowerCase()
          );
        });
      }
      setfilteredLogs(filtered);
      console.log(filteredLogs)
    };
    handleFilter();
  }, [search, botData]);
  const handleFilter = () => {
    let filtered = logs;
    if (filterRole && filterRole !== "All") {
      filtered = filtered.filter(
        (log) =>
          log.user.role.toLocaleLowerCase() === filterRole.toLocaleLowerCase()
      );
    }
    if (startDate && endDate) {
      filtered = filtered.filter((log) => {
        let logDate = dayjs(log.createdAt).local();
        console.log("Start:", dayjs(startDate).startOf("day").toISOString());
        console.log("End:", dayjs(endDate).endOf("day").toISOString());
        console.log("Log:", dayjs(log.createdAt).toISOString());
        return logDate.isBetween(
          dayjs(startDate).startOf("day"),
          dayjs(endDate).startOf("day"),
          null,
          "[]"
        );
      });
    }
    console.log(filtered);
    setfilteredLogs(filtered);
  };
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("userLogs", 10, 15);
    const tabledata = filteredLogs.flatMap((log, idx) =>
      log.actions
        .map((action, aidx) => ({
          ...action,
          logId: log._id,
          user: log.user
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((log) => [
          log.logId,
          log.user.name,
          log.action,
          log.details,
          new Date(log.createdAt).toLocaleString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          })
        ])
    );
    autoTable(doc, {
      head: [["_id", "Full Name", "Action", "Details", "Time"]],
      body: tabledata,
      startY: 20,
      margin: { left: 10 },
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
        0: { cellWidth: 30 }, // User ID
        1: { cellWidth: 35 }, // Full Name
        2: { cellWidth: 20 }, // Action
        3: { cellWidth: 70 }, // Details
        4: { cellWidth: 40 } // Time
      }
    });
    doc.save("userLog.pdf");
  };
  console.log(filteredLogs);
  // const flattenedLogs = filteredLogs
  //   .flatMap((log, idx) =>
  //     log.actions.map((action, aidx) => ({
  //       ...action,
  //       logId: log._id,
  //       user: log.user
  //     }))
  //   )
  //   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  //   .map((log) => [
  //     log.logId,
  //     log.user.name,
  //     log.action,
  //     log.details,
  //     new Date(log.createdAt).toLocaleString("en-US", {
  //       day: "2-digit",
  //       month: "2-digit",
  //       year: "numeric",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       hour12: true
  //     })
  //   ]);
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(flattenedLogs);
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
      <div className="mb-2 flex gap-2 ">
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
        <div className="">
          <BsFilterLeft
            onClick={toggleDrpDwn}
            className="h-[30px] mt-0 w-[35px]"
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
                              style={{
                                background:
                                  "radial-gradient(circle at top, #3a6db0, #1b1b1b)"
                              }}
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
                        {/*  button */}
                        <button
                          onClick={() => {
                            setstartDate(null), setendDate(null);
                          }}
                          className="mb-4 bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200"
                        >
                          All Dates
                        </button>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              toggleDrpDwn(), handleFilter();
                            }}
                            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
                          >
                            Apply
                          </button>
                          <button
                            onClick={toggleDrpDwn}
                            className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-sm hover:bg-gray-300 transition-colors duration-200"
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
        <div className=" ml-1 ">
          <FaFilePdf onClick={downloadPdf} className="h-[35px] w-[30px]" />
        </div>
        <div className="">
          <BsFiletypeXlsx
            onClick={downloadExcel}
            className="h-[35px] w-[30px]"
          />
        </div>
      </div>
      <div className="tbldiv">
        <table className="tbl">
          <thead className="tblhead">
            <tr>
              <th className="tblhdng">Sl. no.</th>
              <th className="tblhdng">User ID</th>
              <th className="tblhdng">Full name</th>
              <th className="tblhdng">Role</th>
              <th className="tblhdng">Action</th>
              <th className="tblhdng">Details</th>
              <th className="tblhdng">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs?.flatMap((log, idx) =>
              log.actions
                .map((action, aidx) => ({
                  ...action,
                  logId: log._id,
                  user: log.user
                }))
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((action, index) => (
                  <tr key={`${action.logId} - ${index}`} className="bg-e-o">
                    <td className="tblhdng ">{index + 1}</td>
                    <td className="tblhdng ">{action.logId}</td>
                    <td className="tblhdng"> {action.user.name}</td>
                    <td className="tblhdng"> {action.user.role}</td>
                    <td className="tblhdng ">{action.action}</td>
                    <td className="tblhdng max-w-[500px] break-words ">
                      {action.details}
                    </td>
                    <td className="tblhdng">
                      {new Date(action.createdAt).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                      })}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analysis;
