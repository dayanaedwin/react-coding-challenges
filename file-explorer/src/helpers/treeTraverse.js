export const useTreeTraverse = () => {
    const insertNode = (tree, folderId, name, isFolder) => {
        if (tree.id === folderId) {
            tree.items.unshift({
                id: new Date().getTime(),
                name,
                isFolder,
                items: []
            });
            return tree;
        }

        const updatedTree = tree.items.map(item => {
            return insertNode(item, folderId, name, isFolder);
        });
        
        return { ...tree, items: updatedTree };
    }

    return { insertNode };
}