import React from 'react'

export const GroupList = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem
}) => {
  return (
    <ul className="list-group">
      {Object.keys(items).map((item) =>
        <li
          className={"list-group-item" + (items[item] === selectedItem ? " active" : "")}
          key={items[item][valueProperty]}
          onClick={() => onItemSelect(items[item])}
          role="button"
        >
          {items[item][contentProperty]}
        </li>,
      )}
    </ul>
  )
}


