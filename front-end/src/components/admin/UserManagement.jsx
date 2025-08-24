import React, { useEffect, useRef, useState } from "react";
import "../../css/dropdown.css";
import "../../css/Bg.css";
import { RiArrowDownWideLine } from "react-icons/ri";
import axios from "../../config/axios.config";
const UserManagement = () => {
  const [search, setsearch] = useState("");
  const [users, setusers] = useState([]);
  const [filteredUsers, setfilteredUsers] = useState([]);
  const [userRole, setuserRole] = useState("");
  const [activityStatus, setactivityStatus] = useState(null);
  const [isRoleDropdownOpen, setisRoleDropdownOpen] = useState(false);
  const [isActivityStatusDropdownOpen, setisActivityStatusDropdownOpen] =
    useState(false);
  const roleDropdownRef = useRef(null);
  const activityStatusDropdownRef = useRef(null);
  useEffect(() => {
    axios
      .get("/getusers")
      .then((res) => {
        console.log(res);
        setusers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const handleFilter = () => {
      let filtered = users;
      if (userRole) {
        filtered = filtered.filter(
          (user) => user.role.toLowerCase() === userRole.toLowerCase()
        );
      }
      if (activityStatus !== null) {
        filtered = filtered.filter(
          (user) => user.activityStatus === activityStatus
        );
      }
      if (search.trim().length > 0) {
        filtered = filtered.filter(
          (user) =>
            user.name?.toLocaleLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLocaleLowerCase().includes(search.toLowerCase()) ||
            String(user.phone)
              ?.toLowerCase()
              .includes(search.toLocaleLowerCase())
        );
      }
      setfilteredUsers(filtered);
    };
    handleFilter();
  }, [search, users, userRole, activityStatus]);
  const roleDropdown = () => {
    setisRoleDropdownOpen(!isRoleDropdownOpen);
  };
  const activityStatusDropdown = () => {
    setisActivityStatusDropdownOpen(!isActivityStatusDropdownOpen);
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
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        activityStatusDropdownRef.current &&
        !activityStatusDropdownRef.current.contains(event.target)
      ) {
        setisActivityStatusDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="m-2">
      <div className="mb-2 flex gap-2">
        <input
          type="search"
          placeholder="Search"
          className="search"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        <div className="dropdown-prnt-div" ref={roleDropdownRef}>
          <div onClick={roleDropdown} className="dropdown">
            <div className="dropdown-div2">
              <p>{userRole ? userRole : "User Role"}</p>
            </div>
            <span>
              <RiArrowDownWideLine />
            </span>
          </div>
          {isRoleDropdownOpen && (
            <div className="" style={{background: "radial-gradient(circle at top, #3a6db0, #1b1b1b)"}}>
              <div className="options-div dropdown-glass">
              <ul className="dropdown-ul">
                {["All", "Admin", "Operator"].map((role) => (
                  <li
                    className="dropdown-li"
                    key={role}
                    onClick={() => {
                      setuserRole(role === "All" ? "" : role);
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
        <div className="dropdown-prnt-div" ref={activityStatusDropdownRef}>
          <div onClick={activityStatusDropdown} className="dropdown">
            <div className="dropdown-div2">
              <p>
                {activityStatus && activityStatus === true
                  ? "Active"
                  : activityStatus === false
                  ? "Inactive"
                  : "Activity Status"}
              </p>
            </div>
            <span>
              <RiArrowDownWideLine />
            </span>
          </div>
          {isActivityStatusDropdownOpen && (
            <div className="" style={{background: "radial-gradient(circle at top, #3a6db0, #1b1b1b)"}}>
              <div className="options-div dropdown-glass">
                <ul className="dropdown-ul">
                  {["All", "Active", "Inactive"].map((status) => (
                    <li
                      className="dropdown-li"
                      key={status}
                      onClick={() => {
                        setactivityStatus(
                          status === "All" ? null : status === "Active"
                        );
                        setisActivityStatusDropdownOpen(false);
                      }}
                    >
                      {status}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="max-h-[calc(100vh-180px)] ">
        <dir className="tbldiv">
          <table className="tbl">
            <thead className="tblhead">
              <tr>
                {[
                  "Sl. no.",
                  "User ID",
                  "Full name",
                  "Email",
                  "Phone",
                  "Location",
                  "User role",
                  "Activity status",
                  "Action"
                ].map((heading, idx) => (
                  <th key={idx} className="tblhdng">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr key={user._id} className="bg-e-o">
                  <td className="tblhdng ">{idx + 1}</td>
                  <td className="tblhdng ">{user._id}</td>
                  <td className="tblhdng ">{user.name}</td>
                  <td className="tblhdng ">{user.email}</td>
                  <td className="tblhdng ">{user.phone} </td>
                  <td className="tblhdng ">{user.location} </td>
                  <td className="tblhdng ">{user.role}</td>
                  <td className="tblhdng flex items-center gap-2">
                    <span
                      className={`h-3 w-3 rounded-full ${
                        user.activityStatus ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    {user.activityStatus ? "Active" : "Inactive"}
                  </td>
                  <td className="tblhdn p-2 ">
                    <div className="flex gap-1">
                      <button className="edt-btn">Edit</button>
                      <button className="dlt-btn">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </dir>
      </div>
    </div>
  );
};

export default UserManagement;
