import { useState } from "react";

function useDeleteItem<T>(){
    const [itemToDelete, setItemToDelete] = useState<T | null>(null);
    return { itemToDelete, setItemToDelete };
}

export default useDeleteItem;