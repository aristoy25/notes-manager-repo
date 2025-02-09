import { useDispatch, useSelector } from 'react-redux';
import Button from './Button.jsx';
import { notesActions } from '../store/noteSlice.js';

export default function ProjectsSidebar() {
    const selectedProjectId = useSelector(state => state.notes.selectedProjectId);
    const projects = useSelector(state => state.notes.projects);
    const dispatch = useDispatch();
    const onStartAddProject = () => {
      dispatch(notesActions.startAddProject());
    };

    const onSelectProject = (projectId) => {
      if (selectedProjectId === projectId) {
        dispatch(notesActions.cancelAddProject());
        return;
      }
      dispatch(notesActions.selectProject({ id: projectId }));
    };

    let projectsClasses = 'mt-8';
    if (projects.length === 0) {
      projectsClasses += 'bg-stone-950 rounded-md p-0.5';
    } 

    return (
      <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
          Your Projects
        </h2>
        <div>
          <Button onClick={onStartAddProject}>+ Add Project</Button>
        </div>
        <ul className={projectsClasses}>
          {projects.map((project) => {
            let cssClasses = "w-full text-left px-2 py-1 rounded-md my-1 hover:text-stone-200 hover:bg-stone-700";
  
            if (project.id === selectedProjectId) {
              cssClasses += ' bg-stone-800 text-stone-200'
            } else {
              // Remove bg-stone-800 and text-stone-200 classes to indicate that the project unselected
              const cssClassesArr = cssClasses.split(' ');
              const cssClassesArrFiltered = cssClassesArr.filter((cssClass) => cssClass !== 'bg-stone-800' && cssClass !== 'text-stone-200');
              cssClasses = cssClassesArrFiltered.join(' ');             
            }
  
            return (
              <li key={project.id}>
                <button
                  className={cssClasses}
                  onClick={() => onSelectProject(project.id)}
                >
                  {project.title}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    );
  }