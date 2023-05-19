import React, { useState, useEffect } from "react";
import List from "./components/List";
import Alert from "./components/Alert";

// Function to retrieve the list from local storage
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function App() {
  // State variables
  const [name, setName] = useState(""); // Stores the value of the input field
  const [list, setList] = useState(getLocalStorage()); // Represents the grocery list items
  const [isEditing, setIsEditing] = useState(false); // Indicates whether editing is in progress
  const [editID, setEditID] = useState(null); // Stores the ID of the item being edited
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" }); // Manages the alert message

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // Show an alert if the input field is empty
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      // Update an existing item in the list if in editing mode
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      // Add a new item to the list
      showAlert(true, "success", "item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName("");
    }
  };

  // Function to show the alert message
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  // Function to clear the grocery list
  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  // Function to remove an item from the grocery list
  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };

  // Function to set editing mode and pre-fill the input field with the item's name
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  // Effect hook to persist the grocery list to local storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  console.log();
  // JSX markup
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="Add Your Items"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
