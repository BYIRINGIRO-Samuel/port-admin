const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');

dotenv.config();

const initialServices = [
  {
    title: "Frontend Engineering",
    description: "Architecting high-performance web applications using React and Next.js. I specialize in building scalable, interactive user interfaces with a focus on core web vitals and seamless user journeys.",
    icon: "Monitor",
    size: "lg",
    tags: ["React", "Next.js", "Performance"]
  },
  {
    title: "Mobile App Development",
    description: "Developing cross-platform mobile solutions that bridge the gap between native performance and complex functionality, ensuring a consistent brand experience.",
    icon: "Smartphone",
    size: "md",
    tags: ["React Native", "Cross-Platform", "UX"]
  },
  {
    title: "Machine Learning & AI",
    description: "Integrating intelligent algorithms and predictive models into digital products to enhance automation, data analysis, and personalized user experiences.",
    icon: "BrainCircuit",
    size: "md",
    tags: ["AI", "Automation", "Data Modeling"]
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
