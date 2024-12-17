import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchPage = ({ setFilteredData }) => {
  const [phone, setPhone] = useState("");
  const [cli, setCli] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredDataState] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const fetchApiData = async () => {
    if (!phone && !cli && !startDate && !endDate) {
      alert("Please fill at least one filter field before searching.");
      return;
    }

    const apiEndpoint =
      "https://thingproxy.freeboard.io/fetch/https://api.voiptella.com/ringless-data";
    const requestData = {
      phone,
      cli,
      start_date: startDate
        ? startDate.toISOString().slice(0, 19).replace("T", " ")
        : "",
      end_date: endDate
        ? endDate.toISOString().slice(0, 19).replace("T", " ")
        : "",
      api_key: "bc6c",
      lower_limit: 0,
      upper_limit: 500,
    };

    try {
      const response = await axios.post(apiEndpoint, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);

      const filtered = response.data.data.filter((item) => {
        const isPhoneMatch = phone ? item.phone.includes(phone) : true;
        const isCliMatch = cli ? item.cli.includes(cli) : true;
        const isStartDateMatch = startDate
          ? new Date(item.start_date).setHours(0, 0, 0, 0) >=
            startDate.setHours(0, 0, 0, 0)
          : true;
        const isEndDateMatch = endDate
          ? new Date(item.end_date).setHours(0, 0, 0, 0) <=
            endDate.setHours(0, 0, 0, 0)
          : true;

        return isPhoneMatch && isCliMatch && isStartDateMatch && isEndDateMatch;
      });

      setFilteredData(filtered);
      setFilteredDataState(filtered);
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const date = new Date(dateString);
    return date.toLocaleString("en-US", options);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 w-80 lg:w-screen max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center">
        Search Page
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone:
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            CLI:
          </label>
          <input
            type="text"
            value={cli}
            onChange={(e) => setCli(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Start Date:
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            End Date:
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>

      <button
        onClick={fetchApiData}
        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold"
      >
        Search
      </button>

      <div className="mt-6 space-y-4">
        {filteredData.length > 0 ? (
          currentItems.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <div className="text-lg font-semibold text-gray-800">
                {item.phone} - {item.cli}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Start Date:</strong> {formatDate(item.start_date)}
              </div>
              <div className="text-sm text-gray-600">
                <strong>End Date:</strong> {formatDate(item.end_date)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            No matching results found
          </div>
        )}
      </div>

      <div className="flex justify-center mt-6 overflow-x-auto px-4">
        {filteredData.length > 0 && (
          <div className="flex items-center space-x-2 flex-nowrap min-w-full">
            {Array.from({
              length: Math.ceil(filteredData.length / itemsPerPage),
            }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded-lg text-white font-semibold ${
                  currentPage === index + 1
                    ? "bg-blue-500"
                    : "bg-gray-300 hover:bg-blue-400"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
