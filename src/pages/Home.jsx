import { motion } from 'framer-motion';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const Home = () => {
  const theme = {
    themeOfEvent: "Rise of the Machines"
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col gap-20 pb-8 items-center justify-center text-white">
        <h1 className="text-[200px] font-bold mb-4" style={{
          WebkitTextStroke: '2px #22d3ee',
          color: 'transparent',
          textAlign: 'center',
          fontFamily: "'Orbitron', sans-serif", // Futuristic font
        }}>RoboWeek 3.0</h1>

        <h2 className="text-3xl text-cyan-400" style={{ fontFamily: "'Roboto', sans-serif" }}>Conducted by Robotics Society NIT Hamirpur</h2>
        <div className="flex justify-center">
          <Link to="/Login">
            <Button text="Register Now" textSize="text-4xl" iconLink={<i className="ri-arrow-right-line"></i>} />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 z-1000">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="relative z-1000 text-3xl font-bold text-center mb-12 text-cyan-400" style={{ fontFamily: "'Roboto', sans-serif" }}>Why Join RoboWeek 3.0?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Learn & Innovate",
                description: "Get hands-on experience with cutting-edge robotics technology"
              },
              {
                title: "Network",
                description: "Connect with industry experts and like-minded innovators"
              },
              {
                title: "Win Prizes",
                description: "Compete for exciting prizes and recognition"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="backdrop-blur-lg bg-black/20 p-8 rounded-xl border border-cyan-500 shadow-lg hover:border-cyan-500 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-4 text-cyan-400" style={{ fontFamily: "'Orbitron', sans-serif" }}>{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="relative z-1000 text-3xl font-bold text-center mb-12 text-cyan-400" style={{ fontFamily: "'Roboto', sans-serif" }}>Event Timeline</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-cyan-400/30"></div>
            
            {[
              { date: "Feb 21", event: "Registration Opens" },
              { date: "Mar 1", event: "Team Formation Deadline" }, 
              { date: "Mar 28", event: "Events Begin" },
              { date: "Mar 29", event: "Day 2"},
              { date: "Mar 29", event: "Final Day" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'pl-8' : 'pr-8 text-right'}`}>
                  <div className="backdrop-blur-lg bg-black/20 p-6 rounded-xl border border-cyan-500 shadow-lg hover:border-cyan-400 transition-all duration-300">
                    <h3 className="text-xl font-bold text-cyan-400 mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>{item.date}</h3>
                    <p className="text-gray-300">{item.event}</p>
                  </div>
                </div>
                
                <div className="w-2/12 flex justify-center">
                  <motion.div 
                    className="w-6 h-6 bg-cyan-400 rounded-full border-4 border-black relative z-10"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
