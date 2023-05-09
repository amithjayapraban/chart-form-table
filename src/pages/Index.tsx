import React from 'react'
import { useNavigate} from "react-router-dom";
export default function Index() {
     const navigate = useNavigate();
  return (
    <div className="flex bg-orange-100 w-full justify-center items-center py-4 gap-8">
      <a
        href=""
        className="px-3 py-2 shadow rounded"
        onClick={() => navigate("/")}
      > 
        Chart
      </a>
      <a
        href=""
        className="px-3 py-2 shadow rounded"
        onClick={() => navigate("/Form")}
      >
        Form
      </a>
      <a
        href=""
        className="px-3 py-2 shadow rounded"
        onClick={() => navigate("/Table")}
      >
        Table
      </a>
    </div>
  );
}
