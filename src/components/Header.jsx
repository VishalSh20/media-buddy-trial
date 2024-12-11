import PropTypes from "prop-types";

Header.propTypes = {
  selectedTab:PropTypes.string.isRequired,
  setSelectedTab:PropTypes.func.isRequired,
  allTabs:PropTypes.array.isRequired
};


function Header({ selectedTab, setSelectedTab, allTabs }) {
    return (
      <header className="w-full flex justify-between items-center min-h-20 p-4 bg-gradient-to-r from-purple-700 via-purple-800 to-violet-900 shadow-lg">
        {/* Title */}
        <h2 className="text-2xl font-bold text-white tracking-wide">
          Media-Buddy
        </h2>
  
        {/* Tabs */}
        <nav className="flex gap-6">
          {allTabs.map((tab, index) => (
            <div
              key={index}
              className={`cursor-pointer font-semibold px-4 py-2 text-lg rounded-lg text-gray-300 hover:text-white transition-all duration-300 ${
                tab === selectedTab
                  ? "text-white bg-purple-600 shadow-[0_0_10px_2px] shadow-purple-500"
                  : "hover:bg-purple-500/50"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </div>
          ))}
        </nav>
      </header>
    );
  }
  
  export default Header;
  