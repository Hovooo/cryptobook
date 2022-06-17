import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div class="wrapper">
      <Container>
        <Header />
        {children}
        <footer>
          <div class="footer-text">
            <p>CryptoBook</p>
          </div>
          <div class="footer-text">
            <p>2022</p>
          </div>
        </footer>
      </Container>
    </div>
  );
};

export default Layout;
