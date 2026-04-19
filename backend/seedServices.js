const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');

dotenv.config();

const initialServices = [
  {
    title: "Full-Stack Orchestration",
    description: "Architecting end-to-end applications with React, Next.js, and Node.js. Focused on performance, scalability, and clean code principles.",
    icon: "Code2",
    size: "lg",
    tags: ["Frontend", "Backend", "API"]
  },
  {
    title: "Aesthetic UI/UX",
    description: "Crafting immersive, high-fidelity interfaces using Framer Motion and Three.js for a premium user experience.",
    icon: "Layout",
    size: "md",
    tags: ["Animation", "Design", "Interactions"]
  },
  {
    title: "Data Integrity",
    description: "Designing optimized MongoDB structures and secure data flows to ensure your application remains stable and lightning fast.",
    icon: "Database",
    size: "md",
    tags: ["MongoDB", "NoSQL", "Query Optimization"]
  },
  {
    title: "Security & Auth",
    description: "Implementing advanced JWT authentication systems and security protocols to protect user data and maintain trust.",
    icon: "ShieldCheck",
    size: "sm",
    tags: ["Auth", "JWT", "Security"]
  }
];

const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing services
    await Service.deleteMany({});
    
    // Insert initial services
    await Service.insertMany(initialServices);
    console.log('Successfully seeded Services catalog');

    process.exit();
  } catch (error) {
    console.error('Error seeding services:', error);
    process.exit(1);
  }
};

seedServices();
