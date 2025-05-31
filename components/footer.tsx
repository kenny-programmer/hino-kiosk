export default function Footer() {
  return (
    <footer className="border-t border-gray-900 bg-gray-700 py-6 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About Hino</h3>
            <p className="text-sm">
              Hino Motors Philippines Corporation is the exclusive distributor
              of Hino trucks and buses in the Philippines.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-sm">
              Trunkline: (043) 724 5287
              <br />
              Sales: 0917 317 7235
              <br />
              Service & Parts : 0917 702 1497
              <br />
              CRD & Insurance : 0995 529 8490
              <br />
              <br />
              Address: Hino Batangas Sitio 6, Diversion Road Balagtas, Batangas
              City Philippines
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>Hino Batangas © 2025. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
