export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-6 fixed">
      <h2 className="mb-6 text-xl font-bold">Menu</h2>
      <nav>
        <a href="/" className="block py-2 hover:text-gray-300">Products</a>
      </nav>
    </aside>
  );
}
