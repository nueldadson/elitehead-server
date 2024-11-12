import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import signuproadmap from '../assets/signuproadmap.png';
import gIcon from '../assets/ggicon.png';
import '../styles/login.css';
import AnimatedPage from './animatedPage';

const Signup = () => {
  
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFound, setusernameFound] = useState('');
  const [emailFound, setemailFound] = useState('');
  const [numberFound, setnumberFound] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value.toLowerCase());
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value.toLowerCase());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value.toLowerCase());
  };
 
  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };
 
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
 
  const handleSubmit = async (event) => {
    //Stop page reload
    event.preventDefault();
    //reset your form
    // event.target.reset();
    
    // Clear errors
    setusernameFound(' ');
    setemailFound(' ');
    setnumberFound(' ');


    // Authentication logic
    
    // Check if username exists
    const usernameExists = await checkIfExists('http://54.87.28.215:4300/api/checkUsername', { username });
    
    // Check if email exists
    const emailExists = await checkIfExists('http://54.87.28.215:4300/api/checkEmail', { email });
    
    // Check if number exists
    const numberExists = await checkIfExists('http://54.87.28.215:4300/api/checkNumber', { number });
    
    // Check if any of the values already exist
    if (!usernameExists && !emailExists && !numberExists) {
      
      // Display to Console.
      console.log('Name:', name);
      console.log('Username:', username);
      console.log('Email:', email);
      console.log('Number:', number);
      console.log('Password:', password);

      //Send to database
      try {
        const response = await fetch("http://54.87.28.215:4300/api/Userdetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, username, email, number, password }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setName('');
          setEmail('');
          setUsername('')
          setNumber('');
          setPassword('');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
        if (usernameExists) { setusernameFound('Username Already Exists') };
        if (emailExists) { setemailFound('Email Already Exists') };
        if (numberExists) { setnumberFound('Number Already Exists') };
        return;
    }
  };
   

  return (
    // <div className=' bg-slate-200 w-full h-screen flex items-start '>
    <div className='w-full min-h-[100vh] sticky mainBG'>
      <AnimatedPage>
          <div className='w-full min-h-[inherit] transform scale-[0.8] flex signup'>
              <div className='relative sm:flex flex-col items-center w-1/2 loginIMG hidden sm:block'>
                <h1 className='relative font-bold w-[80%] text-gray-50 lg:text-7xl md:text-6xl sm:text-5xl lg:mt-28 md:mt-20 sm:mt-28 headingShadow'>
                  Turn Your Ideas into reality
                </h1>
                <p className='relative w-[85%] mt-4 mb-8 text-amber-200 font-bold lg:text-3xl md:text-2xl sm:text-2xl md:w-[90%] mt-2 text-center joinShadow tracking-wide'>Join us and get attractive ideas/reactions from the community...</p>
                <div className='lg:mr-36 md:mr-16 sm:mr-8 lg:w-[50%] md:w-[60%] sm:w-[70%] mb-24 relative'>
                  <img src={signuproadmap} alt="" className='w-full h-full' />
                </div>
              </div>


              <div className='md:w-1/2 w-full sm:w-1/2 lg:w-1/2 relative bg-[#f5f5f5] flex flex-col p-16 lg:px-16 md:px-12 sm:px-8 px-12 justify-between items-center space-y-6'>
                <h1 className='w-full max-w-[600px] mx-auto text-2xl text-[#060606] font-semibold mr-auto'>
                  Elite Heads
                </h1>

                <div className='w-full flex flex-col max-w-[600px]'>
                  <div className='w-full flex flex-col mb-2'>
                    <h3 className='text-4xl font-semibold mb-2'>
                      Sign Up
                    </h3>
                    <p className='text-lg mb-2'>
                      Welcome! Please Enter your Details to Get Started.
                    </p>
                  </div>

                  <form className='w-full flex flex-col'>
                    <div>
                      {/* <label htmlFor="username">Username:</label> */}
                      <input
                        type="text"
                        id="name"
                        placeholder='Name'
                        name="Name"
                        value={name}
                        onChange={handleNameChange}
                        className='w-full text-lg text-black py-2 my-2 border-b border-black outline-none focus:outline-none bg-transparent'
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        id="username"
                        placeholder='Username'
                        name="username"
                        value={username}
                        onChange={handleUsernameChange}
                        className='w-full text-lg text-black py-2 my-2 border-b border-black outline-none focus:outline-none bg-transparent'
                      />
                      <span className='text-red-500 tracking-widest text-base'>{usernameFound}</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        id="email"
                        placeholder='Email'
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        className='w-full text-lg text-black py-2 my-2 border-b border-black outline-none focus:outline-none bg-transparent'
                      />
                      <span className='text-red-500 tracking-widest text-base'>{emailFound}</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        id="number"
                        placeholder='Phone No (+234)'
                        name="number"
                        value={number}
                        onChange={handleNumberChange}
                        className='w-full text-lg text-black py-2 my-2 border-b border-black outline-none focus:outline-none bg-transparent'
                      />
                      <span className='text-red-500 tracking-widest text-base'>{numberFound}</span>
                    </div>
                    <div>
                      {/* <label htmlFor="password">Password:</label> */}
                      <input
                        type="password"
                        id="password"
                        placeholder='Password'
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className='w-full text-lg text-black py-2 my-2 border-b border-black outline-none focus:outline-none bg-transparent'
                      />
                    </div>

                    <div className='w-full flex flex-col my-4'>
                      <button  onClick={handleSubmit} type="submit" className='w-full text-xl text-white font-semibold bg-[#060606] my-2 rounded-md p-4 text-center flex items-center justify-center'>Sign Up</button>
                      {/* <button type="submit" className='w-full text-black bg-white my-2 border font-semibold border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>Register</button> */}
                    </div>

                    <div className='w-full flex items-center justify-center relative mb-4'>
                      <div className='w-full h-[1px] bg-black/40'></div>
                      <p className='text-lg absolute text-black bg-[#f5f5f5] cursor-pointer'>or</p>
                    </div>

                    <button type="submit" className='w-full text-black bg-white my-2 border font-semibold border-black/40 rounded-md p-2 text-center flex items-center justify-center cursor-pointer'>
                      <img src={gIcon} alt="Google Icon" className='h-8 mr-2'/> Sign In with Google</button>  
                  </form>
                </div>

                <div className='w-full flex flex-col items-center justify-center'>
                  <p className='text-base font-normal text-[#060606]'>Already have an account?  <Link to='/login'> <span className='font-bold underline underline-offset-2 cursor-pointer'>Login!</span> </Link> </p>
                </div>
              </div>
          </div>

      </AnimatedPage>
    </div>
  )
}

export default Signup;


 