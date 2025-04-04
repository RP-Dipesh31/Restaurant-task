// import { FormDescription, FormField, FormItem } from "@/components/ui/form";
// import { cuisineList } from "@/config/restaurant-options-config";
// import { useFormContext } from "react-hook-form"
// import CuisineCheckbox from "./CuisineCheckbox";

// const cuisinesSection = () => {
//     const { control } = useFormContext();

//     return (
//         <div className="space-y-2">
//             <div>
//                 <h2 className="text-2xl font-bold">Cuisines</h2>
//                 <FormDescription>
//                     Select the Cuisines that your restaurant serves
//                 </FormDescription>
//             </div>
//             <FormField 
//                 control={control} 
//                 name="cuisines" 
//                 render={({ field }) => {
//                     console.log("Field Value (Before Processing):", field.value);
//                     const selectedCuisines = field.value || []; // Ensure it's an array
//                     console.log("Selected Cuisines:", selectedCuisines);

//                     return (
//                         <FormItem>
//                             <div className="grid md:grid-cols-5 gap-1">
//                                 {cuisineList.map((cuisineItem) => (
//                                     <CuisineCheckbox 
//                                         key={cuisineItem} 
//                                         cuisine={cuisineItem} 
//                                         field={field} 
//                                     />
//                                 ))}
//                             </div>
//                         </FormItem>
//                     );
//                 }}
//             />
//         </div>
//     );
// };

// export default cuisinesSection;

import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-options-config";
import { useFormContext } from "react-hook-form";
import CuisineCheckbox from "./CuisineCheckbox";

const CuisinesSection = () => {
    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Cuisines</h2>
                <FormDescription>
                    Select the Cuisines that your restaurant serves.
                </FormDescription>
            </div>

            <FormField 
                control={control} 
                name="cuisines" 
                render={({ field, fieldState }) => (
                    <FormItem>
                        <div className="grid md:grid-cols-5 gap-1">
                            {cuisineList.map((cuisineItem) => (
                                <CuisineCheckbox 
                                    key={cuisineItem} 
                                    cuisine={cuisineItem} 
                                    field={field} 
                                />
                            ))}
                        </div>
                        <FormMessage className="text-red-500">{fieldState.error?.message}</FormMessage>
                    </FormItem>
                )}
            />
        </div>
    );
};

export default CuisinesSection;
