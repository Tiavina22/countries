const express = require('express');
const cors = require('cors');
const countryRoutes = require('./routes/countryRoutes');

const app = express();

app.use(cors());
app.use(express.json());  

app.use('/api/countries', countryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
