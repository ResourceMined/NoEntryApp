function renderSignForm(sign) {
    return `
      <div id="editModal" class="modal">
        <div class="modal-content">
          <h2>${sign.id ? 'Edit' : 'Add'} No Entry Sign</h2>
          <form id="editForm">
            <input type="hidden" name="id" value="${sign.id || ''}">
            <label for="location">Location:</label>
            <input type="text" id="location" name="location" value="${sign.location || ''}" required>
  
            <label for="message">Message:</label>
            <input type="text" id="message" name="message" value="${sign.message || ''}" required>
  
            <label for="installationDate">Installation Date:</label>
            <input type="date" id="installationDate" name="installationDate" value="${sign.installationDate || ''}" required>
  
            <label for="lastInspectionDate">Last Inspection Date:</label>
            <input type="date" id="lastInspectionDate" name="lastInspectionDate" value="${sign.lastInspectionDate || ''}" required>
  
            <label for="status">Status:</label>
            <select id="status" name="status" required>
              <option value="Active" ${sign.status === 'Active' ? 'selected' : ''}>Active</option>
              <option value="Inactive" ${sign.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
            </select>
  
            <div class="modal-actions">
              <button type="submit">${sign.id ? 'Update' : 'Create'}</button>
              <button type="button" id="cancelBtn">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
  
  function openModal(signId) {
    fetch(`/api/signs/${signId}`)
      .then(response => response.json())
      .then(sign => {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = renderSignForm(sign);
        const modal = document.getElementById('editModal');
        modal.style.display = 'block';
  
        const form = document.getElementById('editForm');
        form.addEventListener('submit', event => {
          event.preventDefault();
          const formData = new FormData(form);
          const signData = Object.fromEntries(formData.entries());
  
          fetch(`/api/signs/${signId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(signData)
          })
            .then(response => response.json())
            .then(updatedSign => {
              const tableRow = document.querySelector(`#signTable tbody tr[data-id="${updatedSign.id}"]`);
              if (tableRow) {
                tableRow.innerHTML = `
                  <td>${updatedSign.location}</td>
                  <td>${updatedSign.message}</td>
                  <td>${updatedSign.installationDate}</td>
                  <td>${updatedSign.lastInspectionDate}</td>
                  <td>${updatedSign.status}</td>
                  <td>
                    <button class="edit-btn" data-sign-id="${updatedSign.id}">Edit</button>
                    <button class="delete-btn" data-sign-id="${updatedSign.id}">Delete</button>
                  </td>
                `;
              }
              closeModal();
            })
            .catch(error => {
              console.error('Error updating sign:', error);
            });
        });
  
        const cancelBtn = document.getElementById('cancelBtn');
        cancelBtn.addEventListener('click', closeModal);
      })
      .catch(error => {
        console.error('Error fetching sign data:', error);
      });
  }
  
  function closeModal() {
    const modal = document.getElementById('editModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
  
  function createNewSign() {
    const newSign = {
      location: '',
      message: '',
      installationDate: '',
      lastInspectionDate: '',
      status: 'Active'
    };
  
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = renderSignForm(newSign);
    const modal = document.getElementById('editModal');
    modal.style.display = 'block';
  
    const form = document.getElementById('editForm');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(form);
      const signData = Object.fromEntries(formData.entries());
  
      fetch('/api/signs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signData)
      })
        .then(response => response.json())
        .then(newSign => {
          const tableBody = document.querySelector('#signTable tbody');
          const newRow = document.createElement('tr');
          newRow.dataset.id = newSign.id;
          newRow.innerHTML = `
            <td>${newSign.location}</td>
            <td>${newSign.message}</td>
            <td>${newSign.installationDate}</td>
            <td>${newSign.lastInspectionDate}</td>
            <td>${newSign.status}</td>
            <td>
              <button class="edit-btn" data-sign-id="${newSign.id}">Edit</button>
              <button class="delete-btn" data-sign-id="${newSign.id}">Delete</button>
            </td>
          `;
          tableBody.appendChild(newRow);
          closeModal();
        })
        .catch(error => {
          console.error('Error creating sign:', error);
        });
    });
  
    const cancelBtn = document.getElementById('cancelBtn');
    cancelBtn.addEventListener('click', closeModal);
  }
  
  function deleteSign(signId) {
    fetch(`/api/signs/${signId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(deletedSign => {
        const tableRow = document.querySelector(`#signTable tbody tr[data-id="${deletedSign.id}"]`);
        if (tableRow) {
          tableRow.remove();
        }
      })
      .catch(error => {
        console.error('Error deleting sign:', error);
      });
  }
  
  document.addEventListener('click', event => {
    if (event.target.classList.contains('edit-btn')) {
      const signId = parseInt(event.target.dataset.signId);
      openModal(signId);
    } else if (event.target.classList.contains('delete-btn')) {
      const signId = parseInt(event.target.dataset.signId);
      deleteSign(signId);
    }
  });
  
  document.getElementById('add-sign-btn').addEventListener('click', createNewSign);