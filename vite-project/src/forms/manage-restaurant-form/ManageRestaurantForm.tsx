


import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "../manage-restaurant-form/DetailsSection";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import LoadingButton from "../../components/LoadingButton";
import { Restaurant } from "@/types";
import { Separator } from "@radix-ui/react-separator";
import CuisionSection from "../manage-restaurant-form/CuisinesSection";
import MenuSection from "../manage-restaurant-form/MenuSection";
import { useState } from "react";

const formSchema = z.object({
    restaurantName: z.string().min(1, "Restaurant name is required"),
    city: z.string().min(1, "City name is required"),
    country: z.string().min(1, "Country name is required"),
    deliveryPrice: z.preprocess((val) => Number(val) || 0, z.number().min(1, "Delivery price must be greater than 0")),
    estimatedDeliveryTime: z.preprocess((val) => Number(val) || 0, z.number().min(1, "Estimated delivery time must be greater than 0")),
    cuisines: z.array(z.string()).nonempty("Please select at least one cuisine"),
    menuItems: z.array(
        z.object({
            _id: z.string().optional(),
            name: z.string().min(1, "Name is required"),
            price: z.preprocess((val) => Number(val) || 0, z.number().min(1, "Price must be greater than 0"))
        })
    ).nonempty("At least one menu item is required"),
    imageUrl: z.string().optional(), // Now optional, we generate it from file selection
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (restaurantData: Omit<Restaurant, "_id">) => Promise<void>;
    isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
    const navigate = useNavigate();
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            restaurantName: "",
            city: "",
            country: "",
            deliveryPrice: 0,
            estimatedDeliveryTime: 0,
            cuisines: [],
            menuItems: [{ name: "Test Item", price: 10 }],
            imageUrl: "" // Initially empty
        },
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null); // Store preview image
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // Store selected file

    // Handle image selection
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("Selected File:", file); // Debugging
            setSelectedFile(file);
            const imageUrl = URL.createObjectURL(file);
            console.log('imageUrl', imageUrl)
            setImagePreview(imageUrl);
        }
    };

    const onSubmit = (formDataJson: RestaurantFormData) => {
        console.log("🟢 Form Submitted:", formDataJson);

        if (!selectedFile) {
            alert("Please select an image");
            return;
        }

        // Final Data (Image URL is now from the local file)
        const restaurantData: Omit<Restaurant, "_id"> = {
            restaurantName: formDataJson.restaurantName,
            city: formDataJson.city,
            country: formDataJson.country,
            deliveryPrice: formDataJson.deliveryPrice * 100,
            estimatedDeliveryTime: formDataJson.estimatedDeliveryTime,
            cuisines: formDataJson.cuisines,
            menuItems: formDataJson.menuItems.map(item => ({
                _id: item._id || crypto.randomUUID(),
                name: item.name,
                price: (item.price * 100).toString()
            })),
            imageFile: selectedFile || new File([], ""), // Include the selected file or provide a default empty file
            imageUrl: imagePreview || "", // ✅ Using the preview URL
            // user: loggedInUser?._id || "",
            lastUpdated: new Date().toISOString()
        };

        console.log("Final restaurantData before sending:", JSON.stringify(restaurantData, null, 2));
        console.log("Image File:", restaurantData.imageFile);
        onSave(restaurantData);
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
                <Button type="button" onClick={() => navigate("/mobile-nav-links")} variant="outline"
                    className="mb-4 bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-md transition-all">
                    ← Back
                </Button>

                <DetailsSection />
                <Separator />
                <CuisionSection />
                <Separator />
                <MenuSection />
                <Separator />

                {/* ✅ Image Selection Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Select Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-2 border p-2 rounded w-full"
                    />
                    {imagePreview && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-500">Preview:</p>
                            <img src={imagePreview} alt="Preview" className="w-40 h-40 object-cover rounded-md shadow" />
                        </div>
                    )}
                </div>

                <Separator />

                <LoadingButton type="submit" disabled={isLoading}
                    className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md transition-all disabled:bg-blue-400">
                    {isLoading ? "Saving..." : "Save Restaurant"}
                </LoadingButton>

                <Button type="button" onClick={() => form.reset()} variant="outline"
                    className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md transition-all">
                    Reset
                </Button>
            </form>
        </FormProvider>
    );
};

export default ManageRestaurantForm;



