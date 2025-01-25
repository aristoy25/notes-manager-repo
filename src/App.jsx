import  { useSelector } from 'react-redux';

import NewProject from './components/NewProject.jsx';
import NoProjectSelected from './components/NoProjectSelected.jsx';
import ProjectsSidebar from './components/ProjectsSidebar.jsx';
import SelectedProject from './components/SelectedProject.jsx';

function App() {

  const projectsState = useSelector(state => state.notes);

  let content = (
    <SelectedProject />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar />
      {content}
    </main>
  );
}

export default App;