import React from "react";
import { FiPlusSquare } from "react-icons/fi";
import { Container } from "./styles";
import Logo from "../../assets/logo.svg";

type HeaderProps = {
  onOpenModal: React.MouseEventHandler<HTMLButtonElement>;
};

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  return (
    <Container>
      <header>
        <img src={Logo} alt="GoRestaurant" />
        <nav>
          <div>
            <button type="button" onClick={onOpenModal}>
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
