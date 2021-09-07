import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Food } from "../types/food";

interface FoodContextData {
  foods: Food[];
  editingFood: Food;
  setEditingFood: React.Dispatch<React.SetStateAction<Food>>;
  handleAddFood: (food: Food) => Promise<void>;
  handleUpdateFood: (food: Food) => Promise<void>;
  handleDeleteFood: (id: number) => Promise<void>;
}

const FoodContext = createContext({} as FoodContextData);

export const FoodProvider: React.FC = ({ children }) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [editingFood, setEditingFood] = useState({} as Food);

  useEffect(() => {
    api.get<Food[]>("foods").then(({ data }) => {
      setFoods(data);
    });
  }, []);

  const handleAddFood = async (food: Food) => {
    try {
      api
        .post<Food>("foods", {
          ...foods,
          available: true,
        })
        .then(({ data }) => {
          setFoods([...foods, data]);
        });
    } catch {
      toast.error("Erro ao adicionar comida");
    }
  };

  const handleUpdateFood = async (food: Food) => {
    try {
      const foodUpdated = await api.put(`foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });

      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );

      setFoods(foodsUpdated);
    } catch {
      toast.error("Erro ao atualizar comida");
    }
  };

  const handleDeleteFood = async (id: number) => {
    await api.delete(`foods/${id}`);

    const foodsFiltered = foods.filter((food) => food.id !== id);

    setFoods(foodsFiltered);
  };

  return (
    <FoodContext.Provider
      value={{
        foods,
        editingFood,
        setEditingFood,
        handleAddFood,
        handleUpdateFood,
        handleDeleteFood,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = (): FoodContextData => {
  const context = useContext(FoodContext);

  return context;
};
