import React, { useEffect } from 'react'
export interface css{
h?:string;
s?:string
}

export default function Details(css:css) {
    console.log(css)
    let height: string = "h-screen";
    let shadow: string = "border shadow-lg";
    if (css.h) height = css.h;
    if (css.s) shadow = css.s;
    useEffect(()=>{
    
    
    },[]);
  return (
    <div className={`flex items-center justify-center ${height} `}>
      <div className={`font-semibold text-center rounded-3xl ${shadow} p-10 px-20 max-w-lg`}>
        <img
          className="mb-3 w-32 h-32  object-cover  bg-slate-400 rounded-full shadow-lg mx-auto"
          src="https://tec.scot/sites/default/files/2021-02/default-profile-avatar.png"
          alt="user"
        />
        <h1 className="text-lg text-gray-800"> John Doe </h1>
        <h3 className="text-sm text-gray-400 "> 24, Male</h3>
        <h5 className="text-sm text-gray-400 "> sdjkk@gmail.com </h5>
      </div>
    </div>
  );
}
