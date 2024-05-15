import express from 'express';
import { noEntrySigns } from './data/noEntrySigns.js';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
const port = 3000;

app.get('/', (req, res) => {
  const tableRows = noEntrySigns.map(sign => `
    <tr data-id="${sign.id}">
      <td>${sign.location}</td>
      <td>${sign.message}</td>
      <td>${sign.installationDate}</td>
      <td>${sign.lastInspectionDate}</td>
      <td>${sign.status}</td>
      <td>
        <button class="edit-btn" data-sign-id="${sign.id}">Edit</button>
        <button class="delete-btn" data-sign-id="${sign.id}">Delete</button>
      </td>
    </tr>
  `).join('');

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>No Entry Signs</title>
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="/main.css" />
      </head>
      <body>
        <header id="main-header">
          <h1>No Entry Signs</h1>
          <button id="add-sign-btn">Add New Sign</button>
        </header>

        <main>
          <table id="signTable">
            <thead>
              <tr>
                <th>Location</th>
                <th>Message</th>
                <th>Installation Date</th>
                <th>Last Inspection Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </main>

        <div id="modal-container"></div>

        <script src="/client.js"></script>
      </body>
    </html>
  `);
});

app.get('/api/signs/:id', (req, res) => {
  const signId = parseInt(req.params.id);
  const sign = noEntrySigns.find(sign => sign.id === signId);

  if (sign) {
    res.json(sign);
  } else {
    res.status(404).json({ error: 'Sign not found' });
  }
});

app.post('/api/signs', (req, res) => {
    const newSign = {
      id: Date.now(),
      location: req.body.location,
      message: req.body.message,
      installationDate: req.body.installationDate,
      lastInspectionDate: req.body.lastInspectionDate,
      status: req.body.status
    };
  
    noEntrySigns.push(newSign);
    res.json(newSign);
  });

app.put('/api/signs/:id', (req, res) => {
  const signId = parseInt(req.params.id);
  const updatedSign = {
    id: signId,
    location: req.body.location,
    message: req.body.message,
    installationDate: req.body.installationDate,
    lastInspectionDate: req.body.lastInspectionDate,
    status: req.body.status
  };

  const signIndex = noEntrySigns.findIndex(sign => sign.id === signId);
  if (signIndex !== -1) {
    noEntrySigns[signIndex] = updatedSign;
    res.json(updatedSign);
  } else {
    res.status(404).json({ error: 'No entry sign not found' });
  }
});

app.delete('/api/signs/:id', (req, res) => {
  const signId = parseInt(req.params.id);
  const signIndex = noEntrySigns.findIndex(sign => sign.id === signId);

  if (signIndex !== -1) {
    const deletedSign = noEntrySigns.splice(signIndex, 1)[0];
    res.json(deletedSign);
  } else {
    res.status(404).json({ error: 'No entry sign not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});