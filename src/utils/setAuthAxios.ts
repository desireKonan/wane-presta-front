import axios, { AxiosResponse } from "axios";

// Set Token In Axios
export function setToken(token: string | undefined): void {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

// Set Key In Axios
export function SetDevKey(key: string | undefined): void {
  if (key) {
    axios.defaults.headers.common["key"] = key;
  } else {
    delete axios.defaults.headers.common["key"];
  }
}
