import Tasks from './Tasks.jsx';
import { useSelector,useDispatch } from 'react-redux';
import { notesActions } from '../store/noteSlice.js';

export default function SelectedProject() {
  const projectsState = useSelector(state => state.notes);

  const project = projectsState.projects.find(
    project => project.id === projectsState.selectedProjectId
  );

  const tasks = projectsState.tasks.filter(
    task => task.projectId === projectsState.selectedProjectId
  );

  const dispatch = useDispatch();
  
  const onAddTask = (text) => {
    dispatch(notesActions.addTask({ text }));
  };

  const onDeleteTask = (id) => {
    dispatch(notesActions.deleteTask({ id }));
  };

  const onDelete = () => {
    dispatch(notesActions.deleteProject({ id: project.id }));
  };

  const formattedDate = new Date(project.dueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.title}
          </h1>
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>
      <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks} />
    </div>
  );
}