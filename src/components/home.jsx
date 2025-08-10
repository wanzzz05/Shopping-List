import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getItems, deleteItem, addItem, editItem } from './Api'

function App() {
  const [itemName, setItemName] = useState('');
  const [qty, setQty] = useState('');
  const [items, setItems] = useState([]);
  const [editState, setEditState] = useState({ edit: false, itemId: '' });

  useEffect(() => {
    fetchItems();
  }, [])

  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error("Error", error);
    }
  }

  const handleItemChange = (e) => { setItemName(e.target.value) }

  const handleQtyChange = (e) => { setQty(e.target.value) }

  const addItemBtn = async () => {
    const newItem = {
      name: itemName,
      quantity: qty,
      marked: false
    };
    try {
      const data = await addItem(newItem);
      fetchItems();
      setItemName("");
      setQty("");
    } catch (error) {
      console.error("Error", error);
    }

  }

  const handleDelete = async (itemId) => {
    try {
      const updatedData = await deleteItem(itemId);
      fetchItems();
    } catch (error) {
      console.error("Error", error);
    }

  }


  const handleEdit = async (item) => {
    setEditState({ edit: true, itemId: item._id });
    setItemName(item.name);
    setQty(item.quantity);
  };

  const saveEdit = async () => {
    const editedItemData = {
      name: itemName,
      quantity: qty,
      marked: false
    }
    try {
      await editItem(editedItemData, editState.itemId);
      fetchItems();
      setEditState({ edit: false, itemId: '' });
      setItemName("");
      setQty("");
    } catch (error) {
      console.error("Error", error);

    }
  };


  const handleMark = async (item) => {
   const markedItem = {
      marked : !item.marked
   }
    try {
      await editItem(markedItem, item._id);
      fetchItems();
    } catch (error) {
      console.error("Error", error);
    }
  }


  return (
    <>

      <h1>Shopping List</h1>
      <div className="row-placement">
        <label>Item</label>
        <input value={itemName} onChange={handleItemChange} />
        <label>Qty</label>
        <input value={qty} onChange={handleQtyChange} />
      </div>
      <div>
        {!editState.edit && (
          <button onClick={addItemBtn}>Add Item</button>
        )}
        {editState.edit && (
          <button onClick={saveEdit}>Save</button>
        )}
      </div>

      <div className="list-headings">
        <h3>Item</h3>
        <h3>Quantity</h3>
      </div>

      {items?.map((item) => (
        <div className="row-placement" key={item._id}>
          <h4 className={item.marked == true ? "cross-text" : ''}>{item.name}</h4>
          <h4 className={item.marked == true ? "cross-text" : ''}>{item.quantity}</h4>

          <div className="row-placement">
            <button onClick={() => handleMark(item)}>{item.marked == false ? 'Mark' : 'Unmark'}</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
            <button onClick={() => handleEdit(item)}>Edit</button>
          </div>
        </div>
      ))}
    </>
  );

}

export default App
