import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"; // Ensure this is a named import
import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Details</h2>
                <FormDescription>
                    Enter the details about your Restaurant
                </FormDescription>
            </div>
            <FormField
                control={control}
                name="restaurantName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage className="text-red-500"/>
                    </FormItem>
                )}
            />
            <div className="flex gap-4">
                <FormField
                    control={control}
                    name="city"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage className="text-red-500"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="country"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage className="text-red-500"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="deliveryPrice"
                    render={({ field }) => (
                        <FormItem className="max-w-[25%]">
                            <FormLabel>Estimated Delivery Price ($)</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} className="bg-white" placeholder="1.50" />
                            </FormControl>
                            <FormMessage className="text-red-500"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="estimatedDeliveryTime"
                    render={({ field }) => (
                        <FormItem className="max-w-[25%]">
                            <FormLabel>Estimated Delivery Time (minutes)</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} className="bg-white" placeholder="30" />
                            </FormControl>
                            <FormMessage className="text-red-500"/>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};

export default DetailsSection;
