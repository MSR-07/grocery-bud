import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

// List component definition
const List = ({ items, removeItem, editItem }) => {
  return (
    <div className='grocery-list'>
      {/* Map through the items array and render each item */}
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article className='grocery-item' key={id}>
            {/* Render the title of the item */}
            <p className='title'>{title}</p>
            <div className='btn-container'>
              {/* Button to edit the item */}
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(id)}
              >
                <FaEdit /> {/* Edit icon */}
              </button>
              {/* Button to delete the item */}
              <button
                type='button'
                className='delete-btn'
                onClick={() => removeItem(id)}
              >
                <FaTrash /> {/* Trash icon */}
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
