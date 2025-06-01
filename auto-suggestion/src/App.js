import { useEffect, useState } from 'react';
import './App.css';
import AutoSuggestion from './components/AutoSuggestion';

function App() {

	return (
		<div className="app">
			<h2>AutoSuggestion / Typeahead</h2>
			<div>
				<AutoSuggestion />
			</div>
		</div>
	);
}

export default App;
