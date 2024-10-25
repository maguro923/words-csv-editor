import Header from "@/components/Header";

export default function SearchPage() {
  return (
    <div className="grid grid-cols-12 w-full">
        <Header />
        <h1 className="col-span-12 text-center">Search</h1>
        <div className="col-span-12">
            <input type="text" placeholder="Search" />
        </div>
    </div>
  );
}