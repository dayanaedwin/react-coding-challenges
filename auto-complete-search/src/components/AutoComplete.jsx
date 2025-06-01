import { useEffect, useRef, useState } from "react";
/*
    -> Implemented debouncing
    -> Implemented caching
*/

export const AutoComplete = () => {
    const URL = 'https://dummyjson.com/recipes/search?q=';
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const cache = useRef(new Map());

    const handleInputChange = (value) => {
        setQuery(value);
    }

    const fetchRecipes = async () => {
        if (query.length === 0) {
            setRecipes([]);
            return;
        } else if (cache.current.has(query)) {
            setRecipes(cache.current.get(query));
            return;
        }

        try {
            const res = await fetch(URL + query);
            const json = await res.json();
            setRecipes(json.recipes);
            cache.current.set(query, json.recipes);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const timer = setTimeout(fetchRecipes, 400)

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="container">
            <input
                type="text"
                className=""
                value={query}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={() => setShowResults(true)}
                onBlur={() => setShowResults(false)}
            />
            {showResults && <div className="suggesion-container">
                {recipes.map(item => (
                    <h5 key={item.id}>{item.name}</h5>
                ))}
            </div>}
        </div>
    )
}