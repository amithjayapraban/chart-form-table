export const getAge = (birthday: string | undefined) => {
  if (birthday) {
    console.log((birthday))
    let [d, m, y] = birthday.split("/");
    const diff =
      Date.now() -
      new Date(`${parseInt(y)}/${parseInt(m)}/${parseInt(d)}`).getTime();
    const ageDate = new Date(diff);
    console.log(ageDate.getUTCFullYear() - 1970);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
};
