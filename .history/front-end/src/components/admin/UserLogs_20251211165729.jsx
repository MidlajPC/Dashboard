import React, { useEffect, useState } from "react";
import "../../css/dropdown.css";
import axios from "../../config/axios.config";
import { FaFilePdf } from "react-icons/fa6";
import { BsFiletypeXlsx } from "react-icons/bs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
const UserLogs = () => {
  const [logs, setlogs] = useState([]);
  const [search, setsearch] = useState("");
  const [filteredLogs, setfilteredLogs] = useState([]);
  useEffect(() => {
    axios.get("/getlogs").then((res) => {
      console.log(res);
      setlogs(res.data.logs);
    });
  }, []);
  useEffect(() => {
    const handleFilter = () => {
      let filtered = logs;
      if (search.trim().length > 0) {
        filtered = filtered.filter((log) => {
          return log.user?.name
            .toLowerCase()
            .includes(search.toLocaleLowerCase());
        });
      }
      setfilteredLogs(filtered);
    };
    handleFilter();
  }, [search, logs]);
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
  const flattenedLogs = filteredLogs
    .flatMap((log, idx) =>
      log.actions.map((action, aidx) => ({
        ...action,
        logId: log._id,
        user: log.user
      }))
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((log) => [
      log.logId,
      // log.user.name,
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
    ]);
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
  return (
    <div className="m-2 flex flex-col">
      <div className="mb-2 flex gap-1 ">
        <div>
          <input
            type="search"
            placeholder="Search"
            className="search"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>
        <div className=" ml-1 flex items-center ">
          <FaFilePdf
            onClick={downloadPdf}
            className=" h:[30px] w-[20px] lg:h-[35px] lg:w-[30px]"
          />
        </div>
        <div className="flex items-center">
          <BsFiletypeXlsx
            onClick={downloadExcel}
            className=" h:[30px]  w-[20px] lg:h-[35px] lg:w-[30px]"
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
              <th className="tblhdng">Action</th>
              <th className="tblhdng">Details</th>
              <th className="tblhdng">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.flatMap((log, idx) =>
              log.actions
                .map((action, aidx) => ({
                  ...action,
                  logId: log._id,
                  user: log.user
                }))
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((action, index) => (
                  <tr key={`${action.logId} - ${index}`} className="bg-e-o">
                    {console.log(log)}
                    <td className="tblhdng ">{index + 1}</td>
                    <td className="tblhdng ">{action.logId}</td>
                    <td className="tblhdng">{action.user?.name || "N/A"}</td>
                    <td className="tblhdng ">{action.action}</td>
                    <td className="tblhdng md:max-w-[500px] break-words ">
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

export default UserLogs;
