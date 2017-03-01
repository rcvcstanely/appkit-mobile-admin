import { browserHistory } from 'react-router'

export function link(type, path, parm){
  console.log(type, path, parm)

  if(parm!==""){
    parm = "/"+parm
  }

  if(type==="push"){
    browserHistory.push("/"+path+parm)
  }else if(type==="replace"){
    browserHistory.replace("/"+path+parm)
  }else if(type==="back"){
    browserHistory.goBack();
  }else{
    console.log("Router miss type")
  }
}

export function checkLogin(){

  let jwt = getToken();

  if(jwt !== null && jwt !== "undefined" && jwt.length>0){

    const memberData = JSON.parse(atob(jwt.split(".")[1]));

    if(memberData.data !== "undefined" && memberData.data.exp !== "undefined"){

      const expire = new Date(memberData.data.exp).getTime()*1000;
      const now = new Date().getTime();
      if(expire> now){
        return true;
      }else{
        clearToken();
        return false;
      }

    }else{
      clearToken();
      return false;
      console.log("checkLogin error")
    }

  }else{
    return false;
  }

}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

export function getToken(){
  // Check html5 local storage
  if (typeof(Storage) !== "undefined") {
    // if exist save as local storage
    return localStorage.getItem("jwt");
  } else {
    // if not save as cookies
    return getCookie("jwt");
  }

}

export function clearToken(){

  // Check html5 local storage
  if (typeof(Storage) !== "undefined") {
    // if exist save as local storage
    localStorage.removeItem("jwt");
  } else {
    // if not save as cookies
    document.cookie = "";
  }

}
