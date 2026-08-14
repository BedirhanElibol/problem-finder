const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'src', 'components', 'landing-page.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Ensure openRoleGatewayModal and launchDedicatedRoleApp are attached to window
const modalFnCode = `
  window.openRoleGatewayModal = function() {
    const modal = document.getElementById('modal-role-gateway');
    if (modal) modal.style.display = 'flex';
  };

  window.closeRoleGatewayModal = function() {
    const modal = document.getElementById('modal-role-gateway');
    if (modal) modal.style.display = 'none';
  };
`;

html = html.replace('function openRoleGatewayModal() {', 'window.openRoleGatewayModal = function() {');
html = html.replace('function closeRoleGatewayModal() {', 'window.closeRoleGatewayModal = function() {');
html = html.replace('function launchDedicatedRoleApp(', 'window.launchDedicatedRoleApp = function(');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Attached openRoleGatewayModal & launchDedicatedRoleApp to window object globally!');
