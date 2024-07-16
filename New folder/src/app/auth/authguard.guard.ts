import { CanActivateFn } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  let data:any = localStorage.getItem("isAdmin")
  if(data){
    data= JSON.parse(data)
    // console.log(data)
    return data
  }
  return false;
};
