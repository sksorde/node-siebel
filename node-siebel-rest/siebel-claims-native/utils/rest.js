import myConfig from '../config/Config';
import { Base64 } from 'js-base64';

export const callGetApi = async (url) => {
  console.log('in rest.js');
  try {
  const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: "include", // include, same-origin, *omit
      headers: {
          //"Content-Type": "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8",
        //  'Authorization': 'Basic '+Base64.encode('myConfig.siebelUser:myConfig.siebelPwd'),
      },
      //redirect: "error", // manual, *follow, error
      //referrer: "no-referrer", // no-referrer, *client
      //body: '', // body data type must match "Content-Type" header
    });
    const body = await response.json();
console.log(response.status, body);
    if (response.status !== 200) throw Error(body.message);
    console.log(response.status, body);

    return JSON.parse(body);
} catch (e) {
  console.log(`Caught exception: ${e.message}`);
  throw e;
}

};

// export const callGetApi = async(url) => {
//   try {
//     var request = new XMLHttpRequest();
//     request.onreadystatechange = (e) => {
//       if (request.readyState !== 4) {
//         return;
//       }
//
//       if (request.status === 200) {
//         console.log('success', request.responseText);
//         return JSON.parse(request.responseText);
//       } else {
//         console.warn('error');
//         throw Error(request.responseText);
//       }
//     };
//
//     request.open('GET', url);
//     request.setRequestHeader('Authorization', 'Basic '+Base64.encode('myConfig.siebelUser:myConfig.siebelPwd'));
//     request.setRequestHeader('Content-Type', "application/json; charset=utf-8");
//     request.setRequestHeader('mode', 'CORS');
//     request.send();
//   } catch (e) {
//     console.log(`Caught exception: ${e.message}`);
//     throw e;
//   }
// };

export const callPostApi = async (url, data) => {
  try {
    console.log('request body', data);
    const response = await fetch(url, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          //credentials: "same-origin", // include, same-origin, *omit
          headers: {
              "Content-Type": "application/json; charset=utf-8",
              'Authorization': myConfig.auth,
              "Accept": "application/json"
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          //redirect: "follow", // manual, *follow, error
          //referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
    const body = await response.json();
    console.log(body);

    if (response.status !== 200 && response.status !== 201) throw Error(body.message);
    return JSON.parse(body);
  } catch (e) {
    console.log(`Caught exception: ${e.message}`);
    throw e;
  }
  // try {
  //   var request = new XMLHttpRequest();
  //   var json = JSON.stringify(data);
  //
  //   request.onreadystatechange = (e) => {
  //     if (request.readyState !== 4) {
  //       return;
  //     }
  //
  //     if (request.status === 200 || request.status === 201) {
  //       console.log('success', request.responseText);
  //       callback(JSON.parse(request.responseText));
  //     } else {
  //       console.warn('error');
  //       throw Error(request.responseText);
  //     }
  //   };
  //
  //   request.open('POST', url, true);
  // //  request.setRequestHeader('Authorization', 'Basic '+Base64.encode('myConfig.siebelUser:myConfig.siebelPwd'));
  //   request.setRequestHeader('Content-Type', "application/json; charset=utf-8");
  //   request.setRequestHeader('mode', 'CORS');
  //   request.send(json);
  // } catch (e) {
  //   console.log(`Caught exception: ${e.message}`);
  //   throw e;
  // }
};
