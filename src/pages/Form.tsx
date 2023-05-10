import { useForm, SubmitHandler } from "react-hook-form";
import Details from "./Details";
import { useEffect, useState } from "react";
import { getAge } from "../util/getAge";
interface Inputs {
  first_name?: string;
  last_name?: string;
  age?: number | string;
  gender?: string;
  email?: string;
}
var deact = `bg-slate-100`;
var act = `bg-emerald-400`;
export interface props {
  h?: string;
  s?: string;
  p?: string;
  w?: string;
  edit?: boolean;
  forEdit?: foredit;
}
export interface foredit extends Inputs {
  dob: string;
}
export default function Form(props: props) {
  const [formData, setFormData] = useState<Inputs>();

  let { edit, forEdit } = props;
  let height: string = "h-full";
  let padding: string = "px-16 py-8";
  let width: string = "md:w-[48%]";
  if (props.h) height = props.h;
  if (props.p) padding = props.p;
  if (props.w) width = props.w;

  useEffect(() => {
    setFormData({
      first_name: forEdit?.first_name,
      last_name: forEdit?.first_name,
      age: getAge(forEdit?.dob),
      gender: forEdit?.gender,
      email: forEdit?.email,
    });
  }, [forEdit]);

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


  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(formData);
    !edit && document.getElementById("Dialog_view")?.classList.toggle("hidden");
    edit && document.getElementById("Dialog_edit")?.classList.toggle("hidden");
 
  };
  return (
    <div
      className={`w-full relative ${height} flex-col items-start  flex ${padding} justi fy-center`}
    >
      <form
        className={`flex ${width} gap-5 text-gray-500 rounded-lg sha dow-lg flex-col bor der items-start px-12 py-16`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="px-3 border-b pb-4 w-full text-emerald-400 mb-6 tracking-wide text-4xl font-semibold ">
          {edit ? "Edit" : "Sign Up"}
        </h1>
        <div className="w-full  relative  gap-6 justify-start flex px-3 ">
          <span className="w-full">
            <label
              className="block tracking-wide font-semibold mb-2"
              htmlFor="name"
            >
              First name
            </label>
            <input
              id="first_name"
              value={formData?.first_name}
              onKeyUp={() => enableSubmit()}
              placeholder="First name"
              className="border w-full text-gray-600 appearance-none focus:outline-none  rounded-lg px-3 py-4 _input _input"
              {...register("first_name", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
              })}
              onChange={(e) => {
                setFormData((formData) => ({
                  ...formData,
                  ...{ first_name: e.target.value },
                }));
              }}
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
              className="block tracking-wide font-semibold mb-2"
              htmlFor="last_name"
            >
              Last name
            </label>
            <input
              value={formData?.last_name}
              id="last_name"
              onKeyUp={() => enableSubmit()}
              placeholder="Last name"
              className="border  text-gray-600 w-full appearance-none focus:outline-none  rounded-lg px-3 py-4 _input _input"
              {...register("last_name", {
                required: true,
                pattern: /^[A-Za-z]+$/i,
              })}
              onChange={(e) => {
                setFormData((formData) => ({
                  ...formData,
                  ...{ last_name: e.target.value },
                }));
              }}
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
            className="block  tracking-wide   font-semibold mb-2"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            id="email"
            value={formData?.email}
            onKeyUp={() => enableSubmit()}
            type="email"
            placeholder="E-mail"
            className="border text-gray-600 w-full appearance-none focus:outline-none   rounded-lg px-3 py-4 _input"
            {...register("email", { required: true })}
            onChange={(e) => {
              setFormData((formData) => ({
                ...formData,
                ...{ email: e.target.value },
              }));
            }}
          />
        </div>

        <div className="w-full gap-6 justify-start flex px-3 ">
          <span>
            <label
              className="block  tracking-wide   font-semibold mb-2"
              htmlFor="name"
            >
              Gender
            </label>
            <select
              value={formData?.gender}
              id="gender"
              className=" text-gray-600 border select_custom focus:outline-none h-[3.63rem]  rounded-lg px-3  py-4 _input"
              {...register("gender")}
              onChange={(e) => {
                enableSubmit();
                setFormData((formData) => ({
                  ...formData,
                  ...{ gender: e.target.value },
                }));
              }}
            >
              <option value=""></option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </span>
          <span>
            <label
              className="block tracking-wide  font-semibold mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              value={formData?.age}
              id="age"
              type="number"
              min={18}
              max={140}
              placeholder="Age"
              className="border text-gray-600  w-full appearance-none focus:outline-none rounded-lg px-3 py-4 _input"
              {...register("age", { required: true, min: 18 })}
              onChange={(e) => {
                enableSubmit();
                setFormData((formData) => ({
                  ...formData,
                  ...{ age: parseInt(e.target.value) },
                }));
              }}
            />
          </span>
        </div>

        <div className="px-3">
          <input
            className={` cursor-not-allowed  text-white  font-bold rounded-lg px-6 py-4  ${deact} `}
            value={edit ? "Save" : "Submit"}
            type="submit"
            disabled
          />
        </div>
      </form>
      <section
        id="Dialog_view"
        className="md:w-[60%] right-24  absolute bg-white rounded-lg   edit_modal hidden"
      >
        <Details {...{ h: "h-[70%] border-4 py-6 rounded-lg w-[70%]", s: "shadow-none",formData }} />

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
