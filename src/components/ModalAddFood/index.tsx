import React, { useRef } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { useFood } from "../../hooks/useFood";
import { Food } from "../../types/food";
import Input from "../Input";
import Modal from "../Modal";
import { Form } from "./styles";

type ModalAddFoodProps = {
  isOpen: boolean;
  setIsOpen(): void;
};

const ModalAddFood: React.FC<ModalAddFoodProps> = ({ isOpen, setIsOpen }) => {
  const { handleAddFood } = useFood();

  const formRef = useRef(null);

  const handleSubmit = async (data: Food) => {
    handleAddFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
