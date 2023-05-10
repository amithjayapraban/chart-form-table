export const getAge = (birthday: string|undefined) => {
  if(birthday){
   let [d,m,y]= birthday.split("/");
   const diff =
     Date.now() -
     new Date(`${parseInt(y)}-${parseInt(m)}-${parseInt(d)}`).getTime();
   const ageDate = new Date(diff);
   return Math.abs(ageDate.getUTCFullYear() - 1970);
}
  
};
