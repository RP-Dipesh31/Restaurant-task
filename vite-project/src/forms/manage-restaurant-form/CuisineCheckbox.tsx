import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field?: ControllerRenderProps<FieldValues, "cuisines">;
};

const CuisineCheckbox = ({ cuisine, field }: Props) => {
  if (!field) {
    console.error("Field is undefined:", field);
    return null;
  }

  const currentValue: string[] = Array.isArray(field.value) ? field.value : [];
  const isChecked = currentValue.includes(cuisine);

  return (
    <FormItem className="flex flex-row items-center space-x-2 mt-2">
      <FormControl>
        <Checkbox.Root
          className="w-5 h-5 border border-gray-400 rounded flex items-center justify-center bg-white data-[state=checked]:bg-blue-500"
          checked={isChecked}
          onCheckedChange={(checked) => {
            const isCheckedBoolean = checked === true;
            console.log(`Checkbox for ${cuisine} is ${isCheckedBoolean ? "checked" : "unchecked"}`);

            if (isCheckedBoolean) {
              field.onChange([...currentValue, cuisine]);
            } else {
              field.onChange(currentValue.filter((value) => value !== cuisine));
            }
          }}
        >
          <Checkbox.Indicator>
            <CheckIcon className="w-4 h-4 text-white" />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
};

export default CuisineCheckbox;
