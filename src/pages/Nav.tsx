import React from 'react'
import { useNavigate} from "react-router-dom";
export default function Nav() {
     const navigate = useNavigate();
  return (
    <div className="flex text-white font-semibold bg-indigo-700 w-full justify-start items-center p-4 gap-8">
      <a href="" className="rounded" onClick={() => navigate("/")}>
        Chart
      </a>
      <a href="" className="rounded" onClick={() => navigate("/Form")}>
        Form
      </a>
      <a href="" className="rounded" onClick={() => navigate("/Table")}>
        Table
      </a>
    </div>
  );
}
