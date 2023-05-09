import { useForm, SubmitHandler } from "react-hook-form";
import Details from "./Details";
import { useEffect } from "react";
type Inputs = {
  first_name: string;
  last_name: string;
  age: number;
  gender: string;
  email: string;
};
var deact = `bg-slate-100`;
var act = `bg-emerald-500`;
export interface props {
  h?: string;
  s?: string;
  p?: string;
  w?: string;
  edit?: boolean;
}
export default function Form(css: props) {
  let { edit } = css;
  let height: string = "h-full";
  let padding: string = "py-20";
  let width: string = "md:w-[48%]";
  if (css.h) height = css.h;
  if (css.p) padding = css.p;
  if (css.w) width = css.w;

  function enableSubmit() {
    let inputs = document.getElementsByClassName(
      "_input"
    ) as HTMLCollectionOf<HTMLInputElement>;

    let button = document.querySelector(
      'input[type="submit"]'
    ) as HTMLButtonElement;

    var valid = true;
    var flag = true;
    for (var i = 0; i < inputs.length; i++) {
      let changedInput = inputs[i];
      if (changedInput?.value.trim() === "" || changedInput?.value === null) {
        valid = false;
        flag = false;
        break;
      }
    }
    if (flag == false) {
      button.classList.replace("cursor-pointer", "cursor-not-allowed");
      button.classList.replace(act, deact);
    } else {
      valid && button.classList.replace(deact, act);
      button.classList.replace("cursor-not-allowed", "cursor-pointer");
    }
    button.disabled = !valid;
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  let bg:string='bg-white';
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    document.getElementById("Dialog_view")?.classList.toggle("hidden");
    bg='bg-gray-400'
  };
  return (
    <div
      className={`w-full relative ${height} flex-col ${bg} items-center flex ${padding} justi fy-center`}
    >
      <form
        className={`flex ${width} gap-5 text-gray-600 rounded-lg shadow-lg flex-col bor der items-start px-12 py-16`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="px-3 tracking-wide text-3xl font-semibold ">
          {edit ? "Edit" : "Register"}
        </h1>
        <div className="w-full  relative  gap-6 justify-start flex px-3 ">
          <span className="w-full">
            <label
              className="block tracking-wide font-bold mb-2"
              htmlFor="name"
            >
              First name
            </label>
            <input
              id="first_name"
              onKeyUp={() => enableSubmit()}
              placeholder="First name"
              className="border w-full appearance-none focus:outline-none  rounded-lg px-3 py-4 _input _input"
              {...register("first_name", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            {errors.first_name ? (
              <p className="text-red-500 bottom-[-.99rem] absolute text-[.6rem] mt-1 italic">
                *Only alphabets allowed.
              </p>
            ) : (
              ""
            )}
          </span>
          <span className="w-full">
            <label
              className="block tracking-wide font-bold mb-2"
              htmlFor="last_name"
            >
              Last name
            </label>
            <input
              id="last_name"
              onKeyUp={() => enableSubmit()}
              placeholder="Last name"
              className="border w-full appearance-none focus:outline-none  rounded-lg px-3 py-4 _input _input"
              {...register("last_name", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            {errors.last_name ? (
              <p className="text-red-500 bottom-[-.99rem] absolute text-[.6rem] mt-1 italic">
                *Only alphabets allowed.
              </p>
            ) : (
              ""
            )}
          </span>
        </div>
        <div className="w-full px-3 ">
          <label
            className="block  tracking-wide   font-bold mb-2"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            id="email"
            onKeyUp={() => enableSubmit()}
            type="email"
            placeholder="E-mail"
            className="border w-full appearance-none focus:outline-none   rounded-lg px-3 py-4 _input"
            {...register("email", { required: true })}
          />
        </div>

        <div className="w-full gap-6 justify-start flex px-3 ">
          <span>
            <label
              className="block  tracking-wide   font-bold mb-2"
              htmlFor="name"
            >
              Gender
            </label>
            <select
              id="gender"
              className="border select_custom focus:outline-none h-[3.63rem]  rounded-lg px-3  py-4 _input"
              {...register("gender")}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </span>
          <span>
            <label
              className="block tracking-wide  font-bold mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              id="age"
              type="number"
              min={18}
              max={140}
              placeholder="Age"
              className="border  w-full appearance-none focus:outline-none rounded-lg px-3 py-4 _input"
              {...register("age", { required: true, min: 18 })}
              onChange={() => enableSubmit()}
            />
          </span>
        </div>

        <div className="px-3">
          <input
            className={` cursor-not-allowed  text-white  font-bold rounded-lg px-6 py-4  ${deact} `}
            value="Submit"
            type="submit"
            disabled
          />
        </div>
      </form>
      <section
        id="Dialog_view"
        className="md:w-[60%]   absolute bg-white rounded-lg   edit_modal hidden"
      >
        <Details {...{ h: "h-[50%]", s: "shadow-none border-none" }} />

        <button
          onClick={() =>
            document.getElementById("Dialog_view")?.classList.toggle("hidden")
          }
          className="flex z-999 absolute top-2 w-4 h-4 justify-center items-center p-0 bg-red-600 rounded-full left-2 z-[999]]  "
          formMethod="dialog"
        ></button>
      </section>
    </div>
  );
}
