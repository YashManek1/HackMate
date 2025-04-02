import React, { useState } from 'react';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen max-w-screen bg-black text-white overflow-x-hidden overflow-y-auto transition-all scroll-smooth">
      <div className="flex flex-col lg:flex-row min-h-screen p-4 md:p-8 lg:p-12 gap-6 lg:gap-12">
        {/* Left Section with Purple Gradient */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-purple-900 p-6 md:p-10 lg:p-16 rounded-2xl shadow-2xl">
          <div className="flex items-center mb-10 lg:mb-16">
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center mr-3">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="font-bold text-xl tracking-wide">OnlyRipe</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">Get Started with Us</h1>
          <p className="text-lg mb-12 text-center max-w-md mx-auto opacity-90">Complete these easy steps to register your account and join our community.</p>
          
          <div className="w-full max-w-sm  flex flex-col gap-5 ">
            {['Sign up your account', 'Set up your workspace', 'Set up your profile'].map((text, index) => (
              <button 
                key={index} 
                className={`w-full h-max rounded-full py-6 flex items-center justify-center font-medium text-lg transition-all duration-300 ${
                  index === 0 
                    ? 'bg-white text-black shadow-lg hover:shadow-xl hover:bg-gray-100 transform hover:-translate-y-1' 
                    : 'bg-transparent border border-white/40 text-white/90 hover:bg-white/10 hover:border-white/60'
                }`}
              >
                <span className="h-7 w-7 rounded-full flex items-center justify-center text-sm mr-4 
                  ${index === 0 ? 'bg-black/10 text-black' : 'bg-white/20 text-white'}">
                  {index + 1}
                </span>
                {text}
              </button>
            ))}
          </div>
        </div>
        
        {/* Right Section with Form */}
        <div className="w-full lg:w-1/2 flex  items-center justify-center p-6 md:p-10 lg:p-16 bg-gray-900 rounded-2xl shadow-2xl">
          <div className="w-full max-w-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Sign Up Account</h2>
            <p className="text-base text-gray-400 mb-10">Enter your personal data to create your account.</p>
            
            <div className="flex gap-4 mb-8">
              {[
                { name: 'Google', icon: 'G' },
                { name: 'Github', icon: 'G' }
              ].map((provider, idx) => (
                <button 
                  key={idx} 
                  className="flex-1 border border-gray-700 rounded-xl py-3 px-4 flex items-center justify-center gap-3 
                    hover:bg-gray-800 hover:border-gray-500 transition-all duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-sm font-medium">
                    {provider.icon}
                  </div>
                  {provider.name}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-gray-700 flex-1"></div>
              <span className="text-gray-500 text-base px-2">Or</span>
              <div className="h-px bg-gray-700 flex-1"></div>
            </div>
            
            <form className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                {['First Name', 'Last Name'].map((label, index) => (
                  <div key={index} className="flex-1">
                    <label className="block text-base mb-2 font-medium">{label}</label>
                    <input 
                      type="text" 
                      placeholder={`eg. ${label.split(' ')[0]}`}
                      className="w-full bg-transparent border border-gray-700 rounded-lg p-4 text-base
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                        transition-all duration-300 hover:border-gray-500"
                    />
                  </div>
                ))}
              </div>
              
              <div>
                <label className="block text-base mb-2 font-medium">Email</label>
                <input 
                  type="email" 
                  placeholder="eg. johnfrancis@gmail.com" 
                  className="w-full bg-transparent border border-gray-700 rounded-lg p-4 text-base
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    transition-all duration-300 hover:border-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-base mb-2 font-medium">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter your password" 
                    className="w-full bg-transparent border border-gray-700 rounded-lg p-4 text-base pr-12
                      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                      transition-all duration-300 hover:border-gray-500"
                  />
                  <button 
                    type="button" 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400
                      hover:text-gray-200 transition-colors duration-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      {showPassword ? (
                        <>
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </>
                      ) : (
                        <>
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">Must be at least 8 characters.</p>
              </div>
              
              <div className="mt-8">
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full py-4 px-6 font-medium text-lg
                    hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-purple-500/30
                    transform hover:-translate-y-1"
                >
                  Sign Up
                </button>
              </div>
            </form>
            
            <p className="text-center text-base text-gray-400 mt-8">
              Already have an account? 
              <a href="#" className="text-purple-400 hover:text-purple-300 ml-2 font-medium
                hover:underline transition-all duration-300">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;