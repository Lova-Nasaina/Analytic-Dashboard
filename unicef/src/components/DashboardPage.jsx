import React from 'react';
import { Link } from 'react-router-dom';

function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <h3>Admin Dashboard</h3>
      <ul>
        <li><Link to="/admin-dashboard">Tableau de bord</Link></li>
        <li><Link to="/admin-users">Utilisateurs</Link></li>
        <li><Link to="/admin-settings">Paramètres</Link></li>
        <li><Link to="/logout">Déconnexion</Link></li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
