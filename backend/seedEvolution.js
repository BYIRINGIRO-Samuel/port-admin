const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Career = require('./models/Career');

dotenv.config();

const evolutionData = [
  {
    role: "CORE FOUNDATIONS",
    company: "System Architecture Research",
    period: "PHASE 01",
    description: "Mastered the core tenets of semantic HTML5, CSS layout systems, and JavaScript engine logic. Focused on building clean, accessible, and performant user interfaces with a focus on web standards."
  },
  {
    role: "FULL-STACK PIVOT",
    company: "Modern Framework Mastery",
    period: "PHASE 02",
    description: "Transitioned into complex application development using React and Node.js. Developed a deep understanding of state management, RESTful API design, and full-stack data orchestration."
  },
  {
    role: "PRODUCTION ENGINEERING",
    company: "Advanced Software Integration",
    period: "ACTIVE PHASE",
    description: "Currently scaling into enterprise-grade deployments, focusing on database optimization (MongoDB), security protocols (JWT), and automated integration workflows for stable production environments."
  }
];

const seedEvolution = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing career entries
    await Career.deleteMany({});
    console.log('Cleared old career data');

    // Insert new evolution data
    await Career.insertMany(evolutionData);
    console.log('Successfully seeded Technical Evolution timeline');

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedEvolution();
