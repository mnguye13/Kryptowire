import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Info() {
  const [infoData, setInfoData] = useState("");
  useEffect(() => {
    getSpecificInfo();
  }, []);

  function getSpecificInfo() {
    let id = window.location.pathname.split("/")[2];
    axios.get(`http://localhost:3001/infos/${id}`).then(response => {
      console.log(response.data);
      console.log(response);
      setInfoData(response.data);
    });
  }
  console.log(infoData);

  return (
    <div>
      {!infoData ? (
        "None"
      ) : (
        <div>
          <h1>Full Name: {infoData.fullname}</h1>
          <h2>Email: {infoData.email}</h2>
        </div>
      )}
    </div>
  );
}
