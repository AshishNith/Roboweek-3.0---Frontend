import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import TeamCard from '../components/TeamCard';  // Import TeamCard

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users');
        setTeamMembers(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamData();
  }, []);

  if (loading) {
    return <div className="text-white text-center py-20 text-2xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 backdrop-blur-lg bg-black/10 p-8 rounded-2xl border border-cyan-500/50"
        >
          <h1 className="text-6xl font-bold text-white mb-4">
            Our <span className="text-cyan-400">Team</span>
          </h1>
          <p className="text-xl text-gray-300">Meet the minds behind RoboWeek 3.0</p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>

        {/* Join Our Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 backdrop-blur-lg bg-black/10 rounded-2xl p-8 border border-cyan-500/50"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Join Our Team</h2>
          <p className="text-center text-gray-300 mb-8">
            We're always looking for passionate individuals to join our team.
            If you're interested in helping organize future events, get in touch!
          </p>
          <div className="text-center">
            <Button text={"Contact Us"} textSize="text-2xl" iconLink={<i className="ri-mail-line text-3xl"></i>} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
