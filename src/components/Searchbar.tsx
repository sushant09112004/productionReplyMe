import { useState, useEffect, ChangeEvent } from 'react';
import { IoMenuOutline } from 'react-icons/io5';  // Importing IoMenuOutline for the menu button
import { RxCross2 } from 'react-icons/rx';  // Importing RxCross2 for the close button

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [usernames, setUsernames] = useState<string[]>([]);
  const [filteredUsernames, setFilteredUsernames] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);  // State to handle sidebar visibility

  // Fetch all usernames from the backend
  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();

        if (data.success) {
          setUsernames(data.users || []); // Ensure the users array is available
          setFilteredUsernames(data.users || []); // Initially show all usernames
        } else {
          console.error('Error fetching usernames:', data.message);
        }
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };

    fetchUsernames();
  }, []);

  // Filter the usernames based on the search query
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = usernames.filter((username) =>
      username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsernames(filtered);
  };

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Navigate to the user's page using window.location
  const handleUsernameClick = (username: string) => {
    window.location.href = `/u/${username}`;  // Redirects to the user profile page
  };

  return (
    <div>
      {/* Menu Button for opening sidebar */}
      <div
        onClick={toggleSidebar}
        className="mb-4 p-2 cursor-pointer bg-blue-500 text-white text-xl rounded"
      >
        <button>U may know?</button>
      </div>

      {/* Sidebar with search input */}
      {isSidebarOpen && (
        <div className="sidebar bg-black text-white fixed top-0 left-0 w-64 h-full p-4 z-50">
          {/* Close button */}
          <div
            onClick={toggleSidebar}
            className="text-white mb-4 cursor-pointer text-2xl"
          >
            <RxCross2 />
          </div>
          
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search for a user..."
            className="p-2 border border-gray-300 rounded w-full bg-gray-800 text-white"
          />
          <ul className="mt-4">
            {filteredUsernames.length > 0 ? (
              filteredUsernames.map((username, index) => (
                <li
                  key={index}
                  className="py-1 cursor-pointer hover:text-blue-500"
                  onClick={() => handleUsernameClick(username)}  // Trigger redirection on click
                >
                  {username}
                </li>
              ))
            ) : (
              <li>No users found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
