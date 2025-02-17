import React, { useState } from "react";
import allPorts from "./data/ports.json"; // Tous les ports
import osiPorts from "./data/osiport.json"; // Ports OSI
import "./App.css"; // Styles CSS

const App = () => {
  const [activeTab, setActiveTab] = useState("all"); // "all" ou "osi"

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <button className={activeTab === "all" ? "active" : ""} onClick={() => setActiveTab("all")}>
          Tous les ports
        </button>
        <button className={activeTab === "osi" ? "active" : ""} onClick={() => setActiveTab("osi")}>
          Ports OSI
        </button>
      </nav>

      {/* Affichage des tableaux */}
      {activeTab === "all" ? <AllPortsTable /> : <OsiPortsTable />}
    </div>
  );
};

const AllPortsTable = () => {
  return (
    <div className="table-container">
      <h1 className="title">Tout les ports B1 CSI Tyron</h1>
      <table className="ports-table">
        <thead>
          <tr>
            <th>Port</th>
            <th>Protocole</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {allPorts.map((port, index) => (
            <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
              <td>{port.port}</td>
              <td>{port.protocol}</td>
              <td>{port.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const OsiPortsTable = () => {
  return (
    <div className="table-container">
      <h1 className="title">🔗 Ports Classés par Couches OSI Tyron</h1>
      {Object.entries(osiPorts).map(([layer, ports]) => (
        <div key={layer}>
          <h2 className="osi-layer">{layer.replace("_", " ")}</h2>
          <table className="ports-table">
            <thead>
              <tr>
                <th>Protocole</th>
                <th>Port(s)</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {ports.map((port, index) => (
                <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                  <td>{port.protocole}</td>
                  <td>{Array.isArray(port.ports) ? port.ports.join(", ") : port.port}</td>
                  <td>{port.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default App;
