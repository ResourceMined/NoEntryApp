export default function renderSignsPage() {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>No Entry Signs</title>
          <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
          <script src="/htmx.js" defer></script>
          <link rel="stylesheet" href="/main.css" />
        </head>
        <body>
          <header id="main-header">
            <h1>No Entry Signs</h1>
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
              <tbody hx-get="/api/signs" hx-trigger="load">
                <!-- Signs will be populated here -->
              </tbody>
            </table>
          </main>
  
          <div id="modal-container"></div>
  
          <script src="/client.js" type="module"></script>
        </body>
      </html>
    `;
  }