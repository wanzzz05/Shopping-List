import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [itemName, setItemName] = useState('');
  const [qty, setQty] = useState('');
  const [items, setItems] = useState([]);
  const [editState, setEditState] = useState({ edit: false, itemId: '' });

  const generateRandomId = () => {
    return Math.floor(Math.random() * 100);
  }

  const handleItemChange = (e) => { setItemName(e.target.value) }

  const handleQtyChange = (e) => { setQty(e.target.value) }

  const addItem = () => {
    const newItem = {
      id: generateRandomId(),
      name: itemName,
      qty: qty,
      marked: false
    }
    setItems([...items, newItem])
  }

  const handleDelete = (id) =>
    setItems(items.filter(item => item.id !== id))

  const handleEdit = (item) => {
    setEditState({ edit: true, itemId: item.id });
    setItemName(item.name);
    setQty(item.qty);
  };

  const saveEdit = () => {
    setItems(
      items.map((item) =>
        item.id === editState.itemId
          ? { ...item, name: itemName, qty: qty }
          : item
      )
    );
    setEditState({ edit: false, itemId: '' });
    setItemName("");
    setQty('');

  };


  const handleMark = (itemId) => {
    setItems(
      items.map((item) =>
        item.id === itemId
          ? { ...item, marked: !item.marked }
          : item
      )
    );
  };






  return (
    <>

      <h1>Fashion List</h1>
      <div className="row-placement">
        <label>Item</label>
        <input value={itemName} onChange={handleItemChange} />
        <label>Qty</label>
        <input value={qty} onChange={handleQtyChange} />
      </div>
      <div>
        {!editState.edit && (
          <button onClick={addItem}>Add Item</button>
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
        <div className="row-placement">
          <h4 className={item.marked == true ? "cross-text" : ''}>{item.name}</h4>
          <h4 className={item.marked == true ? "cross-text" : ''}>{item.qty}</h4>

          <div className="row-placement">
            <button onClick={() => handleMark(item.id)}>Mark</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
            <button onClick={() => handleEdit(item)}>Edit</button>
          </div>
        </div>
      ))}
    </>
  );

}

export default App
