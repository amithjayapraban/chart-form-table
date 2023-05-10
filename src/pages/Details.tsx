import { useMemo } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAge } from "../util/getAge";

export interface props {
  h?: string;
  s?: string;
}

export default function Details(props: props) {
  var rows = useSelector((state: RootState) => state.formSliceReducer.data);
  var submittedData = useSelector(
    (state: RootState) => state.formSliceReducer.submited_Data
  );
  var { id } = useParams();
  var { h, s } = props;

  let height: string = "h-screen";
  let shadow: string = "border shadow ";
  if (h) height = h;
  if (s) shadow = s;

  const data: any = useMemo(() => {
    if (id) {
      let i: string = id;
      return rows.find((r) => r.id === parseInt(i));
    } else if (submittedData) {
      return submittedData;
    }
  }, [id, submittedData]);

  return (
    <div className={`flex overlayy items-center justify-center ${height} `}>
      <div
        className={`font-semibold text-center rounded-3xl ${shadow} p-10 px-20 max-w-lg`}
      >
        <img
          className="mb-3 w-32 h-32  object-cover  bg-slate-400 rounded-full shadow-lg mx-auto"
          src="https://tec.scot/sites/default/files/2021-02/default-profile-avatar.png"
          alt="user"
        />
        <h1 className="text-lg text-gray-800">
          {" "}
          {data?.first_name} &nbsp;{data?.last_name}{" "}
        </h1>
        <h3 className="text-sm text-gray-400 ">
          {data && getAge(data?.dob)}
          {data?.hasOwnProperty("age") && data?.age} &nbsp;
          {data?.gender}
        </h3>
        <h5 className="text-sm text-gray-400 "> {data?.email} </h5>
      </div>
    </div>
  );
}
