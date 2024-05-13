import { useState } from "react";
import "./App.css";
import Data from "./data.json";
import ReactPaginate from "react-paginate";

function App() {
  const [user, setUser] = useState(Data);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(5);

  const indexOfLastPage = currentPage * itemPerPage;
  const indexOfFirstPage = indexOfLastPage - itemPerPage;
  const page = Data.slice(indexOfFirstPage, indexOfLastPage);

  const paginate = (pageNum) => {
    setCurrentPage(pageNum);
  };
  return (
    <>
      <div className="app">
        {page?.map((user) => {
          return (
            <div key={user.id}>
              <div className="user">
                <h3>{user.first_name}</h3>
                <p>{user.last_name}</p>
                <span>{user.email}</span>
              </div>
            </div>
          );
        })}
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {page?.length > itemPerPage && (
          <div>
            {Array.from(
              { length: Math.ceil(page.length / itemPerPage) },
              (_, i) => (
                <button key={i} onClick={() => paginate(i + 1)}>
                  {i + 1}
                </button>
              )
            )}
          </div>
        )}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastPage >= page.length}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;
