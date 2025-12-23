import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">ReactHub</div>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
      </div>
    </nav>
  );
}
