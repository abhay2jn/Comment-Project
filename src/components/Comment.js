import React, { useState } from 'react'
import Action from './Action';

function Comment({comment, handleInsertNode, handleEditNode , handleDeleteNode}) {
    const [input,setInput] = useState("");
    const [editMode,setEditMode] = useState(false);
    const [showInput,setShowInput] = useState(false);
    const [expand,setExpand] = useState(true);

    const handleNewComment = () => {
        setExpand(!expand);
        setShowInput(true);
    }
    const onAddComment = () => {
        setExpand(true);
        handleInsertNode(comment.id, input);
        setShowInput(false);
        setInput("");
    };
  return (
    <div>
        <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
        {comment.id === 1 ? (
            <>
            <input type='text'
            className='inputContainer__input first_input'
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='type...' />
            <Action 
            className="reply-comment"
            type="COMMENT"
            handleClick={onAddComment} />
            </>
        ) : (
            <>
            <span style={{ wordWrap : "break-word"}}>{comment.name}</span>
            <div style={{display:"flex",marginTop: "5px"}}>
            {editMode ? (
                <>
                <Action className="reply" type="SAVE" />
                <Action className="reply" type="CANCEL" />  
                </>
            ) : (
                <>
                <Action className="reply" type={
                    <>
                        {expand? (
                            <UpArrow width="10px" height="10px" />
                        ) : (
                            <DownArrow width="10px" height="10px" />
                        )}{" "}
                        REPLY
                    </>
                 }
                 handleClick={handleNewComment} /> 
                <Action className="reply" type="EDIT"
                handleClick = {() => {
                    setEditMode(true);
                }} /> 
                <Action className="reply" type="DELETE" /> 
                </>
            )}
            </div>
            </>
        )}
        </div>
        <div style={{ display:expand ? "block":"none", paddingLeft: 25}} >
        {showInput && (
            <div className='inputContainer'>
                <input 
                type='text'
                className='inputContainer__input'
                autoFocus
                onChange={(e) => setInput(e.target.value)} />
                <Action className="reply" type="REPLY" />
                <Action className="reply" type="CANCEL"
                handleClick={() => {
                    setShowInput(false);
                }} />
            </div>
        )}
        {comment ?.items?.map((cmnt) => {
            return <Comment key={cmnt.id} 
            handleInsertNode={handleInsertNode}
            handleEditNode={handleEditNode}
            handleDeleteNode={handleDeleteNode} comment={cmnt} />
        })}
        </div>
    </div>
  )
}

export default Comment;