export default function Footer() {
  return (
    <footer className="border-t border-gray-900 bg-gray-700 py-12 text-white">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">About Hino</h3>
            <p className="text-sm leading-relaxed">
              Hino Batangas, the 14th dealership of Hino Motors Philippine and
              the first venture of LOVI Motors Corporation, is a 3S Shop
              offering quality trucks, buses, after-sales, and spare parts,
              prioritizing customer satisfaction since 2017.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <p className="text-sm leading-relaxed">
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
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="text-sm space-y-3">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center text-sm">
          <p>Hino Batangas © 2025. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
