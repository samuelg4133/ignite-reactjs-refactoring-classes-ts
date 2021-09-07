import React, { useState } from "react";
import Food from "../../components/Food";
import Header from "../../components/Header";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
import { useFood } from "../../hooks/useFood";

import { Food as IFood } from "../../types/food";

import { FoodsContainer } from "./styles";

const Dashboard: React.FC = () => {
  const { setEditingFood, foods } = useFood();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    console.log(modalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleEditFood = (food: IFood) => {
    setEditingFood(food);
    setEditModalOpen(true);
  };

  return (
    <>
      <Header onOpenModal={toggleModal} />
      <ModalAddFood isOpen={modalOpen} setIsOpen={toggleModal} />
      <ModalEditFood isOpen={editModalOpen} setIsOpen={toggleEditModal} />
      <FoodsContainer data-testid="foods-list">
        {foods.map((food) => (
          <Food key={food.id} food={food} handleEditFood={handleEditFood} />
        ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
