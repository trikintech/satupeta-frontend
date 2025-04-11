import Image from "next/image";

export default function LogoImage() {
  return (
    <div className="w-[120px] h-[24px] relative">
      <Image
        src="/logo.svg"
        alt="Logo"
        fill
        className="dark:invert object-contain"
        priority
      />
    </div>
  );
}
