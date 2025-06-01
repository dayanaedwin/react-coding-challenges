import { useEffect, useState } from 'react';

//auto suggestion with debouncing

const AutoSuggestion = () => {
    const URL = 'https://dummyjson.com/recipes/search';
    const sampleData = [
        { key: 1, name: "Apple" },
        { key: 1, name: "Banana" },
        { key: 1, name: "Orange" },
        { key: 1, name: "Grapes" },
        { key: 1, name: "Mango" },
        { key: 1, name: "Pineapple" },
        { key: 1, name: "Strawberry" }
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [cache, setCache] = useState({});
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        setActiveIndex(-1);
    }

    //key board navigation
    const handleKeyboardNavigation = (event) => {
        if (event.key === 'ArrowDown') {
            setActiveIndex(prev => prev < suggestions.length - 1 ? prev + 1 : 0);
        } else if (event.key === 'ArrowUp') {
            setActiveIndex(prev => prev > 0 ? prev - 1 : suggestions.length - 1);
        } else if (event.key === 'Enter' && activeIndex >= 0) {
            setSearchTerm(suggestions[activeIndex].name);
            setShowSuggestions(false);
        }
    }

    const fetchProducts = async (query) => {
        const res = await fetch(`${URL}?q=${query}`);
        const recipeList = await res.json();
        return recipeList.recipes;
    }

    const getSuggestions = async (query) => {
        try {
            if (cache[query]) { //caching
                setSuggestions(cache[query]);
                return;
            }
            const results = await fetchProducts(query);
            setSuggestions(results);
            setCache(prev => ({ ...prev, [query]: results }));
        } catch (err) {
            setSuggestions([]);
        }
    }

    const getHighlightedText = (text, highlightTerm) => {
        const parts = text.split(new RegExp(`(${highlightTerm})`, 'gi'));
        return (
            <span>
                {parts.map(item => item.toLowerCase() === highlightTerm.toLowerCase() ? <b>{item}</b> : item)}
            </span>
        );
    }

    //debouncing the api call
    useEffect(() => {
        let timer;
        if (searchTerm) {
            timer = setTimeout(() => getSuggestions(searchTerm), 300);
        } else {
            setSuggestions([]);
        }
        return () => clearTimeout(timer);
    }, [searchTerm]);

    return (
        <div className="container">
            <input
                type='text'
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
                onKeyDown={handleKeyboardNavigation}
            />
            <ul>
                {suggestions?.length > 0 && showSuggestions &&
                    suggestions.map((item, index) => (
                        <li key={item.id} className={index === activeIndex ? 'active' : ''}>{getHighlightedText(item.name, searchTerm)}</li>
                    ))}
            </ul>
        </div>
    );
}

export default AutoSuggestion;
