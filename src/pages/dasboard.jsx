import React, { useState, useEffect } from 'react'
import '../assets/dashboard.css';
import { useLocation } from 'react-router-dom';

const Dasboard = () => {
    const [user, setUser] = useState('');
	const [userTotal, setUserTotal] = useState('');
	const [userRecords, setUserRecords] = useState([]);

    const location = useLocation();

    const { id, username} = location.state;

    
    useEffect(() => {
        setUser(username);

        const countt = async () => {
        try {
			const response = await fetch('http://54.87.28.215:4300/api/userCount');
            
            const data = await response.json();
			
            if(response.status === "200" || response.status === 200){
                // console.log(data.countedUsers);
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
    }
    countt();
    }, [])
    // console.log(`${id}, ${username}`);


  return (
    <>
    <div>
      <aside>
			<nav className="nav navigation">
				<ul>
					<li id="li">
						<a>
							<span className="icon"
								><i className="fa-solid fa-table-columns"></i
							></span>
							<span className="title">WELCOME {user}</span>
						</a>
					</li>
					<li id="li" className="hovered">
						<a   >
							<span className="icon"><i className="fa-solid fa-house"></i></span>
							<span className="title">Dashboard</span>
						</a>
					</li>
					<li id="li">
						<a   >
							<span className="icon"><i className="fa-solid fa-user"></i></span>
							<span className="title">Customers</span>
						</a>
					</li>
					<li id="li">
						<a   >
							<span className="icon"><i className="fa-solid fa-message"></i></span>
							<span className="title">Message</span>
						</a>
					</li>
					<li id="li">
						<a   >
							<span className="icon"><i className="fa-solid fa-circle-info"></i></span>
							<span className="title">Help</span>
						</a>
					</li>
					<li id="li">
						<a   >
							<span className="icon"><i className="fa-solid fa-sliders"></i></span>
							<span className="title">Settings</span>
						</a>
					</li>
					<li id="li">
						<a   >
							<span className="icon"
								><i className="fa-solid fa-arrow-right-from-bracket"></i
							></span>
							<span className="title">Sign Out</span>
						</a>
					</li>
				</ul>
			</nav>
		</aside>

		<main className="main">
			<div className="topbar">
				<div className="toggle">
					<i className="fa-solid fa-bars"></i>
				</div>
				<div className="search">
					<label for="">
						<input type="text" placeholder="Search here" />
						<i className="fa-solid fa-magnifying-glass"></i>
					</label>
				</div>
				<div className="search">
					<label for="" className="notify">
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
						<i className="fa-solid fa-list-check"></i>
					</div>
				</div>
				<div className="card">
					<div>
						<div className="title">SKills</div>
						<div className="titletexts">Python</div>
					</div>
					<div className="iconbox">
						<i className="fa-solid fa-user-plus"></i>
					</div>
				</div>
				<div className="card">
					<div>
						<div className="title">Projects</div>
						<div className="titletexts">UI Projects</div>
					</div>
					<div className="iconbox">
						<i className="fa-solid fa-list-check"></i>
					</div>
				</div>
				<div className="card">
					<div>
						<div className="title">Users</div>
						<div className="titletexts">{userTotal}</div>
					</div>
					<div className="iconbox">
						<i className="fa-solid fa-user-plus"></i>
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
						<a    className="btn">View all</a>
					</div>
					<table>
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
							<tr key={userRecord._id}>
								<td>{userRecord.name}</td>
								<td>{userRecord.username}</td>
								<td>{userRecord.email}</td>
								<td><span className="status pending">{userRecord.number}</span></td>
							</tr>
							))  }
						</tbody>
					</table>
				</div>

				<div className="recentCustomers">
					<div className="cardHeader">
						<h2>Recent Customers</h2>
					</div>
					<table>
						<tr>
							<td width="60px">
								<div className="imgBox">
									<img src="images/recentcustomer1.jpg" alt="" />
								</div>
							</td>
							<td>
								<h4>Nuel<br /><span>American</span></h4>
							</td>
						</tr>
						<tr>
							<td width="60px">
								<div className="imgBox">
									<img src="images/recentcustomer1.jpg" alt="" />
								</div>
							</td>
							<td>
								<h4>Nuel<br /><span>American</span></h4>
							</td>
						</tr>
						<tr>
							<td width="60px">
								<div className="imgBox">
									<img src="images/recentcustomer1.jpg" alt="" />
								</div>
							</td>
							<td>
								<h4>Nuel<br /><span>American</span></h4>
							</td>
						</tr>
						<tr>
							<td width="60px">
								<div className="imgBox">
									<img src="images/recentcustomer1.jpg" alt="" />
								</div>
							</td>
							<td>
								<h4>Nuel<br /><span>American</span></h4>
							</td>
						</tr>
						<tr>
							<td width="60px">
								<div className="imgBox">
									<img src="images/recentcustomer1.jpg" alt="" />
								</div>
							</td>
							<td>
								<h4>Nuel<br /><span>American</span></h4>
							</td>
						</tr>
						<tr>
							<td width="60px">
								<div className="imgBox">
									<img src="images/recentcustomer1.jpg" alt="" />
								</div>
							</td>
							<td>
								<h4>Nuel<br /><span>American</span></h4>
							</td>
						</tr>
						<tr>
							<td width="60px">
								<div className="imgBox">
									<img src="images/recentcustomer1.jpg" alt="" />
								</div>
							</td>
							<td>
								<h4>Nuel<br /><span>American</span></h4>
							</td>
						</tr>
						<tr>
							<td width="60px">
								<div className="imgBox">
									<img src="images/recentcustomer1.jpg" alt="" />
								</div>
							</td>
							<td>
								<h4>Nuel<br /><span>American</span></h4>
							</td>
						</tr>
					</table>
				</div>
			</section>
		</main>
    </div>
    </>
  )
}

export default Dasboard;
