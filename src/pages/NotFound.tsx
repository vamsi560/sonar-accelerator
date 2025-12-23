import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4 text-red-600">404</h1>
      <p className="text-lg text-gray-600 mb-4">Page Not Found</p>
      <Link to="/" className="text-blue-600 hover:underline">Go Home</Link>
    </div>
  );
}
