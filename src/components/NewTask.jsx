import { useState } from "react";
import Modal from "./Modal.jsx";
import { useRef } from "react";

export default function NewTask({onAdd}){
    const [enteredTask,setEnteredTask]=useState('');

    const modal=useRef();

    function handleChange(event){
        setEnteredTask(event.target.value);
    }

    function handleClick(){
        if(enteredTask.trim().length===0){
            modal.current.open();
            return;
        }
        onAdd(enteredTask);
        setEnteredTask('');
    }

    return (
        <div className="flex items-center gap-4">
            <Modal ref={modal} buttonCaption='Close'>
                <h2>Invalid input</h2>
                <p>Please enter a valid task</p>
            </Modal>
            <input 
              type="text"
              className="w-64 px-2 py-1 rounded-sm bg-stone-200"
              onChange={handleChange}
              value={enteredTask}
            />
            <button
              className="text-stone-700 hover:text-stone-950"
              onClick={handleClick}
            >
              Add Task
            </button>

        </div>
    )
};