import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Mail, Lock, User, Github, Check, X } from 'lucide-react';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Password validation
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98 }
  };

  return (
    <div className='min-h-screen max-w-screen m-0 p-0 overflow-x-hidden overflow-y-auto transition-all scroll-smooth bg-gray-950'>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Section with Gradient Background */}
        <motion.div 
          initial="hidden"
          animate="show"
          variants={container}
          className="w-full lg:w-2/5 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-purple-800 to-indigo-900 lg:rounded-r-3xl p-8 lg:p-16 relative overflow-hidden"
        >
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <motion.div 
              animate={{ 
                x: [0, 10, -10, 0],
                y: [0, -10, 15, 0]
              }}
              transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-400 rounded-full opacity-20 blur-3xl"
            />
            <motion.div 
              animate={{ 
                x: [0, -15, 15, 0],
                y: [0, 15, -15, 0]
              }}
              transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
              className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-500 rounded-full opacity-20 blur-3xl"
            />
          </div>

          {/* Brand Logo */}
          <motion.div 
            variants={item}
            className="flex items-center mb-16 z-10"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-white to-purple-200 flex items-center justify-center mr-3 shadow-lg">
              <div className="w-5 h-5 bg-purple-600 rounded-full"></div>
            </div>
            <span className="font-extrabold text-2xl tracking-tight">OnlyRipe</span>
          </motion.div>
          
          {/* Intro Text */}
          <motion.div 
            variants={item}
            className="w-full max-w-sm text-center mb-20 z-10"
          >
            <h1 className="text-5xl font-bold mb-6">Get Started with Us</h1>
            <p className="text-xl opacity-90">Complete these easy steps to register your account and join our community.</p>
          </motion.div>
          
          {/* Steps */}
          <div className="w-full max-w-sm space-y-6 z-10">
            {[1, 2, 3].map((step) => (
              <motion.button
                key={step}
                whileHover="hover"
                whileTap="tap"
                variants={{
                  ...item,
                  hover: { scale: 1.02, transition: { duration: 0.2 } },
                  tap: { scale: 0.98 }
                }}
                className={`w-full rounded-2xl py-5 px-6 flex items-center justify-between transition-all ${
                  activeStep === step 
                    ? "bg-white text-gray-900 shadow-xl" 
                    : "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/15"
                }`}
                onClick={() => setActiveStep(step)}
              >
                <div className="flex items-center">
                  <div className={`h-10 w-10 rounded-xl mr-4 flex items-center justify-center text-base font-bold ${
                    activeStep === step 
                      ? "bg-purple-600 text-white" 
                      : "bg-white/20 text-white"
                  }`}>{step}</div>
                  <span className="font-semibold text-lg">
                    {step === 1 ? "Create account" : step === 2 ? "Set up workspace" : "Complete profile"}
                  </span>
                </div>
                {activeStep === step && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
          
          {/* Testimonial */}
          <motion.div
            variants={item}
            className="mt-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-sm z-10"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-300 mr-3"></div>
              <div>
                <h3 className="font-semibold">Sarah Johnson</h3>
                <p className="text-sm opacity-80">Product Designer</p>
              </div>
            </div>
            <p className="italic text-sm opacity-90">"Joining OnlyRipe was one of the best decisions I've made for my career. The platform is intuitive and the community is amazing!"</p>
          </motion.div>
        </motion.div>
        
        {/* Right Section with Form */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-3/5 flex items-center justify-center p-8 lg:p-16 bg-gray-950"
        >
          <div className="w-full max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-bold mb-3 text-white">Sign Up Account</h2>
              <p className="text-xl text-gray-400">Enter your personal data to create your account.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <motion.button 
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
                className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl py-4 px-4 flex items-center justify-center gap-3 border border-gray-700 hover:border-purple-500 transition-all shadow-lg"
              >
                <Mail size={20} className="text-gray-300" />
                <span className="font-medium">Continue with Google</span>
              </motion.button>
              <motion.button 
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
                className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl py-4 px-4 flex items-center justify-center gap-3 border border-gray-700 hover:border-purple-500 transition-all shadow-lg"
              >
                <Github size={20} className="text-gray-300" />
                <span className="font-medium">Continue with Github</span>
              </motion.button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="h-px bg-gray-800 flex-1"></div>
              <span className="text-gray-500 text-base font-medium">Or continue with email</span>
              <div className="h-px bg-gray-800 flex-1"></div>
            </motion.div>
            
            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-base font-medium mb-2 text-white">First Name</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <User size={18} />
                    </div>
                    <input 
                      type="text" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. John" 
                      className="w-full h-14 bg-gray-900 border border-gray-800 rounded-xl p-4 pl-12 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-base font-medium mb-2 text-white">Last Name</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <User size={18} />
                    </div>
                    <input 
                      type="text" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Francisco" 
                      className="w-full h-14 bg-gray-900 border border-gray-800 rounded-xl p-4 pl-12 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-base font-medium mb-2 text-white">Email</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. johnfrancis@gmail.com" 
                    className="w-full h-14 bg-gray-900 border border-gray-800 rounded-xl p-4 pl-12 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-base font-medium mb-2 text-white">Password</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    placeholder="Enter your password" 
                    className="w-full h-14 bg-gray-900 border border-gray-800 rounded-xl p-4 pl-12 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
                  />
                  <button 
                    type="button" 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={20} className="text-gray-400 hover:text-white transition-colors" />
                    ) : (
                      <Eye size={20} className="text-gray-400 hover:text-white transition-colors" />
                    )}
                  </button>
                </div>
                
                {/* Password requirements */}
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: passwordFocused || password.length > 0 ? "auto" : 0,
                    opacity: passwordFocused || password.length > 0 ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                    <div className={`flex items-center ${hasMinLength ? 'text-green-500' : 'text-gray-400'}`}>
                      {hasMinLength ? <Check size={14} className="mr-2" /> : <X size={14} className="mr-2" />}
                      At least 8 characters
                    </div>
                    <div className={`flex items-center ${hasUpperCase ? 'text-green-500' : 'text-gray-400'}`}>
                      {hasUpperCase ? <Check size={14} className="mr-2" /> : <X size={14} className="mr-2" />}
                      One uppercase letter
                    </div>
                    <div className={`flex items-center ${hasNumber ? 'text-green-500' : 'text-gray-400'}`}>
                      {hasNumber ? <Check size={14} className="mr-2" /> : <X size={14} className="mr-2" />}
                      One number
                    </div>
                    <div className={`flex items-center ${hasSpecialChar ? 'text-green-500' : 'text-gray-400'}`}>
                      {hasSpecialChar ? <Check size={14} className="mr-2" /> : <X size={14} className="mr-2" />}
                      One special character
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="flex items-center mt-6">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="h-5 w-5 rounded border-gray-700 bg-gray-900 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="terms" className="ml-3 text-sm text-gray-400">
                  I agree to the <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a> and <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
                </label>
              </div>
              
              <motion.button 
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl py-4 font-semibold text-lg mt-8 transition-all shadow-lg flex items-center justify-center"
              >
                <span>Create Account</span>
                <ArrowRight size={20} className="ml-2" />
              </motion.button>
            </motion.form>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center text-base text-gray-400 mt-12"
            >
              Already have an account? <a href="#" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">Log in</a>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;