import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/dashboard.css';
import { FaUser,  FaTachometerAlt, FaUsers, FaUserSecret, FaRegNewspaper, FaSignOutAlt, FaProjectDiagram } from 'react-icons/fa';
import { HiBars3CenterLeft } from 'react-icons/hi2';
import { IoSettings } from "react-icons/io5";
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  
  const [user, setUser] = useState('null');
	const [userTotal, setUserTotal] = useState('');
	const [userRecords, setUserRecords] = useState([]);
  const [hoveredUserId, setHoveredUserId] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editUserRecord, setEditUserRecord] = useState([]);
  const [initialEditUsername, setinitialEditUsername] = useState('');
  const [initialEditEmail, setinitialEditEmail] = useState('');
  const [initialEditNumber, setinitialEditNumber] = useState('');
  const [editName, setEditName] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editNumber, setEditNumber] = useState('');
  const [usernameFound, setusernameFound] = useState('');
  const [emailFound, setemailFound] = useState('');
  const [numberFound, setnumberFound] = useState('');

  const location = useLocation();

  const { id, username} = location.state;

useEffect(() => {
  const fetchUsersDetails = async () => {
    try {
      const response = await fetch('http://54.87.28.215:4300/api/userCount');
        
      const data = await response.json();
        
      if(response.status === "200" || response.status === 200){
        setUser(username);
        setUserTotal(data.countedUsers);
      }                                 
  
      const responsee = await fetch('http://54.87.28.215:4300/api/getUserRecords');
  
      const data2 = await responsee.json();
  
      if(responsee.ok) {
        setUserRecords(data2);
      }
    } catch (err) {
      console.log(err);
    }
  };
    
  let toggle = document.querySelector(".toggle");
  let nav = document.querySelector(".nav");
  let main = document.querySelector(".main");
      
  toggle.onclick = function () {
    nav.classList.toggle("active");
    main.classList.toggle("active");
        
    const navigationLinks = document.querySelectorAll('.navigation ul');
    navigationLinks.forEach(link => {
      link.classList.toggle('custom-margin');
    });
  };
  
  let list = document.querySelectorAll(".navigation li ");
  function activeLink() {
    list.forEach((item) => item.classList.remove("hovered"));
    this.classList.add("hovered");
  }
  list.forEach((item) => item.addEventListener("mouseover", activeLink));
  
  fetchUsersDetails();
  return () => {
    toggle.onclick = null;
    list.forEach((item) => item.removeEventListener("mouseover", activeLink));
  };
}, []); 

  const handleRowHover = (userId) => {
    setHoveredUserId(userId);
  };

  const handleRowLeave = () => {
    setHoveredUserId(null);
  };

  const handleDeleteClick = async (userId) => {
    try {
      const response = await fetch(`http://54.87.28.215:4300/api/deleteUserRecord/${userId}`, {
        method: 'DELETE',
        headers: { 
          'content-type': 'application/json',
        }
      });
      if (response.ok) {
        setUserRecords(userRecords.filter(userRecord => userRecord._id !== userId))
        console.log('Deleted user with ID:', userId);
        try {
          const rresponse = await fetch('http://54.87.28.215:4300/api/userCount');
            
          const data = await rresponse.json();
            
          if(rresponse.status === "200" || rresponse.status === 200){
            setUserTotal(data.countedUsers);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log('error deleting user record');
      }
    } catch (error) {
      console.log('Error deleting User:', error);
    }
  };


  const handleEditClick = async (userId) => {
    try { 
      const response = await fetch(`http://54.87.28.215:4300/api/editUserRecord/${userId}`);
      const data = await response.json();
      if(response.ok) {
        setEditUserRecord(data);
        setinitialEditUsername(data.username);
        setinitialEditEmail(data.email);
        setinitialEditNumber(data.number);
        setIsEditFormOpen(true);
        console.log(editUserRecord);
        console.log(initialEditUsername);
        console.log(initialEditEmail);
        console.log(initialEditNumber);
      }
    } catch (err) { console.log(err)};

    // fetch(`http://54.87.28.215:4300/api/editUserRecord/${userId}`)
    // .then(response => response.json())
    // .then(data => {
    //   setEditUserRecord(data);
    //   setinitialEditUsername(data.username);
    //   setinitialEditEmail(data.email);
    //   setinitialEditNumber(data.number);
    //   console.log(editUserRecord);
    //   console.log(initialEditUsername);
    //   console.log(initialEditEmail);
    //   console.log(initialEditNumber);
    //   setIsEditFormOpen(true);
    // })
    // .catch(error => console.error('Error:', error));
    console.log('Fill and submit form Edit user with ID:', userId);
  };


const handleEditNameChange = (e) => {
  setEditUserRecord(prevState => ({
    ...prevState,
    name: e.target.value,
  }));
  setEditName(e.target.value.toLowerCase());
};

const handleEditUsernameChange = (e) => {
  setEditUserRecord(prevState => ({
    ...prevState,
    username: e.target.value,
  }));
  setEditUsername(e.target.value.toLowerCase());
};

const handleEditEmailChange = (e) => {
    setEditUserRecord(prevState => ({
      ...prevState,
      email: e.target.value,
    }));
    setEditEmail(e.target.value.toLowerCase());
  };
 
const handleEditNumberChange = (e) => {
  setEditUserRecord(prevState => ({
    ...prevState,
    number: e.target.value,
  }));
  setEditNumber(e.target.value);
  };

const checkIfExists = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result.exists;
};



const handleEditFormSubmit = async (event) => {
  event.preventDefault();

  setusernameFound('');
  setemailFound('');
  setnumberFound('');

  const usernameExists = await checkIfExists('http://54.87.28.215:4300/api/editedCheckUsername', { editUsername, initialEditUsername });
  const emailExists = await checkIfExists('http://54.87.28.215:4300/api/editedCheckEmail', { editEmail, initialEditEmail });
  const numberExists = await checkIfExists('http://54.87.28.215:4300/api/editedCheckNumber', { editNumber, initialEditNumber });

  if (!usernameExists && !emailExists && !numberExists && usernameExists == undefined && emailExists == undefined && numberExists == undefined ) {
    console.log('Form submitted!');
    console.log(editUserRecord._id);
    console.log(editName);     
    console.log(editUsername);
    console.log(editEmail);
    console.log(editNumber);
    setIsEditFormOpen(false);
  } else {
    if (usernameExists) { setusernameFound('Username Already Exists') };
    if (emailExists) { setemailFound('Email Already Exists') };
    if (numberExists) { setnumberFound('Number Already Exists') };
    // setIsEditFormOpen(false);
    return;
  }
};

const handleEditFormCancel = () => {
  setIsEditFormOpen(false);
};

  
  return (
    <>
      <div className={`fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center transition-opacity duration-300 ${
      isEditFormOpen ? 'block' : 'hidden'}`}>
      <div className="p-4 m-auto max-w-md w-full bg-white rounded-lg shadow-md">
        <form onSubmit={handleEditFormSubmit}>
          <div>
            <input
              type="text"
              id="name"
              placeholder='Name'
              name="emailName"
              value={editUserRecord.name}
              onChange={handleEditNameChange}
              className='w-full text-lg text-black py-2 my-2 border-b border-black outline-none focus:outline-none bg-transparent'/>
          </div>
          <div>
            <input
              type="text"
              id="username"
              placeholder='Username'
              name="username"
              value={editUserRecord.username}
              onChange={handleEditUsernameChange}
              className='w-full text-lg text-black py-2 my-2 border-b border-black outline-none focus:outline-none bg-transparent'/>
              <span className='text-red-500 tracking-widest text-base'>{usernameFound}</span>

          </div>
          <div>
            <input
              type="text"
              id="email"
              placeholder='Email'
              name="email"
              value={editUserRecord.email}
              onChange={handleEditEmailChange}
              className='w-full text-lg text-black py-2 my-2 border-b border-black outline-none focus:outline-none bg-transparent'/>
              <span className='text-red-500 tracking-widest text-base'>{emailFound}</span>
          </div>
          <div>
            <input
              type="text"
              id="number"
              placeholder='Phone No (+234)'
              name="number"
              value={editUserRecord.number}
              onChange={handleEditNumberChange}
              className='w-full text-lg text-black py-2 my-2 border-b border-black outline-none focus:outline-none bg-transparent'/>
              <span className='text-red-500 tracking-widest text-base'>{numberFound}</span>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={handleEditFormCancel}
          >
            Cancel
          </button>
        </form>
      </div>
      </div>
      <div className='relative w-[100%]'>
        <div className="nav navigation">
          <ul>
            <li id="li">
              <a>
                <span className="icon"
                  >
                    <FaUser size={25} color="white" />
                  </span>
                <span className="title uppercase">Hi {user}</span>
              </a>
            </li>
            <li id="li" className="hovered">
              <a>
                <span className="icon">
                  <FaTachometerAlt size={25} color="white" />
                </span>
                <span className="title">Dashboard</span>
              </a>
            </li>
            <li id="li">
              <a>
                <span className="icon">
                  <FaUsers size={25} color="white" />
                </span>
                <span className="title">Users</span>
              </a>
            </li>
            <li id="li">
              <a>
                <span className="icon">
                  <FaUserSecret size={25} color="white" />
                </span>
                <span className="title">User Support</span>
              </a>
            </li>
            <li id="li">
              <a>
                <span className="icon">
                  <FaRegNewspaper size={25} color="white"/>
                </span>
                <span className="title">Blog</span>
              </a>
            </li>
            <li id="li">
              <a>
                <span className="icon">
                  <IoSettings size={25} color="white" />
                </span>
                <span className="title">Settings</span>
              </a>
            </li>
            <li id="li">
              <a>
                <span className="icon">
                  <FaSignOutAlt size={25} color="white" />
                </span>
                <span className="title">Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="main">
          <div className="topbar">
            {/* <div className="toggle"> */}
              <HiBars3CenterLeft size={100} color="white" className='toggle'/>
            {/* </div> */}
            <div className="search">
              <label>
                <input type="text" placeholder="Search here" />
                <i className="fa-solid fa-magnifying-glass"></i>
              </label>
            </div>
            <div className="search">
              <label className="notify">
                <i className="fa-regular fa-bell"></i>
              </label>
            </div>
            <div className="user">
              <img src="./images/user.jpg" alt="user" />
            </div>
          </div>

          <div className="cardbox">
            <div className="card">
              <div>
                <div className="title">Projects</div>
                <div className="titletexts">Backend Projects</div>
              </div>
              <div className="iconbox">
                <FaProjectDiagram size={40} color="white" />
              </div>
            </div>
            <div className="card usersCardBox">
              <div className='userCardBoxContent'>
                <div className="title">Users</div>
                <div className="titletexts">{userTotal}</div>
              </div>
              <div className="iconbox">
                  <FaUsers size={40} color="white" />
              </div>
            </div>
          </div>

          <div className="chartbox">
            <div className="box"></div>
            <div className="box"></div>
          </div>

          <section className="details">
            <div className="recentOrders">
              <div className="cardHeader">
                <h2>Recent Orders</h2>
                <a className="btn">View all</a>
              </div>
              <table className='relative'>
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Username</td>
                    <td>Email</td>
                    <td>Phone Number</td>
                  </tr>
                </thead>
                <tbody>
                  {userRecords.map((userRecord) => (
      							<tr key={userRecord._id} 
                      onMouseEnter={() => handleRowHover(userRecord._id)}
                      onMouseLeave={handleRowLeave}
                      className='rcrow'
                    >
                    <td>{userRecord.name}</td>
                    <td>{userRecord.username}</td>
                    <td>{userRecord.email}</td>
                    <td><span className="status pending">{userRecord.number}</span></td>
                    <div className="option-box">
                      <button onClick={() => handleEditClick(userRecord._id)}
                        className='editBtn tracking-widest'
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDeleteClick(userRecord._id)}
                        className='deleteBtn tracking-widest'
                      >
                        Delete
                      </button>
                    </div>
                  </tr>
                  ))  }
                </tbody>
              </table>
            </div>

            <div className="recentCustomers">
              <div className="cardHeader">
                <h2>Recent Customers</h2>
              </div>
            </div>
          </section>
		    </div>
		  </div>
    </> 
  )
}

export default Dashboard;

