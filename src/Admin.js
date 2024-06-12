import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/admin.css";
const Admin = () => {
  return (
    <div className="admin-dashboard container-fluid">
      <div className="header d-flex justify-content-between align-items-center py-3">
        <h1>Admin Dashboard</h1>
        <div className="d-flex">
          <button className="btn btn-outline-primary me-2">Cartings</button>
          <button className="btn btn-outline-primary me-2">Prefersions</button>
          <button className="btn btn-primary">Admin</button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-header">Graphs</div>
            <div className="card-body">
              <div className="graph-placeholder">Graph Placeholder</div>
            </div>
            <div className="card-footer">
              <button className="btn btn-outline-primary">Add product</button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-header">Graphics</div>
            <div className="card-body">
              <div className="graph-placeholder">Graph Placeholder</div>
            </div>
            <div className="card-footer">
              <button className="btn btn-outline-primary">Add product</button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-header">Products</div>
            <div className="card-body">
              <div className="graph-placeholder">Graph Placeholder</div>
            </div>
            <div className="card-footer">
              <button className="btn btn-outline-primary">Add product</button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-header">Uses</div>
            <div className="card-body">
              <div className="graph-placeholder">Graph Placeholder</div>
            </div>
            <div className="card-footer">
              <button className="btn btn-outline-primary">Add product</button>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-header">Users</div>
            <div className="card-body">
              <div className="settings-placeholder">Settings Placeholder</div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-header">Admin</div>
            <div className="card-body">
              <div className="settings-placeholder">Settings Placeholder</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
