import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "../../css/dropdown.css";
import "../../css/Bg.css";
import { toast } from "react-toastify";
import { RiArrowDownWideLine } from "react-icons/ri";
import axios from "../../config/axios.config";
const UserManagement = () => {
  const [search, setsearch] = useState("");
  const [users, setusers] = useState([]);
  const [filteredUsers, setfilteredUsers] = useState([]);
  const [userRole, setuserRole] = useState("");
  const [activityStatus, setactivityStatus] = useState(null);
  const [isRoleDropdownOpen, setisRoleDropdownOpen] = useState(false);
  const [isAddUserOpen, setisAddUserOpen] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [isUserActive, setisUserActive] = useState(true);
  const [formvalue, setformvalue] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "",
  });
  const [isActivityStatusDropdownOpen, setisActivityStatusDropdownOpen] =
    useState(false);
  const roleDropdownRef = useRef(null);
  const activityStatusDropdownRef = useRef(null);
  useEffect(() => {
    axios
      .get("/getusers")
      .then((res) => {
        console.log(res);
        setusers(res.data.data || []);
      })
      .catch((err) => {
        console.log(err);
        setusers([]);
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
  const toggleaddUser = () => {
    setisAddUserOpen(!isAddUserOpen);
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
  const handleEdit = (user) => {
    setisEdit(true);
    setisUserActive(user.activityStatus);
    setformvalue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      role: user.role,
      activityStatus: user.activityStatus
    });
    console.log(formvalue);
    setisAddUserOpen(true);
  };
  const handleDelete = (id) => {
    axios
      .delete(`/deleteuser/${id}`)
      .then((res) => {
        setusers(res.data.users);
        toast.success("User Deleted");
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Delete Failed!");
      });
  };
  const handleAddUser = (e) => {
    e.preventDefault();
    console.log(formvalue);
    axios
      .post("/adduser", formvalue)
      .then((res) => {
        console.log(res.data);
        setusers(res.data.users);
        toggleaddUser();
        setformvalue({
          name: "",
          email: "",
          phone: "",
          location: "",
          role: "",
        });
        toast.success("New User Added");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to Add New User!");
      });
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log(formvalue);
    axios
      .put(`/edituser/${formvalue._id}`, formvalue)
      .then((res) => {
        console.log(res);
        setusers(res.data.users);
        toggleaddUser();
        setformvalue({
          name: "",
          email: "",
          phone: "",
          location: "",
          role: "",
          _id: ""
        });
        toast.success("User Updated");
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Failed to Update User!");
      });
  };
  return (
    <div className="m-2">
      <div className="mb-2 flex gap-2">
        <div>
          <input
            type="search"
            placeholder="Search"
            className="search"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>
        {/* role dropdown */}
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
            <div
              className=""
              style={{
                background: "radial-gradient(circle at top, #3a6db0, #1b1b1b)"
              }}
            >
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
        {/*  activity status dropdown */}
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
            <div
              className=""
              style={{
                background: "radial-gradient(circle at top, #3a6db0, #1b1b1b)"
              }}
            >
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
        {/*  add new user Section */}
        <div className="dropdown-prnt-div ">
          <button className="add-user-btn" onClick={toggleaddUser}>
            Add User
          </button>
        </div>
      </div>
      {/* add user modal */}
      {isAddUserOpen &&
        createPortal(
          <div className="add-user-modal-prnt-div">
            <div className="overlay-blur-div"></div>
            <div
              className="add-usr-modal rounded-lg shadow-lg border border-gray-300 p-5 w-full
           max-w-md sm:max-w-lg md:max-w-xl min-h-[500px] flex flex-col z-50"
            >
              <div className="backdrop-blur-2xl bg-black/20"></div>
              <form
                className="p-5"
                onSubmit={isEdit ? handleEditSubmit : handleAddUser}
              >
                <div className="text-center text-xl font-semibold mb-4">
                  {isEdit ? "Edit User" : "Add User"}
                </div>
                {["Name", "Email", "Phone", "Location", "Role"].map((feild) => (
                  <input
                    key={feild}
                    className="bg-white w-full h-[50px] rounded-lg pl-[20px] text-xs mb-1 mt-1
                   border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={feild}
                    name={feild}
                    value={formvalue[feild.toLowerCase()]}
                    onChange={(e) =>
                      setformvalue({
                        ...formvalue,
                        [feild.toLowerCase()]: e.target.value
                      })
                    }
                    required
                    type={
                      feild === "Email"
                        ? "email"
                        : feild === "Phone"
                        ? "number"
                        : "text"
                    }
                  />
                ))}
                {/* {isEdit && ( */}
                {console.log(isUserActive)}
                <div
                  onClick={() => {
                    const status = !isUserActive;
                    setisUserActive(status);
                    setformvalue((prev) => ({
                      ...prev,
                      activityStatus: status
                    }));
                  }}
                  className={`flex justify-center mt-2 mb-2 w-full p-2  rounded-md text-white cursor-pointer 
                   ${isUserActive ? "bg-red-500" : "bg-green-500"}`}
                >
                  {isUserActive ? "Deactivate" : "Activate"}
                </div>
                {/* )} */}
                <button
                  type="submit"
                  className={`w-full py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold transition-colors 
                    duration-200 ${isEdit ? "" : "mt-2"}`}
                >
                  {isEdit ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toggleaddUser();
                    setisEdit(!isEdit);
                    setformvalue({
                      name: "",
                      email: "",
                      phone: "",
                      location: "",
                      role: "",
                      _id: ""
                    });
                  }}
                  className="w-full mt-2 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-semibold transition-colors
                 duration-200"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}
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
                      <button
                        className="edt-btn"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="dlt-btn"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
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
