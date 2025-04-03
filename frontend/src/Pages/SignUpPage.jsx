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
    <div className="flex flex-col lg:flex-row w-full">
      {/* Left Section with Gradient Background */}
      <motion.div 
        initial="hidden"
        animate="show"
        variants={container}
        className="w-full lg:w-2/5 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-purple-800 to-indigo-900 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 relative overflow-hidden min-h-screen lg:min-h-full"
      >
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div 
            animate={{ 
              x: [0, 10, -10, 0],
              y: [0, -10, 15, 0]
            }}
            transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-purple-400 rounded-full opacity-20 blur-3xl"
          />
          <motion.div 
            animate={{ 
              x: [0, -15, 15, 0],
              y: [0, 15, -15, 0]
            }}
            transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-36 sm:w-56 md:w-72 h-36 sm:h-56 md:h-72 bg-indigo-500 rounded-full opacity-20 blur-3xl"
          />
        </div>

        {/* Brand Logo */}
        <motion.div 
          variants={item}
          className="flex items-center mb-8 sm:mb-12 lg:mb-16 z-10"
        >
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-r from-white to-purple-200 flex items-center justify-center mr-3 shadow-lg">
            <div className="w-4 sm:w-5 h-4 sm:h-5 bg-purple-600 rounded-full"></div>
          </div>
          <span className="font-extrabold text-xl sm:text-2xl tracking-tight">OnlyRipe</span>
        </motion.div>
        
        {/* Intro Text */}
        <motion.div 
          variants={item}
          className="w-full max-w-xs sm:max-w-sm text-center mb-8 sm:mb-12 lg:mb-16 z-10"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Get Started with Us</h1>
          <p className="text-base sm:text-lg lg:text-xl opacity-90">Complete these easy steps to register your account and join our community.</p>
        </motion.div>
        
        {/* Steps */}
        <div className="w-full max-w-xs sm:max-w-sm space-y-3 sm:space-y-4 lg:space-y-6 z-10">
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
              className={`w-full rounded-xl sm:rounded-2xl py-3 sm:py-4 lg:py-5 px-4 sm:px-6 flex items-center justify-between transition-all ${
                activeStep === step 
                  ? "bg-white text-gray-900 shadow-xl" 
                  : "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/15"
              }`}
              onClick={() => setActiveStep(step)}
            >
              <div className="flex items-center">
                <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl mr-3 sm:mr-4 flex items-center justify-center text-sm sm:text-base font-bold ${
                  activeStep === step 
                    ? "bg-purple-600 text-white" 
                    : "bg-white/20 text-white"
                }`}>{step}</div>
                <span className="font-semibold text-base sm:text-lg">
                  {step === 1 ? "Create account" : step === 2 ? "Set up workspace" : "Complete profile"}
                </span>
              </div>
              {activeStep === step && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-purple-600 flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
        
        {/* Testimonial - Hidden on smaller screens */}
        <motion.div
          variants={item}
          className="mt-10 sm:mt-16 lg:mt-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-xs sm:max-w-sm z-10 hidden sm:block"
        >
          <div className="flex items-center mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-300 mr-3"></div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Sarah Johnson</h3>
              <p className="text-xs sm:text-sm opacity-80">Product Designer</p>
            </div>
          </div>
          <p className="italic text-xs sm:text-sm opacity-90">"Joining OnlyRipe was one of the best decisions I've made for my career. The platform is intuitive and the community is amazing!"</p>
        </motion.div>
      </motion.div>
      
      {/* Right Section with Form */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-3/5 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 bg-gray-950 min-h-screen lg:min-h-full"
      >
        <div className="w-full max-w-md lg:max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 sm:mb-8 lg:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-white">Sign Up Account</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400">Enter your personal data to create your account.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-10"
          >
            <motion.button 
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg sm:rounded-xl py-3 sm:py-4 px-3 sm:px-4 flex items-center justify-center gap-2 sm:gap-3 border border-gray-700 hover:border-purple-500 transition-all shadow-lg text-sm sm:text-base"
            >
              <Mail size={16} className="text-gray-300" />
              <span className="font-medium">Continue with Google</span>
            </motion.button>
            <motion.button 
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg sm:rounded-xl py-3 sm:py-4 px-3 sm:px-4 flex items-center justify-center gap-2 sm:gap-3 border border-gray-700 hover:border-purple-500 transition-all shadow-lg text-sm sm:text-base"
            >
              <Github size={16} className="text-gray-300" />
              <span className="font-medium">Continue with Github</span>
            </motion.button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-10"
          >
            <div className="h-px bg-gray-800 flex-1"></div>
            <span className="text-gray-500 text-sm sm:text-base font-medium">Or continue with email</span>
            <div className="h-px bg-gray-800 flex-1"></div>
          </motion.div>
          
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex-1">
                <label className="block text-sm sm:text-base font-medium mb-1 sm:mb-2 text-white">First Name</label>
                <div className="relative">
                  <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. John" 
                    className="w-full h-10 sm:h-12 lg:h-14 bg-gray-900 border border-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 pl-10 sm:pl-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm sm:text-base font-medium mb-1 sm:mb-2 text-white">Last Name</label>
                <div className="relative">
                  <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Francisco" 
                    className="w-full h-10 sm:h-12 lg:h-14 bg-gray-900 border border-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 pl-10 sm:pl-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm sm:text-base font-medium mb-1 sm:mb-2 text-white">Email</label>
              <div className="relative">
                <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail size={16} className="text-gray-400" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. johnfrancis@gmail.com" 
                  className="w-full h-10 sm:h-12 lg:h-14 bg-gray-900 border border-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 pl-10 sm:pl-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm sm:text-base font-medium mb-1 sm:mb-2 text-white">Password</label>
              <div className="relative">
                <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  placeholder="Enter your password" 
                  className="w-full h-10 sm:h-12 lg:h-14 bg-gray-900 border border-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 pl-10 sm:pl-12 pr-10 sm:pr-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
                />
                <button 
                  type="button" 
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={16} className="text-gray-400 hover:text-white transition-colors" />
                  ) : (
                    <Eye size={16} className="text-gray-400 hover:text-white transition-colors" />
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4 text-xs sm:text-sm">
                  <div className={`flex items-center ${hasMinLength ? 'text-green-500' : 'text-gray-400'}`}>
                    {hasMinLength ? <Check size={12} className="mr-1 sm:mr-2" /> : <X size={12} className="mr-1 sm:mr-2" />}
                    At least 8 characters
                  </div>
                  <div className={`flex items-center ${hasUpperCase ? 'text-green-500' : 'text-gray-400'}`}>
                    {hasUpperCase ? <Check size={12} className="mr-1 sm:mr-2" /> : <X size={12} className="mr-1 sm:mr-2" />}
                    One uppercase letter
                  </div>
                  <div className={`flex items-center ${hasNumber ? 'text-green-500' : 'text-gray-400'}`}>
                    {hasNumber ? <Check size={12} className="mr-1 sm:mr-2" /> : <X size={12} className="mr-1 sm:mr-2" />}
                    One number
                  </div>
                  <div className={`flex items-center ${hasSpecialChar ? 'text-green-500' : 'text-gray-400'}`}>
                    {hasSpecialChar ? <Check size={12} className="mr-1 sm:mr-2" /> : <X size={12} className="mr-1 sm:mr-2" />}
                    One special character
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="flex items-center mt-4 sm:mt-6">
              <input 
                type="checkbox" 
                id="terms" 
                className="h-4 w-4 sm:h-5 sm:w-5 rounded border-gray-700 bg-gray-900 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="terms" className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-400">
                I agree to the <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a> and <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
              </label>
            </div>
            
            <motion.button 
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg sm:rounded-xl py-3 sm:py-4 font-semibold text-base sm:text-lg mt-6 sm:mt-8 transition-all shadow-lg flex items-center justify-center"
            >
              <span>Create Account</span>
              <ArrowRight size={16} className="ml-2" />
            </motion.button>
          </motion.form>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center text-sm sm:text-base text-gray-400 mt-8 sm:mt-10 lg:mt-12"
          >
            Already have an account? <a href="#" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">Log in</a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;