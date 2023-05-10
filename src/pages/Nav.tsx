import React from 'react'
import { useNavigate} from "react-router-dom";
export default function Nav() {
     const navigate = useNavigate();
  return (
    <div className="flex text-orange-50 border-b  font-bold bg-emerald-400 w-full justify-start items-center pt-6 pb-2 px-4 gap-8">
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
