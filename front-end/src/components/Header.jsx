import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BadgeCheckIcon,
  LogOutIcon,
  Palette,
  UserRoundPen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "@/context/ThemeProvider";
import axios from "../config/axios.config";
import socket from "@/config/socket";

export default function Header({ activeSection }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    axios
      .post("/logout")
      .then((res) => {
        localStorage.removeItem("userId");
        toast.success(res.data.message || "Logged out successfully");
        socket.disconnect();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Logout failed");
      });
  };
  const [profileOpn, setprofileOpn] = useState(false);
  const handleProfileClick = () => {
    setprofileOpn(!profileOpn);
    navigate("/profile");
  };

  const { isDark, setisDark } = useTheme();
  const handleTheme = (e) => {
    setisDark(!isDark);
  };
  return (
    <div
      className=""
      style={{ borderBottom: "1px solid #e6e6e6", background: "#fff" }}
    >
      <div className="" style={{ padding: "12px 16px" }}>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span className=" text-[var(--text-color)] text-lg md:text-xl font-bold ml-16">
            {activeSection}
          </span>
          {/* Right: controls */}
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {/* Search */}
            {/* <li>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#f3f4f6",
                  padding: "6px 10px",
                  borderRadius: 8,
                  minWidth: 220,
                }}
              >
                <input
                  type="text"
                  placeholder="Search here..."
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: 14,
                    color: "#111827",
                  }}
                />
                <span style={{ marginLeft: 8, color: "#6b7280", display: "flex", alignItems: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" stroke="#6b7280" strokeWidth="1.5"></path>
                    <path d="M21 21l-4.35-4.35" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"></path>
                  </svg>
                </span>
              </div>
            </li> */}

            <button
              type="button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                padding: 6,
                cursor: "pointer",
              }}
              aria-label="notifications"
            >
              <Palette size={20} onClick={handleTheme} />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage alt="shadcn"></AvatarImage>
                    <AvatarFallback>
                      <UserRoundPen size={16} />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 p-1">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={handleProfileClick}
                    className="py-1 text-md"
                  >
                    <BadgeCheckIcon />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="py-2 text-md"
                    onClick={handleLogout}
                  >
                    <LogOutIcon />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile */}
            <li>
              <div style={{ position: "relative" }}>
                <button
                  type="button"
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: 0,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                  aria-haspopup="true"
                ></button>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
