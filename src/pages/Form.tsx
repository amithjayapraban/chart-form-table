import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  age: number;
  gender: string;
  email: string;
};
var deact = `bg-gray-300`;
var act = `bg-green-300`;
export default function Form() {
  function enableSubmit() {
    let inputs = document.getElementsByClassName(
      "_input"
    ) as HTMLCollectionOf<HTMLInputElement>;

    let button = document.querySelector(
      'input[type="submit"]'
    ) as HTMLButtonElement;

    let valid = true;

    for (var i = 0; i < inputs.length; i++) {
      let changedInput = inputs[i];
      if (changedInput?.value.trim() === "" || changedInput?.value === null) {
        valid = false;
        button.classList.remove("cursor-pointer");
        button.classList.add("cursor-not-allowed");
        button.classList.replace(act, deact);

        break;
      }
    }
    button.disabled = !valid;
    valid && button.classList.replace(deact, act);
    button.classList.replace("cursor-not-allowed", "cursor-pointer");
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  let err_msg = "This field is required";
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div className="w-full  bg-gra y-700 h-full flex-col items-center flex py-20 justi fy-center">
      <form
        className="flex gap-5 rounded bg-white  flex-col shadow items-start p-12 py-16"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full  relative flex flex-col  px-3  ">
          <label
            className="block  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            onKeyUp={() => enableSubmit()}
            placeholder="Name"
            className="border w-full appearance-none focus:outline-none  rounded px-3 py-2 _input _input"
            {...register("name", { required: true, pattern: /^[A-Za-z]+$/i })}
          />
          {errors.name ? (
            <p className="text-red-500 bottom-[-.8rem] absolute text-[.5rem] mt-1 italic">
              *Only alphabets allowed.
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="w-full gap-3 justify-between flex px-3 ">
          <div className="">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Gender
            </label>
            <select
              id="gender"
              className="border focus:outline-none   rounded px-3  py-2 _input"
              {...register("gender")}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              id="age"
              type="number"
              min={18}
              placeholder="Age"
              className="border appearance-none focus:outline-none rounded px-3 py-2 _input"
              {...register("age", { required: true, min: 18 })}
              onChange={() => enableSubmit()}
            />
          </div>
        </div>

        {/* {errors.email && <span>{err_msg}</span>} */}
        <div className="w-full px-3 ">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            id="email"
            onKeyUp={() => enableSubmit()}
            type="email"
            placeholder="E-mail"
            className="border w-full appearance-none focus:outline-none   rounded px-3 py-2 _input"
            {...register("email", { required: true })}
          />

          {/* {errors.email ? <span>{err_msg}</span> : ""} */}
        </div>
        <div className="px-3">
          <input
            className={`border cursor-not-allowed  text-gray-700  font-semibold rounded px-3 py-2  ${deact} `}
            value="Submit"
            type="submit"
            disabled
          />
        </div>
      </form>
    </div>
  );
}
