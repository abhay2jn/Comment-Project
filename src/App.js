import React, { useState } from "react";
import Comment from "./components/Comment"


const comments = {
  id:1,
  items: [],
}
export default function App() {
  const [commentsData,setCommentsData] = useState(comments);
  return (
    <div className="App">
    <Comment comments={commentsData} />
    </div>
  );
}


