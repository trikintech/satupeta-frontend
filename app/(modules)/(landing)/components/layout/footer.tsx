import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <Image src={"/logo-white.png"} alt="Logo" width={200} height={50} />
        <div className="flex flex-col gap-6.5">
          <p className="font-semibold mb-2">Discover</p>
          <ul className="flex flex-col gap-2 text-gray-400">
            <li>
              <Link href={"#"}>Katalog Mapset</Link>
            </li>
            <li>
              <Link href={"#"}>Berita dan Pengumuman</Link>
            </li>
            <li>
              <Link href={"#"}>Statistik Konten</Link>
            </li>
            <li>
              <Link href={"#"}>Daftar OPD</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-6.5">
          <p className="font-semibold mb-2">About Satu Peta</p>
          <ul className="flex flex-col gap-2 text-gray-400">
            <li>
              <Link href={"#"}>Careers</Link>
            </li>
            <li>
              <Link href={"#"}>About</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-6.5">
          <p className="font-semibold mb-2">Follow Us</p>
          <ul className="flex flex-col gap-2 text-gray-400">
            <li className="flex items-center gap-2">
              <Link href={"#"}>Linkedin</Link>
            </li>
            <li className="flex items-center gap-2">
              <Link href={"#"}>Instagram</Link>
            </li>
            <li className="flex items-center gap-2">
              <Link href={"#"}>Medium</Link>
            </li>
            <li className="flex items-center gap-2">
              <Link href={"#"}>X</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-64 my-8" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between text-gray-400 text-sm gap-4">
        <div>
          <p>0821-0920 0019</p>
          <p>xxx</p>
        </div>
        <div className="text-right">
          <p>xxx.</p>
          <p>All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
