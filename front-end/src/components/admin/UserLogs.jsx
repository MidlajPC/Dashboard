import React, { useEffect, useState } from "react";
import "../../css/dropdown.css";
import axios from "../../config/axios.config";
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
          return log.user.name
            .toLowerCase()
            .includes(search.toLocaleLowerCase());
        });
      }
      setfilteredLogs(filtered);
    };
    handleFilter();
  }, [search, logs]);
  return (
    <div className="m-2 flex flex-col">
      <div className="mb-2">
        <input
          type="search"
          placeholder="Search"
          className="search"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
      </div>
      <div className="h-[calc(100vh-180px)] rounded-lg">
        <div className="tbldiv overflow-auto h-full">
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
                      <td className="tblhdng ">{index + 1}</td>
                      <td className="tblhdng ">{action.logId}</td>
                      <td className="tblhdng"> {action.user.name}</td>
                      <td className="tblhdng ">{action.action}</td>
                      <td className="tblhdng max-w-[500px] break-words ">
                        {action.details}
                      </td>
                      <td className="tbl">
                        {new Date(action.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserLogs;
