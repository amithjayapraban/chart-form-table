import React from "react";
import { useNavigate } from "react-router-dom";
export default function Nav() {
  const navigate = useNavigate();
  return (
    <div className="flex relative text-gray-600  font-semibold bg-white  w-full justify-start items-center pt-6 pb-2 px-4 gap-8">
      <a href="" className=" tracking-wide" onClick={() => navigate("/")}>
        📊
      </a>
      <a
        href=""
        className="rounded tracking-wide"
        onClick={() => navigate("/")}
      >
        Chart
      </a>
      <a
        href=""
        className="rounded tracking-wide"
        onClick={() => navigate("/Form")}
      >
        Form
      </a>
      <a
        href=""
        className="rounded tracking-wide"
        onClick={() => navigate("/Table")}
      >
        Table
      </a>
    </div>
  );
}
