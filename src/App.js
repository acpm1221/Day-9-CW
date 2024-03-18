import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import StaticPart from "./component/StaticPart";
import ExerciseList from "./component/ExerciseList";

function App() {
  const [Data, setData] = useState([]);
  const [limit, setLimit] = useState(12);
  const [display, setDisplay] = useState(true);

  async function generateData() {
    try {
      const option = {
        method: "GET",
        url: "https://exercisedb.p.rapidapi.com/exercises",
        params: { limit: 12 },
        headers: {
          "X-RapidAPI-Key":
            "8858c5958dmsh1197360c04e0082p1f1a95jsn88e548b2402c",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      };
      const res = await axios.request(option);
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    generateData();
  }, [limit]);

  function searchData(name) {
    let filterData = Data.filter((item) => {
      if (
        item.name.toLowerCase().includes(name.trim()) ||
        item.bodyPart.toLowerCase().includes(name.trim())
      ) {
        return true;
      }

      return false;
    });
    setData(filterData);
  }

  return (
    <div>
      <StaticPart />
      <div
        className="input"
        onChange={(e) => {
          searchData(e.target.value);
        }}
      >
        <h1>Exercise List</h1>
        <input type="text" placeholder="Search hy target,bosy part,exercise" />
      </div>
      {display ? (
        <div className="excercise">
          {Data.map((ele, index, array) => {
            return (
              <ExerciseList
                data={Data}
                setData={setData}
                key={index}
                img={ele.gifUrl}
                bodyPart={ele.bodyPart}
                target={ele.target}
                name={ele.name}
                limit={limit}
              />
            );
          })}
        </div>
      ) : (
        ""
      )}

      <button
        className="butt"
        onClick={() => {
          setLimit((prev) => prev + 12);
          generateData();
          setDisplay(true);
        }}
      >
        Load More
      </button>
    </div>
  );
}

export default App;
