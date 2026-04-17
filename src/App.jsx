import { useState } from "react";
import "./styles.css";

const InitialItems = [
  {
    id: 1,
    name: "Bags of Rice",
    quantity: 5,
    category: "Consumable",
  },
  {
    id: 2,
    name: "Bags of Beans",
    quantity: 58,
    category: "Consumable",
  },
  {
    id: 3,
    name: "Bags of Garri",
    quantity: 35,
    category: "Consumable",
  },
  {
    id: 4,
    name: "Carton of Drinks",
    quantity: 100,
    category: "Consumable",
  },
  {
    id: 5,
    name: "Pack of Tissue",
    quantity: 10,
    category: "Utilities",
  },
  {
    id: 6,
    name: "Carton of Detergents",
    quantity: 150,
    category: "Utilities",
  },
  {
    id: 7,
    name: "Crate of Meat",
    quantity: 30,
    category: "Consumable",
  },
];

export default function App() {
  const [initialItems, setInitialItems] = useState(InitialItems);
  const [showAddItems, setShowAddItems] = useState(false);
  const [editItems, setEditItems] = useState(null);

  function handleAddItems(newItem) {
    setInitialItems((InitialItems) => [...InitialItems, newItem]);
    setShowAddItems(false);
  }

  function handleShowAddItems() {
    return setShowAddItems((showItems) => !showItems);
  }

  function handleDeleteItems(id) {
    setInitialItems((items) => items.filter((items) => items.id !== id));
  }

  function handleEditItem(item) {
    setEditItems(item);
  }

  return (
    <div className="App">
      <div>
        <Dashboard />
        <ItemLists
          initialItems={initialItems}
          onDeleteItem={handleDeleteItems}
          onEditItem={handleEditItem}
        />
        <button className="btn btn-primary" onClick={handleShowAddItems}>
          {" "}
          {showAddItems ? "- Close" : "+ Add Items"}
        </button>

        {showAddItems && <AddItemForm onAddItem={handleAddItems} />}
        {editItems && (
          <EditItemList
            setInitialItems={setInitialItems}
            editItems={editItems}
            setEditItems={setEditItems}
          />
        )}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="dashboard">
      {" "}
      <h1>
        Warehouse <span> / Inventory /</span> Checker
      </h1>
      <div className="header-meta">
        <span>7 items tracked</span>
        <span>3 categories</span>
      </div>
    </div>
  );
}

function ItemLists({ initialItems, onDeleteItem, onEditItem }) {
  return (
    <div>
      <div className="item-list-header">
        <h3>Stock Ledger</h3>
        <span className="item-count-badge">{initialItems.length} entries</span>
      </div>
      <ul className="item-list">
        {initialItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onEditItem={onEditItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onEditItem }) {
  const isAvailable = item.quantity > 30;

  return (
    <div
      className="item-card"
      data-available={isAvailable ? "Available" : "Not-Available"}
    >
      <li className="item-info">
        <span className="item-name"> {item.name}</span>

        <div className="item-meta">
          Qty:
          <div className="item-quantity">
            <strong>{item.quantity}</strong>
          </div>
          <span className="item-separator">-</span>
          <span className="item-category" data-cat={item.category}>
            {item.category}
          </span>
        </div>
      </li>
      <span className="item-availability">
        {isAvailable ? (
          <span className="item-status" data-status="Available">
            Available
          </span>
        ) : (
          <span className="item-status" data-status="Not-available">
            Not Available
          </span>
        )}
        <div className="item-actions">
          <span
            className="action-btn btn-ghost"
            onClick={() => onEditItem(item)}
          >
            Edit
          </span>
          <span
            className="action-btn delete"
            onClick={() => onDeleteItem(item.id)}
          >
            Remove
          </span>
        </div>
      </span>
    </div>
  );
}

function EditItemList({ setInitialItems, editItems, setEditItems }) {
  function handleChange(e) {
    setEditItems({ ...editItems, [e.target.name]: e.target.value });
  }

  function handleSave(e) {
    e.preventDefault();
    setInitialItems((edit) =>
      edit.map((item) => (item.id === editItems.id ? editItems : item))
    );
    setEditItems(null);
  }
  return (
    <>
      <form action="" className="form-group" onSubmit={handleSave}>
        <div>
          <input
            type="text"
            name="name"
            value={editItems.name}
            onChange={handleChange}
          ></input>
          <input
            type="number"
            name="quantity"
            value={editItems.quantity}
            onChange={handleChange}
          ></input>
          <input
            type="text"
            name="category"
            value={editItems.category}
            onChange={handleChange}
          ></input>
        </div>
        <button className="btn-ghost" onClick={handleSave}>
          Save
        </button>
      </form>
    </>
  );
}

function AddItemForm({ onAddItem }) {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if ((!itemName && !quantity) || !category) return;

    const newItem = {
      id: crypto.randomUUID(),
      name: itemName,
      quantity: Number(quantity),
      category,
    };

    onAddItem(newItem);

    setItemName("");
    setQuantity("");
    setCategory("");
  }

  return (
    <>
      <form className="add-item-form" onSubmit={handleSubmit}>
        <div className="form-title">Add Items to Inventory</div>
        <div className="form-group">
          <input
            type="text"
            value={itemName}
            placeholder="Name of Item"
            onChange={(e) => setItemName(e.target.value)}
          ></input>
          <div className="form-row">
            <input
              type="number"
              value={quantity}
              placeholder="Add Qty"
              onChange={(e) => setQuantity(e.target.value)}
            ></input>
            <input
              type="text"
              value={category}
              placeholder="Specify Category"
              onChange={(e) => setCategory(e.target.value)}
            ></input>
          </div>
        </div>

        <button type="submit" className="btn">
          +
        </button>
      </form>
    </>
  );
}
