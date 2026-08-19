export default function Footer() {
  return (
    <footer className="bg-[#FAF9F6] border-t border-border/60 py-4 text-center mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-gray-40 text-sm tracking-widest font-bold">
        <p className="text-gray-500 text-sm font-medium">
          &copy; {new Date().getFullYear()} The Curated Archive. Papers remain the property of their authors.
        </p>
      </div>
    </footer>
  );
}
