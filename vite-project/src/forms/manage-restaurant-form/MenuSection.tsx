
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";
import { Button } from "@/components/ui/button";

const MenuSection = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  return (
    <div>
      {fields.map((item, index) => (
        <MenuItemInput
          key={item.id} // Ensure each child has a unique key
          index={index}
          removeMenuItem={() => remove(index)}
        />
      ))}
      <Button type="button" onClick={() => append({ name: "", price: "" })}>
        Add Menu Item
      </Button>
    </div>
  );
};

export default MenuSection;
