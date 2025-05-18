export default function Footer() {
  return (
    <footer className="border-t border-gray-900 bg-gray-700 py-6 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About Hino</h3>
            <p className="text-sm">
              Hino Motors Philippines Corporation is the exclusive distributor of Hino trucks and buses in the
              Philippines.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-sm">
              Phone: (02) 8-XXX-XXXX
              <br />
              Email: info@hinophilippines.com
              <br />
              Address: Hino Motors Philippines Corporation
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li>Home</li>
              <li>Products</li>
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Hino Motors Philippines Corporation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

