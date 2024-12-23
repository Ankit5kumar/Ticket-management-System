const express = require('express');
const connectDB = require('./src/config/db');
var cors = require('cors')
require('./src/config/env'); 
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
   origin: "*",
   credentials: true
}))
// Register routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/tasks', require('./src/routes/taskRoutes'));
app.use('/api/Team', require('./src/routes/teamRoutes'));
app.get('/',(req,res)=>{
   return res.send({msg:"Welcome to TMS"})
})

app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));