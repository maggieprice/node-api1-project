import React, { useState, useEffect } from "react";
import axios from "axios";

const initialHobbit = {
  name: "",
  bio: "", 
};

const HobbitList = ({ hobbits }) => {
  console.log(hobbits);
  const [data, setData]=useState([])
  const [editing, setEditing] = useState(false);
  const [hobbitToEdit, setHobbitToEdit] = useState(initialHobbit);
  const [newHobbit, setNewHobbit] = useState(initialHobbit);
  const [hobbitToDelete, setHobbitToDelete]= useState();
  
  const deleteHobbit = hobbit => {
    axios
      .delete(`http://localhost:5000/api/users/${hobbit.id}`)
      .then(res => {
        console.log(res)
        setHobbitToDelete(res)
        window.location.reload();
      })
      .catch(err => {
        console.log(err.response)
      })
  };

  const saveEdit = e => {
    console.log(hobbitToEdit.id)
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/users/${hobbitToEdit.id}`, hobbitToEdit)
      .then(res => {  
        console.log(res.data);
        setHobbitToEdit(res)
        window.location.reload();
      })
      .catch(err => {
        console.log(err.response)})
      }

  const addHobbit = hobbit => {
    axios
      .post("http://localhost:5000/api/users", hobbit)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err.response)
      })
      window.location.reload();
    }

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then(res => {
        console.log(res.data)
        setData(res.data)
      })
      .catch(err => {
        console.log(err.response)
      })
  }, [])

  const editHobbit = hobbit => {
    setEditing(true);
    setHobbitToEdit(hobbit);
  };

  return (
  <div>

<div className="add-form">
          <h3>Add A New Hobbit</h3>
          <form onSubmit={() => addHobbit(newHobbit)}>
            <h4 >New Hobbit</h4>
            <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={newHobbit.name}
            onChange={e =>
              setNewHobbit({ ...newHobbit, [e.target.name]: e.target.value })
            }
            />
            <h4>Bio</h4>
            <input
            id="bio"
            name="bio"
            type="text"
            placeholder="Bio"
            value={newHobbit.bio}
            onChange={e =>
              setNewHobbit({ ...newHobbit, [e.target.name]: e.target.value })
            }
            />
            <button type ="submit">Add New Hobbit</button>
            </form>
          </div>

          <div className="edit-form">
      {editing && (
        <form onSubmit={saveEdit}>
          <h3>Edit hobbit Card</h3>
            <label>
                Hobbit Name:
                <input
                  onChange={e =>
                    setHobbitToEdit({ ...hobbitToEdit, name: e.target.value })
                  }
                  value={hobbitToEdit.name}
                />
              </label>
              <label>
               Hobbit Bio:
                <input
                  onChange={e =>
                    setHobbitToEdit({ ...hobbitToEdit, bio: e.target.value })
                  }
                  value={hobbitToEdit.bio}
                />
              </label>
              <div className="button-row">
                <button type="submit">save</button>
                <button onClick={() => setEditing(false)}>cancel</button>
              </div>
            </form>
      )}
      </div>
       
      <div className="card-container">
        <ul>
        {data.map(hobbit => (
            <div key ={hobbit.id}>
              <div className="hobbit-card">
              {" "}
                <h2>Hobbit</h2>
                <h3>Hobbit Name:</h3>
                <p> {hobbit.name}</p>
                <h4>Hobbit Bio: </h4>
                <p>{hobbit.bio}</p>
                <button className="card-button" onClick={() => editHobbit(hobbit)}>Edit</button>
                <button className="card-button" onClick={e => {
                e.stopPropagation();
                deleteHobbit(hobbit)}
              }>
              X
              </button>
                </div>
          </div> 
        ))}
        </ul>
        </div>   
    </div>    
  );
};




export default HobbitList;