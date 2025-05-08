import Image from "next/image";

export default function LogoImage() {
  return (
    <div className="w-[128px] h-[28px] relative">
      <Image
        src="/logo.png"
        alt="Logo"
        fill
        className="dark:invert object-contain"
        priority
      />
    </div>
  );
}
