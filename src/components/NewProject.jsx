import { useRef } from 'react';
import Input from '../components/Input.jsx';
import Modal from '../components/Modal.jsx';
import { useDispatch } from 'react-redux';
import { notesActions } from '../store/noteSlice.js';
import { addProjectAxios } from '../controller/methods.js';

export default function NewProject(){
    const dispatch = useDispatch();
    const onAdd = async (project) => {
        dispatch(notesActions.addProject(project));
        await addProjectAxios(project);
    };

    const onCancel = () => {
        dispatch(notesActions.cancelAddProject());
    };

    const modal=useRef();

    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    function handleSave(){
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;
        
        if(
            enteredTitle.trim()==='' ||
            enteredDescription.trim()==='' ||
            enteredDueDate.trim()===''
        ){
            modal.current.open();
            return;
        }

        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate,
            id: Math.random().toString()
        });
    }

    return (
            <>
            <Modal ref={modal} buttonCaption='Close'>
                <h2>Invalid input</h2>
                <p>Please enter valid values for all fields</p>
            </Modal>
    <div className='w-[35rem] mt-16'>
        <menu className='flex items-center justify-end gap-4 my-4'>
            <li>
        <button 
        className='text-stone-800 hover:text-stone-950 '
        onClick={onCancel}>Cancel</button>
            </li>
            <li>
        <button 
        className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 '
        onClick={handleSave}>Save</button>
            </li>
        </menu>
        <div>
            <Input type='text' label='Title' ref={title} />
            <Input label='Description' textarea ref={description}  />
            <Input type='date' label='Due date' ref={dueDate} />
        </div>
    </div>
        </>
    )
};