import Header from "components/header/header";
import Main from "components/main/main";
import Footer from "components/footer/footer";
import "./globals.css";
import "./styles.css";

export default function Home() {
  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
