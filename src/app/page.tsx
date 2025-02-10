import HomeView from "@/views/homeview";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[1px_1fr_1px] items-center justify-items-center p-8 pb-20 gap-5 sm:p-5 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
      <HomeView />
        <div className="flex gap-4 items-center flex-col sm:flex-row"></div>
      </main>
    
    </div>
  );
}
