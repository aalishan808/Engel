import Link from 'next/link'; // Make sure Link is imported

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-6 fixed">
      <h2 className="mb-6 text-xl font-bold">Menu</h2>
      <nav>
        <ul>
          <li>
            {/* THIS IS THE CORRECT WAY TO CREATE A NAVIGATION LINK IN NEXT.JS */}
            <Link href="/" className="block py-2 hover:text-gray-300">
              Products
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}