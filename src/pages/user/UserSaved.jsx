import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import Clintcontex from "../userContext/ClientContext";

function UserSaved() {
  const { userData } = useContext(Clintcontex);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`getsavepost/${userData?._id}`);

      setSaved(res.data.data.saved);
    };
    getPost();
  }, [userData, saved]);

  return (
    <div>
      {saved.length > 0 ? (
        <div className="flex grid-cols-3 gap-4 my-6 mx-6 w-[97%] p-1 flex-wrap">
          {saved.map((item) => {
            return (
              <div>
                <img
                  src={item.imgUrl}
                  alt={item.imgUrl}
                  className="h-60 max-w-80 rounded-lg"
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default UserSaved;
