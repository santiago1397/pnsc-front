import React, { useState } from "react";
import "./nestedlist.css"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Tooltip, IconButton, inputAdornmentClasses } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const NestedList = ({list, setList}) => {
  // State to manage the list structure

  /* EDIT LABEL */
  const editChildAux = (id, item, newlabel, currentDepth = 1) => {
    if (id == item.id) {
      return { ...item, name: newlabel }
    } else if (item.subs.length > 0) {
      return {
        ...item,
        subs: item.subs.map((item) => editChildAux(id, item, newlabel, currentDepth + 1))
      }
    } else {
      return item
    }

  }

  const handleEditLabel = (id, newLabel) => {
    if (id == list.id) {
      setList({ ...list, name: newLabel });
      return
    }
    const updatedchildren = list.subs.map((item) => {
      return editChildAux(id, item, newLabel, 1)
    });
    setList({ ...list, subs: updatedchildren });
  };
  /* EDIT LABEL */

  /* ADD CHILDREN */
  const addChildAux = (parentId, item, currentDepth = 1) => {
    if (currentDepth == 4) return item
    if (item.id === parentId) {
      const newChild = { id: Date.now(), name: "Nueva Subcategoría", subs: [] };
      return {
        ...item,
        subs: item.subs ? [...item.subs, newChild] : [newChild],
      };
    }
    if (item.subs.length > 0) {
      return {
        ...item,
        subs: item.subs.map((element) => addChildAux(parentId, element, currentDepth + 1)),
      }
    }
    return item;
  }

  const handleAddChild = (parentId, currentDepth = 1) => {
    console.log(currentDepth)
    console.log(parentId)

    if (parentId == list.id) {
      console.log("omg")
      const newChild = { id: Date.now(), name: "Nueva Subcategoría", subs: [] }
      setList({ ...list, subs: [...list.subs, newChild] });
      return
    }

    const updatedchildren = list.subs.map((item) => {
      if (item.id === parentId) {
        console.log("what")
        const newChild = { id: Date.now(), name: "Nueva Subcategoría", subs: [] };
        return {
          ...item,
          subs: item.subs ? [...item.subs, newChild] : [newChild],
        };
      }
      if (item.subs.length > 0) {
        return addChildAux(parentId, item, currentDepth + 1)
      }
      return item;
    });
    setList({ ...list, subs: updatedchildren });
  };
  /* ADD CHILDREN */

  /* DELETE ITEM */
  const deleteChildAux = (id, item, step = 1) => {
    const updatedchildren = item.subs.filter((item) => item.id !== id)
    const updatedchildren1 = updatedchildren.map((item) => deleteChildAux(id, item))

    return { ...item, subs: updatedchildren1 }
  }


  const removeChild = (id) => {
    const updatedchildren = list.subs.filter((item) => item.id !== id)
    const updatedchildren1 = updatedchildren.map((item) => deleteChildAux(id, item))
    setList({ ...list, subs: updatedchildren1 });
  }
  /* DELETE ITEM */


  // Render the list recursively
  /* const renderList = (items, step = 0) => {

    return <>

      <EditableLabel
        label={items.label}
        onEdit={(newLabel) => handleEditLabel(items.id, newLabel)}
      />

      {
        !(step == 3) ?
          <button onClick={() => handleAddChild(items.id)}>Add Child</button>
          : ""
      }
      {
        !(step == 0) ?
          <button onClick={() => removeChild(items.id)}>
            remove
          </button> : ""
      }
        <ul style={{}}>
          {items.children.length > 0 && items.children.map((item) => (
            <li key={item.id}>
              {renderList(item, step + 1)}
            </li>
          ))}
        </ul>
    </>;
  }; */
  const [showChildren, setShowChildren] = useState(true)
  const renderList = (items, step = 0) => {
    console.log(items)
    return (
      <>

        <div className="item-container">
          <div className="label-container">
            <Tooltip title="Ocultar/Mostrar" onClick={() => setShowChildren(!showChildren)}>
              <IconButton size="small" aria-label="edit" >
                {showChildren ? <KeyboardArrowDownIcon fontSize="small" /> : <KeyboardArrowRightIcon fontSize="small" />}
              </IconButton>
            </Tooltip>

            <EditableLabel
              label={items.name}
              onEdit={(newLabel) => handleEditLabel(items.id, newLabel)}
            />
          </div>

          <div className="label-container">
            {!(step === 0) && (
              <Tooltip title="Eliminar Subcategoría" onClick={() => removeChild(items.id)}>
                <IconButton size="small" aria-label="edit" >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}

            {!(step === 3) && (
              <Tooltip title="Añadir Subcategoría" onClick={() => handleAddChild(items.id)}>
                <IconButton size="small" aria-label="edit" >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </div>

        </div>

        {/* Render children if they exist */}
        {showChildren && (
          <ul>
            {items.subs.map((item) => (
              <li key={item.id}>
                <ToggleableChildren
                  item={item}
                  subs={item}
                  step={step + 1}
                  handleEditLabel={handleEditLabel}
                  handleAddChild={handleAddChild}
                  removeChild={removeChild}
                />
              </li>
            ))}
          </ul>

        )}
      </>
    );
  };

  return (
    <div>
      <div>{renderList(list)}</div>
    </div>
  );
};

const ToggleableChildren = ({
  item,
  step,
  handleEditLabel,
  handleAddChild,
  removeChild,
}) => {
  const [showChildren, setShowChildren] = useState(true); // State to toggle children visibility

  return (
    <>
      <div className="item-container">
        <div className="label-container">
          <Tooltip /* title="Ocultar/Mostrar" */ onClick={() => setShowChildren(!showChildren)}>
            <IconButton size="small" aria-label="edit" >
              {showChildren ? <KeyboardArrowDownIcon fontSize="small" /> : <KeyboardArrowRightIcon fontSize="small" />}
            </IconButton>
          </Tooltip>

          <EditableLabel
            label={item.name}
            onEdit={(newLabel) => handleEditLabel(item.id, newLabel)}
          />
        </div>

        <div className="label-container">

          {!(step === 0) && (
            <Tooltip /* title="Eliminar Subcategoría" */ onClick={() => removeChild(item.id)}>
              <IconButton size="small" aria-label="edit" >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>

          )}
          {!(step === 3) && (
            <Tooltip /* title="Añadir Subcategoría" */ onClick={() => handleAddChild(item.id)}>
              <IconButton size="small" aria-label="edit" >
                <AddIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>


      {showChildren && (
        <ul>
          {item.subs.map((item) => (
            <li key={item.id}>

              <ToggleableChildren
                item={item}
                step={step + 1}
                handleEditLabel={handleEditLabel}
                handleAddChild={handleAddChild}
                removeChild={removeChild}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

// EditableLabel Component
const EditableLabel = ({ label, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newLabel, setNewLabel] = useState(label);

  const handleSave = () => {
    onEdit(newLabel);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <span onClick={() => setIsEditing(true)}>{label}</span>
      )}
    </div>
  );
};

export default NestedList;