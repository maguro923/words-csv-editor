import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-cols-12 w-full">
      <Header />
      <h1 className="col-span-12 text-center">Hello, world!</h1>
      <div className="col-span-12">
        <Link href="/search" className="btn btn-primary">
          About
        </Link>
      </div>
    </div>
  );
}
