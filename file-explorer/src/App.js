import { useState } from 'react';
import './App.css';
import Folder from './components/Folder';
import { EXPLORER } from './constants/appConstants';
import { useTreeTraverse } from './helpers/treeTraverse';

function App() {
	const { insertNode } = useTreeTraverse();
	const [explorer, setExplorer] = useState(EXPLORER);

	const handleAddNew = (folderId, name, isFolder) => {
		const updatedExplorer = insertNode(explorer, folderId, name, isFolder);
		setExplorer(updatedExplorer);
	}

	return (
		<div className="App">
			<Folder explorer={explorer} handleAddNew={handleAddNew} />
		</div>
	);
}

export default App;
