
const mode = "live";

let AppPath;
let ApiPath;
let ImgPath;

if(mode === "live"){

  AppPath = "https://shop.cfthk.co/";
  ApiPath = "https://shop.cfthk.co/api/v1/";
  ImgPath = "https://shop.cfthk.co/api/img/";

}else{

  AppPath = "http://192.168.0.106:3000/";
  ApiPath = "http://192.168.0.106/rcvc-business-appkit/api/v1/";
  ImgPath = "http://192.168.0.106/rcvc-business-appkit/api/img/";

}

export {AppPath, ApiPath, ImgPath}
