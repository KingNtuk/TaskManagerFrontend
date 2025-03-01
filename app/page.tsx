import Image from "next/image";

export default function Home() {
  return (
    <div className="text-center h-32">
      <a href="/login" className="text-2xl text-white hover:text-blue-400 uppercase">Click to get Started</a>
    </div>
  );
}
