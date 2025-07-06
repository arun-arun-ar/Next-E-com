import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <>
      <div>
        <h1>Welcome</h1>
        <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <ThemeToggle />
        </main>
        <Footer />
      </div>
    </>
  );
}
