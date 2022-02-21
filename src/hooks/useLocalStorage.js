import { useState, useEffect } from "react";

//useLocalStorage custom hook
export const useLocalStorage = function (key, defaultValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    //if jsonValue != null : return value from localStorage and parse the value
    if (jsonValue != null) return JSON.parse(jsonValue);
    //return defaultValue
    if (typeof defaultValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  //when ever the values of key,value change: update our local storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
