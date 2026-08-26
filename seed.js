require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('./models/Student');

const students = [
  {name:'Daizy-Leticia', email:'daizy@gmail.com', course: 'Machine Learning' },
  {name: 'Calvin Brown', email: 'brown@email.com', course: 'Data Science'},
  {name: 'Favour Bright', email: 'brightfe@email.com', course: 'Backend_Node.js'},
  { name: 'Ngum Gills',  email: 'gilsngum@gmail.com',   course: 'Cybersecurity' },
  { name: 'Von Precious',email: 'vonPre@gmail.com',   course: 'Web Development' }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected for seeding');

    await Student.deleteMany({});          //clears any old record in the database          
    const created = await Student.insertMany(students);

    created.forEach(s => console.log(`${s.name} → ${s._id}`)); 
  } catch (error) {
    console.error('Seeding failed:', error.message);
  } finally {
    await mongoose.disconnect();     // allows the process to exit cleanly
    console.log('Disconnected');
  }
};

seedDB();
