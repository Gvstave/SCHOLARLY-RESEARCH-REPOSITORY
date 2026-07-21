export default function Footer() {
  return (
    <footer className="bg-[#FAF9F6] border-t border-border/60 py-4 text-center mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-gray-400 text-[10px] tracking-widest uppercase font-bold">
        <p className="text-gray-500 text-[10px] font-medium">
          &copy; {new Date().getFullYear()} The Curated Archive. Papers remain the property of their authors.
        </p>
      </div>
    </footer>
  );
}
