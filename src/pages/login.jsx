import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginroadmap from '../assets/loginroadmap.png';
import gIcon from '../assets/ggicon.png'
import '../styles/login.css';
import AnimatedPage from './animatedPage';

const Login = () => {

  const nav = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value.toLowerCase());
  };
 
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
   };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
		try {
			const response = await fetch("http://54.87.28.215:4300/api/login/Userdetail", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({email, password}),
			});
			const data = await response.json();
			if (response.status === "401" || response.status === 401) {
				alert(data.message);
			} else if (response.status === "200" || response.status === 200) {
        alert(data.message);
        
        // nav('/home');
        nav('/home', {state:{id: data.id,username: data.username}});
      }
		} catch (err) {
			console.log(err);
		}
	};
  

  return (
    <div className='w-full min-h-[100vh] sticky mainBG'>
      <AnimatedPage>
          <div className='w-full min-h-[inherit] transform scale-[0.8] flex signup'>
              <div className='relative sm:flex flex-col items-center w-1/2 loginIMG hidden sm:block'>
                <h1 className='relative font-bold w-[80%] text-gray-50 lg:text-7xl md:text-6xl sm:text-5xl lg:mt-28 md:mt-20 sm:mt-20 headingShadow'>
                  Turn Your Ideas into reality
                </h1>
                <p className='relative w-[85%] mt-4 mb-8 text-amber-200 font-bold lg:text-3xl md:text-2xl sm:text-2xl md:w-[90%] mt-2 text-center joinShadow tracking-wide'>Join us and get attractive ideas/reactions from the community...</p>
                <div className='lg:mr-36 md:mr-16 sm:mr-8 lg:w-[50%] md:w-[60%] sm:w-[70%] mb-24 relative'>
                  <img src={loginroadmap} alt="" className='w-full h-full' />
                </div>
              </div>


              <div className='md:w-1/2 w-full sm:w-1/2 lg:w-1/2 relative bg-[#f5f5f5] flex flex-col py-16 lg:px-16 md:px-12 sm:px-8 px-12 justify-between items-center space-y-6'>
                <h1 className='w-full max-w-[600px] mx-auto text-2xl text-[#060606] font-semibold mr-auto'>
                  Elite Heads
                </h1>

                <div className='w-full flex flex-col max-w-[600px]'>
                  <div className='w-full flex flex-col mb-2'>
                    <h3 className='text-4xl font-semibold mb-2'>
                      Login
                    </h3>
                    <p className='text-lg mb-2'>
                      Welcome! Please Enter your Details to Login.
                    </p>
                  </div>

                  <form className='w-full flex flex-col'>
                    
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

                    <div className='w-full flex items-center justify-between'>
                      <div className='w-full flex items-center'>
                        <input type="checkbox" id="remeberme" className='w-4 h-4 mr-2' />
                        <p className='text-sm'>Remember Me</p>
                      </div>
                      <p className='text-base whitespace-nowrap font-medium underline underline-offset-2 cursor-pointer'>Forgot Password</p>
                    </div>

                    <div className='w-full flex flex-col my-4'>
                      <button  onClick={handleSubmit} type="submit" className='w-full text-xl text-white font-semibold bg-[#060606] my-2 rounded-md p-4 text-center flex items-center justify-center'>Login</button>
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
                  <p className='text-base font-normal text-[#060606]'>Don't Have an account? <Link to='/'> <span className='font-bold underline underline-offset-2 cursor-pointer'>Sign Up!</span> </Link></p>
                </div>
              </div>
          </div>
      </AnimatedPage>
    </div>
  )
}

export default Login;


 