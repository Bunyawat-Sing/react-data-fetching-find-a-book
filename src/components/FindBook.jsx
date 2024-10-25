import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export function FindBook() {
  //useState
  const [inputText, setInputText] = useState("");
  const [fetchResult, setFetchResult] = useState([]);

  //useEffect ดึงข้อมูลเมื่อ input เปลี่ยนแปลง
  useEffect(() => {
    fetchBookData(inputText);
  }, [inputText]);

  //get ดึงข้อมูล โดยนำ input มาเป็น condition ให้ endpoint
  const fetchBookData = async (text) => {
    try {
      const bookData = await axios.get(
        `https://openlibrary.org/search.json?q=${text}&limit=10`
      );
      setFetchResult(bookData.data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app-findbook">
      <h1>Find a Book</h1>
      <input
        type="text"
        onChange={(event) => setInputText(event.target.value)}
      />

      <div className="findbook-result">
        <>
          {fetchResult.map((output, index) => (
            <div key={index}>
              <li>{output.title}</li>
            </div>
          ))}
        </>
      </div>
    </div>
  );
}
