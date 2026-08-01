import "./HubManagement.css";
export default function HubManagement() {
  return (
    <div className="container">
      <div className="card">
        <h2>Register a New TV Room Configuration</h2>

        <input
          type="text"
          placeholder="Room Label (e.g. Bed Room 2)"
        />

        <input
          type="text"
          placeholder="Television IP Address (e.g. 192.168.8.110)"
        />

        <button className="save-btn">
          Save TV Room Parameters
        </button>
      </div>

      <div className="card menu-card">
        <h3>Hide Hub Management Settings</h3>
      </div>

      <div className="card menu-card">
        <h3>⚙ Add / Manage Household TV Database</h3>
      </div>
    </div>

  );
}