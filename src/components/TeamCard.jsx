import React from "react";
import { motion } from "framer-motion";
import "./teamCard.css";

const TeamCard = ({ member }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="team-card"
    >
      <div className="card-inner">
        
        <div className="card-front">
          <div className="w-full h-full flex flex-col">
            <div className="card-image-container">
              <img
                src={member.ProfilePicture}
                alt={member.Name}
                className="card-image"
              />
            </div>

            <div className="card-text-container">
              <h3 className="text-xl font-bold text-white mt-4">{member.Name}</h3>
              <p className="text-cyan-400 font-semibold">{member.Post}</p>
            </div>
          </div>
        </div>

        <div className="card-back">
          <div className="text-container">
            <p className="text-gray-300 px-6 text-center">{member.TechStack}</p>
            <div className="flex gap-4 mt-4">
              <a href={member.Github} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white">
                GitHub
              </a>
              <a href={member.LinkedIn} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white">
                LinkedIn
              </a>
              <a href={member.Instagram} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white">
                Instagram
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </motion.div>
  );
};

export default TeamCard;
