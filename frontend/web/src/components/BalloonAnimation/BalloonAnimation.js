import React from 'react';
import { motion } from 'framer-motion';

const balloonColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];
const numberOfBalloons = 10;

const generateRandomColor = () => {
  return balloonColors[Math.floor(Math.random() * balloonColors.length)];
};

const generateRandomXPosition = () => {
  return Math.floor(Math.random() * 100) + '%';
};

const Balloon = ({ color, initialX }) => {
  return (
    <motion.div
      style={{
        width: '50px',
        height: '80px',
        backgroundColor: color,
        borderRadius: '50% 50% 50% 50%',
        position: 'absolute',
        bottom: '-100px',
        left: initialX,
      }}
      animate={{ y: ['100vh', '-100vh'], opacity: [1, 1, 0] }}
      transition={{
        duration: 5,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    />
  );
};

const BalloonAnimation = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Ensures that the container does not capture any mouse events
        zIndex: 1, // Ensures that the balloons are behind other content
      }}
    >
      {Array.from({ length: numberOfBalloons }).map((_, index) => (
        <Balloon
          key={index}
          color={generateRandomColor()}
          initialX={generateRandomXPosition()}
        />
      ))}
    </div>
  );
};

export default BalloonAnimation;
