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

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   setSubmitted(true)
  //   setEmail('')
  //   setNumber('')
  // }

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
              <a href="#" className="text-2xl font-bold text-primary-500">
                DabbaExpress
              </a>
            </motion.div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
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
              {['Features', 'Why It Matters', 'About Us', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-gray-600 hover:text-primary-500 transition-colors duration-300"
                  variants={itemVariant}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
              {/* <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Waitlist
              </motion.button> */}
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
                className="md:hidden py-4"
              >
                {['Features', 'Why It Matters', 'About Us', 'Contact'].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block py-2 text-gray-600 hover:text-primary-500"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
                {/* <motion.button
                  className="btn-primary w-full mt-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Join Waitlist
                </motion.button> */}
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
      <section className="bg-white section" id="why">
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
              
              {/* <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-6 py-3 rounded-full border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                  required
                />
                <button type="submit" className="btn-primary w-full">
                  Join the waitlist
                </button>
              </form> */}
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
                {/* <a href="#" className="text-gray-400 hover:text-primary-500">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a> */}
                {/* <a href="#" className="text-gray-400 hover:text-primary-500">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App