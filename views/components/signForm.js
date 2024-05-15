export function renderSignForm(sign) {
  return `
    <dialog id="editModal" class="modal">
      <div class="modal-content">
        <h2>Edit No Entry Sign</h2>
        <form id="editForm">
          <input type="hidden" name="id" value="${sign.id}">
          <label for="location">Location:</label>
          <input type="text" id="location" name="location" value="${sign.location}" required>

          <label for="message">Message:</label>
          <input type="text" id="message" name="message" value="${sign.message}" required>

          <label for="installationDate">Installation Date:</label>
          <input type="date" id="installationDate" name="installationDate" value="${sign.installationDate}" required>

          <label for="lastInspectionDate">Last Inspection Date:</label>
          <input type="date" id="lastInspectionDate" name="lastInspectionDate" value="${sign.lastInspectionDate}" required>

          <label for="status">Status:</label>
          <select id="status" name="status" required>
            <option value="Active" ${sign.status === 'Active' ? 'selected' : ''}>Active</option>
            <option value="Inactive" ${sign.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
          </select>

          <div class="modal-actions">
            <button type="submit">Update</button>
            <button type="button" id="cancelBtn">Cancel</button>
          </div>
        </form>
      </div>
    </dialog>
  `;
}