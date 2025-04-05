import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon,
  ChartBarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline'

function App() {
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleSubmit(e){
    const formEle = document.querySelector('form')
    e.preventDefault()
    setSubmitted(true)
    console.log('Form submitted')
    const formData = new FormData(formEle)
    fetch("https://script.google.com/macros/s/AKfycbxwN0y84qEqsPsbD_Ar1XvCV3iJJvp4TzGCPh_5gVzmeQV9iIpBXBMt32f_u2f81Nc/exec", {
      method: "POST",
      body: formData,
    }).then((response) => response.json()).then((data)=>{
      console.log(data)
    }).catch((error) => {
      console.error('Error:', error);
    })
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const navVariants = {
    transparent: {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      boxShadow: 'none',
    },
    solid: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      const yOffset = -80 // Account for fixed header
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <motion.nav
        initial="transparent"
        animate={scrolled ? "solid" : "transparent"}
        variants={navVariants}
        transition={{ duration: 0.3 }}
        className="fixed w-full z-50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className="text-2xl font-bold text-primary-500"
              >
                DabbaExpress
              </a>
            </motion.div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 p-2 rounded-lg"
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Desktop menu */}
            <motion.div 
              className="hidden md:flex items-center space-x-8"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              <motion.a
                href="#features"
                onClick={(e) => handleNavClick(e, 'features')}
                className="text-gray-600 hover:text-primary-500 transition-colors duration-300"
                variants={itemVariant}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Features
              </motion.a>
              <motion.a
                href="#why-it-matters"
                onClick={(e) => handleNavClick(e, 'why-it-matters')}
                className="text-gray-600 hover:text-primary-500 transition-colors duration-300"
                variants={itemVariant}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Why It Matters
              </motion.a>
              <motion.a
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
                className="text-gray-600 hover:text-primary-500 transition-colors duration-300"
                variants={itemVariant}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                About Us
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="text-gray-600 hover:text-primary-500 transition-colors duration-300"
                variants={itemVariant}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
              </motion.a>
            </motion.div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-white rounded-lg shadow-lg mt-2 overflow-hidden"
              >
                <div className="py-2">
                  <motion.a
                    href="#features"
                    onClick={(e) => handleNavClick(e, 'features')}
                    className="block px-4 py-3 text-gray-600 hover:text-primary-500 hover:bg-orange-50 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Features
                  </motion.a>
                  <motion.a
                    href="#why-it-matters"
                    onClick={(e) => handleNavClick(e, 'why-it-matters')}
                    className="block px-4 py-3 text-gray-600 hover:text-primary-500 hover:bg-orange-50 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Why It Matters
                  </motion.a>
                  <motion.a
                    href="#about"
                    onClick={(e) => handleNavClick(e, 'about')}
                    className="block px-4 py-3 text-gray-600 hover:text-primary-500 hover:bg-orange-50 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    About Us
                  </motion.a>
                  <motion.a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, 'contact')}
                    className="block px-4 py-3 text-gray-600 hover:text-primary-500 hover:bg-orange-50 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Contact
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="bg-gradient-to-b from-orange-50 to-white section pt-32"
      >
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading">
              A Taste of Home, Just a Click Away 🍲
            </h1>
            <p className="subheading">
              Mumbai's first platform connecting you with trusted home-based tiffin providers. 
              Fresh, local, homemade food—delivered to educational institutes and offices.
            </p>
            
            <form onSubmit={(e) => handleSubmit(e)} className="max-w-md mx-auto space-y-4">
              {!submitted ? (
                <>
                  <input
                    type="email"
                    value={email}
                    name='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-3 rounded-full border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                    required
                  />
                  <input
                    type="phonenumber"
                    value={number}
                    name='Phone'
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full px-6 py-3 rounded-full border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                    required
                  />
                  <button type="submit" className="btn-primary w-full">
                    Be the first to know when we launch!
                  </button>
                </>
              ) : (
                <div className="text-secondary-600 font-semibold text-lg py-4">
                  Thanks! We'll notify you when we go live. 🎉
                </div>
              )}
            </form>
          </div>
        </div>
      </motion.section>

      {/* Market Opportunity Section */}
      <section className="bg-white section" id="features">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading">Market Opportunity</h2>
            <p className="subheading">Addressing a Critical Need in Mumbai's Food Ecosystem</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-primary-50 p-6 rounded-2xl"
            >
              <UserGroupIcon className="w-12 h-12 text-primary-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Thousands of Migrants</h3>
              <p className="text-gray-600">Daily migrants in Mumbai seeking affordable, homemade food options</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary-50 p-6 rounded-2xl"
            >
              <BuildingOfficeIcon className="w-12 h-12 text-secondary-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Unorganized Market</h3>
              <p className="text-gray-600">Large network of women-led tiffin businesses ready for digitization</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-primary-50 p-6 rounded-2xl"
            >
              <AcademicCapIcon className="w-12 h-12 text-primary-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Student Focus</h3>
              <p className="text-gray-600">Targeting educational institutes unlike traditional dabba services</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-secondary-50 p-6 rounded-2xl"
            >
              <ChartBarIcon className="w-12 h-12 text-secondary-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">First Mover</h3>
              <p className="text-gray-600">First dedicated platform for homemade tiffin aggregation</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We're Building Section */}
      <section className="bg-orange-50 section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="heading">What We're Building</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <ArrowRightIcon className="w-6 h-6 text-primary-500 flex-shrink-0" />
                  <span>One-stop platform connecting customers with verified tiffin providers</span>
                </li>
                <li className="flex items-start space-x-3">
                  <ArrowRightIcon className="w-6 h-6 text-primary-500 flex-shrink-0" />
                  <span>Daily menu updates with quantity limits (50-100 tiffins)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <ArrowRightIcon className="w-6 h-6 text-primary-500 flex-shrink-0" />
                  <span>Choose between full/half portions, order before cutoff time</span>
                </li>
                <li className="flex items-start space-x-3">
                  <ArrowRightIcon className="w-6 h-6 text-primary-500 flex-shrink-0" />
                  <span>Self-delivery option for educational institutes</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="aspect-square bg-primary-100 rounded-2xl p-6 flex items-center justify-center">
                <img src="https://img.icons8.com/ios/100/000000/cooking-book.png" alt="Cooking" className="w-20 h-20" />
              </div>
              <div className="aspect-square bg-secondary-100 rounded-2xl p-6 flex items-center justify-center">
                <img src="https://img.icons8.com/ios/100/000000/scooter.png" alt="Delivery" className="w-20 h-20" />
              </div>
              <div className="aspect-square bg-secondary-100 rounded-2xl p-6 flex items-center justify-center">
                <img src="https://img.icons8.com/ios/100/000000/restaurant.png" alt="Food" className="w-20 h-20" />
              </div>
              <div className="aspect-square bg-primary-100 rounded-2xl p-6 flex items-center justify-center">
                <img src="https://img.icons8.com/ios/100/000000/food-receiver.png" alt="Customer" className="w-20 h-20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="bg-white section" id="why-it-matters">
        <div className="container">
          <h2 className="heading text-center mb-16">Why It Matters</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-orange-50 rounded-2xl p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-6">For Customers</h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>Hygienic, home-cooked food at affordable prices</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>Easy to browse providers & daily menus</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>Multiple portion sizes and delivery options</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>Discover local culinary gems in your area</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-orange-50 rounded-2xl p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-6">For Tiffin Providers</h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>Digital storefront with daily menu updates</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>Expand beyond local word-of-mouth network</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>Smart inventory management system</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>Grow business without technical expertise</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Impact Section */}
      <section className="bg-orange-50 section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading">Business Impact</h2>
            <p className="subheading">Creating Sustainable Change in Mumbai's Food Ecosystem</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4">Empowering Women</h3>
              <p className="text-gray-600">Supporting local women entrepreneurs to grow their tiffin businesses sustainably through digitization</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4">Health Impact</h3>
              <p className="text-gray-600">Reducing dependency on unhealthy restaurant food by providing access to nutritious homemade meals</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4">Job Creation</h3>
              <p className="text-gray-600">Creating new opportunities in logistics and delivery, contributing to local employment</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Us Early Section */}
      <section className="bg-white section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <blockquote className="text-2xl italic text-gray-600 mb-8">
                "This will help us reach more people and run our tiffin business better."
                <footer className="text-lg font-semibold mt-4">
                  – Home Chef Sneha, Mumbai
                </footer>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-orange-50 section" id="about">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="heading">About Us</h2>
            <p className="text-lg text-gray-600 mb-8">
              We are a team of developers based in Mumbai, passionate about solving the home food discovery problem. 
              Our mission is to bridge the gap between students/professionals seeking homemade food and local tiffin providers, 
              while empowering women entrepreneurs with digital tools for sustainable growth.
            </p>
            <p className="text-lg text-gray-600">
              By organizing and digitizing this unstructured industry, we're creating a win-win ecosystem 
              that benefits both customers and providers while promoting healthy eating habits in our community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12" id="contact">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">DabbaExpress</h3>
                <p className="text-gray-600">Launching soon in Mumbai | 2025</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <EnvelopeIcon className="w-6 h-6 text-gray-400" />
                  <a href="mailto:rushijadhav1423@gmail.com" className="text-gray-600 hover:text-primary-500">
                    hello@dabbaexpress.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="w-6 h-6 text-gray-400" />
                  <a href="https://wa.me/917721875675" className="text-gray-600 hover:text-primary-500">
                    WhatsApp Us
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="w-6 h-6 text-gray-400" />
                  <span className="text-gray-600">Mumbai, India</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex justify-center space-x-6">
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App