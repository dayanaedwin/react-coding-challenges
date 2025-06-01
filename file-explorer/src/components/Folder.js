import { useState } from 'react';

const Folder = ({ explorer, handleAddNew }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showInput, setShowInput] = useState({
        isVisible: false,
        isFolder: null
    });

    const handleCreate = (e, isFolder) => {
        e.stopPropagation(0);
        setIsExpanded(true);
        setShowInput({
            isVisible: true,
            isFolder
        });
    }

    const addNewNode = (e) => {
        if (e.keyCode === 13) {
            handleAddNew(explorer.id, e.target.value, showInput.isFolder);
            setShowInput({ ...showInput, isVisible: false });
        }
    }

    return (
        <div className='folder'>
            <div className='folder-div' onClick={() => setIsExpanded(!isExpanded)}>
                <p className='folder-name'                >
                    {explorer.isFolder ?
                        <span>📁</span> :
                        <span>📄</span>}
                    {explorer.name}
                </p>
                {explorer.isFolder && <div className='create-btns'>
                    <button onClick={(e) => handleCreate(e, true)}>Folder +</button>
                    <button onClick={(e) => handleCreate(e, false)}>File + </button>
                </div>}
            </div>
            {showInput.isVisible &&
                <div className='input_container'>
                    {showInput.isFolder ?
                        <span>📁</span> :
                        <span>📄</span>
                    }
                    <input
                        type='text'
                        autoFocus
                        onBlur={() => setShowInput({ ...showInput, isVisible: false })}
                        onKeyDown={(e) => addNewNode(e)}
                    />
                </div>
            }
            {isExpanded && explorer.isFolder && explorer.items?.map(item => (<Folder key={item.id} handleAddNew={handleAddNew} explorer={item} />))}
        </div>
    )
}

export default Folder;