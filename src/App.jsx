import { useEffect, useState } from "react";
import Remote from "./components/Remote";
import HubManagement from "./components/HubManagement";
import { fetchDevices } from "./api/Devices";

const App = () => {
  const [devices, setDevices] = useState([]);
  const [activeDevice, setActiveDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(true);
  const [username, setUsername] = useState("");
  const [hasUsername, setHasUsername] = useState(false);
  const [savedUsername, setSavedUsername] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("username");
    if (savedName) {
      setSavedUsername(savedName);
      setUsername(savedName);
      setHasUsername(true);
    }
  }, []);

  const handleFetchDevices = async () => {
    if (!savedUsername) return;
    
    try {
      setLoading(true);
      const payload = { username: savedUsername };
      const data = await fetchDevices(payload);
      setDevices(data);
      
      if (data.length > 0 && !activeDevice) {
        setActiveDevice(data[0]);
      }
      setError("");
    } catch (err) {
      setError("Failed to fetch devices");
      console.error("Error fetching devices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchDevices();
  }, [savedUsername]);

  const handleShowForm = () => setShowForm(true);
  const handleHideForm = () => setShowForm(false);

  const handleSaveUsername = () => {
    if (!username.trim()) return;
    localStorage.setItem("username", username.trim());
    setSavedUsername(username.trim());
    setHasUsername(true);
    setIsEditingUsername(false);
    setError("");
  };

  const handleEditUsername = () => {
    setIsEditingUsername(true);
    setUsername(savedUsername);
  };

  const handleCancelEditUsername = () => {
    setIsEditingUsername(false);
    setUsername(savedUsername);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSaveUsername();
    }
    if (e.key === "Escape") {
      handleCancelEditUsername();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-light text-gray-800 tracking-tight">
            Device Control Panel
          </h1>
          
          {/* Username Display with Edit Option */}
          {hasUsername && (
            <div className="mt-3 flex items-center justify-center gap-3">
              {isEditingUsername ? (
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-md shadow-sm">
                  <input
                    className="w-48 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter username"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveUsername}
                    className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEditUsername}
                    className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-500">
                    Welcome, <span className="font-medium text-gray-700">{savedUsername}</span>
                  </p>
                  <button
                    onClick={handleEditUsername}
                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline transition duration-200"
                  >
                    Change
                  </button>
                </>
              )}
            </div>
          )}
        </header>

        {/* Error Message */}
        {hasUsername && error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600 text-center">{error}</p>
          </div>
        )}

        {!activeDevice && hasUsername && !loading && !error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-700 text-center">No active device found</p>
          </div>
        )}

        {/* Username Setup */}
        {!hasUsername && (
          <div className="bg-white shadow-sm rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">
              Get Started
            </h3>
            <p className="text-sm text-gray-500 mb-6 text-center">
              Enter a username to begin managing your devices
            </p>
            <div className="space-y-4">
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                onKeyPress={(e) => e.key === "Enter" && handleSaveUsername()}
              />
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                onClick={handleSaveUsername}
              >
                Save Username
              </button>
            </div>
          </div>
        )}

        {/* Hub Management */}
        {showForm && hasUsername && (
          <div className="mt-6 bg-white shadow-sm rounded-lg p-6">
            <HubManagement
              setDevices={setDevices}
              username={username}
              activeDevice={activeDevice}
              setActiveDevice={setActiveDevice}
            />
          </div>
        )}

        {/* Toggle Button - More Noticeable */}
        {hasUsername && (
          <div className="mt-6 text-center">
            {showForm ? (
              <button
                onClick={handleHideForm}
                className="group relative px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Hide Device Manager
                </span>
              </button>
            ) : (
              <button
                onClick={handleShowForm}
                className="group relative px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Device
                </span>
              </button>
            )}
          </div>
        )}

        {/* Active Device Info & Remote */}
        {activeDevice && (
          <div className="mt-8">
            <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      Active Device
                    </p>
                    <p className="text-lg font-medium text-gray-800">
                      {activeDevice.name}
                    </p>
                  </div>
                  <div className="hidden sm:block w-px h-10 bg-gray-200" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      IP Address
                    </p>
                    <p className="text-sm font-mono text-gray-700">
                      {activeDevice.ip}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                    Online
                  </span>
                </div>
              </div>
            </div>

            <Remote activeDevice={activeDevice} />
          </div>
        )}

        {/* Loading State */}
        {loading && hasUsername && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-3 text-sm text-gray-500">Loading devices...</p>
          </div>
        )}

        {/* No Devices */}
        {!loading && hasUsername && devices.length === 0 && !error && (
          <div className="mt-12 text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No devices available</p>
            <p className="text-sm text-gray-400 mt-2">
              Click "Add New Device" to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;