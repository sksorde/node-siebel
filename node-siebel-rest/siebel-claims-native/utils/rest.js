
export const callGetApi = async (url) => {
  const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      //cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: "same-origin", // include, same-origin, *omit
      headers: {
          //"Content-Type": "application/json; charset=utf-8",
          // "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json"
      },
      //redirect: "error", // manual, *follow, error
      //referrer: "no-referrer", // no-referrer, *client
      //body: '', // body data type must match "Content-Type" header
  });
  const body = await response.json();

  if (response.status !== 200) throw Error(body.message);

  return JSON.parse(body);
};

export const callPostApi = async (url, data) => {
  const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json"
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        //redirect: "follow", // manual, *follow, error
        //referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
  const body = await response.json();

  if (response.status !== 200 && response.status !== 201) throw Error(body.message);

  return JSON.parse(body);
};
