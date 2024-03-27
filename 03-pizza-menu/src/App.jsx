import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

export default App;

const Header = () => {
  return (
    <>
      <header className="header">
        <h1>Fast React Pizza Co.</h1>
      </header>
    </>
  );
};

const Menu = () => {
  const pizzaList = pizzaData;
  // const pizzaList = [];
  const numpizza = pizzaList.length;
  return (
    <main className="menu">
      <h2>Our menu</h2>
      <p>
        Authentic Italian cuisine. 6 creative dishes to choose from. All from
        our stone oven, all organic, all delicious.
      </p>

      {numpizza > 0 ? (
        <>
          <ul className="pizzas">
            {pizzaList.map((pizza) => (
              <Pizza data={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu. Please come back later :)</p>
      )}
    </main>
  );
};

const Footer = () => {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);
  // if(!isOpen) return "CLOSED"
  return (
    <footer className="footer">
      {isOpen ? (
        <Order openHour={openHour} closeHour={closeHour} />
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  );
};

const Pizza = ({ data }) => {
  console.log(data);

  // if (data.soldOut) return "hi this has been sold";
  return (
    <li className={`pizza ${data.soldOut ? "sold-out" : ""}`}>
      <img src={data?.photoName} alt="pizza" />
      <div>
        <h3>{data.name}</h3>
        <p>{data.ingredients}</p>
      
        <span>{data.soldOut ? "Sold Out" : data.price}</span>
      </div>
    </li>
  );
};

const Order = ({ openHour, closeHour }) => {
  return (
    <div className="order">
      <p>
        {" "}
        We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
        online.
      </p>
      <button className="btn">Order Now</button>
    </div>
  );
};
