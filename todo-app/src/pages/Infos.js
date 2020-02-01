import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Info() {
  const [infoData, setInfoData] = useState("");

  function getSpecificInfo() {
    let id = window.location.pathname.split("/")[2];
    axios.get(`http://localhost:3001/infos/${id}`).then(response => {
      console.log(response.data);
      setInfoData(Object.values(response.data));
    });
  }

  useEffect(() => {
    getSpecificInfo();
  }, []);

  return (
    <div>
      {!infoData
        ? "None"
        : infoData.map(dat => (
            <div>
              <h1>Full Name: {dat.fullname}</h1>
              <h2>Email: {dat.email}</h2>
            </div>
          ))}
    </div>
  );
}
