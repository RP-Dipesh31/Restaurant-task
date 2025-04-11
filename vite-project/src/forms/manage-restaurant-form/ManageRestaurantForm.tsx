
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "../manage-restaurant-form/DetailsSection";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import LoadingButton from "../../components/LoadingButton";
import { Separator } from "@radix-ui/react-separator";
import CuisionSection from "../manage-restaurant-form/CuisinesSection";
import MenuSection from "../manage-restaurant-form/MenuSection";
import { useState } from "react";
import axios from "axios";

const formSchema = z.object({
  restaurantName: z.string().min(1, "Restaurant name is required"),
  city: z.string().min(1, "City name is required"),
  country: z.string().min(1, "Country name is required"),
  deliveryPrice: z.preprocess(
    (val) => Number(val) || 0,
    z.number().min(1, "Delivery price must be greater than 0")
  ),
  estimatedDeliveryTime: z.preprocess(
    (val) => Number(val) || 0,
    z.number().min(1, "Estimated delivery time must be greater than 0")
  ),
  cuisines: z.array(z.string()).nonempty("Please select at least one cuisine"),
  menuItems: z
    .array(
      z.object({
        _id: z.string().optional(),
        name: z.string().min(1, "Name is required"),
        price: z.preprocess(
          (val) => Number(val) || 0,
          z.number().min(1, "Price must be greater than 0")
        ),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        category: z.string().optional(),
        isVegetarian: z.boolean().optional(),
        isGlutenFree: z.boolean().optional(),
      })
    )
    .nonempty("At least one menu item is required"),
  imageFile: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Image file is required"),
});

export type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (data: Omit<RestaurantFormData, "imageFile"> & { imageFile: File }) => Promise<void>;
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
    },
  });

  // We store the final image URL from backend (not a temporary blob)
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // When image is chosen, upload it immediately and use the returned URL for preview.
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        // Field name "image" must match what your upload route expects
        formData.append("image", file);
        const response = await axios.post("http://localhost:7000/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const finalImageUrl = response.data.imageUrl; // Expecting full URL: http://localhost:7000/uploads/...
        console.log("Final image URL from backend:", finalImageUrl);
        setImagePreview(finalImageUrl);
        // Save the file in the form state (backend will use it if needed)
        form.setValue("imageFile", file, { shouldValidate: true });
      } catch (err) {
        console.error("Error uploading image:", err);
        alert("Failed to upload image");
      }
    }
  };

  const onSubmit = (formData: RestaurantFormData) => {
    // In our submission, we do NOT set imageUrl from the preview because the backend will generate it.
    // However, to verify, we pass the final image URL (from imagePreview) along.
    const restaurantData: Omit<RestaurantFormData, "imageFile"> & { imageFile: File } = {
      ...formData,
      deliveryPrice: formData.deliveryPrice * 100,
      estimatedDeliveryTime: formData.estimatedDeliveryTime,
      menuItems: [
        {
          ...formData.menuItems[0],
          price: formData.menuItems[0].price * 100,
          _id: formData.menuItems[0]._id || crypto.randomUUID(),
          description: formData.menuItems[0].description || "",
          imageUrl: formData.menuItems[0].imageUrl || "",
          category:
            (formData.menuItems[0].category as "Appetizers" | "Main Course" | "Desserts" | "Beverages") ||
            "Appetizers",
          isVegetarian: formData.menuItems[0].isVegetarian || false,
          isGlutenFree: formData.menuItems[0].isGlutenFree || false,
        },
        ...formData.menuItems.slice(1).map((item) => ({
          ...item,
          price: item.price * 100,
          _id: item._id || crypto.randomUUID(),
          description: item.description || "",
          imageUrl: item.imageUrl || "",
          category:
            (item.category as "Appetizers" | "Main Course" | "Desserts" | "Beverages") ||
            "Appetizers",
          isVegetarian: item.isVegetarian || false,
          isGlutenFree: item.isGlutenFree || false,
        })),
      ],
    
      imageFile: formData.imageFile,
    };
    console.log("Final restaurantData:", restaurantData);
    onSave(restaurantData);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
        <Button
          type="button"
          onClick={() => navigate("/mobile-nav-links")}
          variant="outline"
          className="mb-4 bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-md transition-all"
        >
          ← Back
        </Button>

        <DetailsSection />
        <Separator />
        <CuisionSection />
        <Separator />
        <MenuSection />
        <Separator />

        {/* Image Upload Section */}
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

        <LoadingButton
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md transition-all disabled:bg-blue-400"
        >
          {isLoading ? "Saving..." : "Save Restaurant"}
        </LoadingButton>

        <Button
          type="button"
          onClick={() => form.reset()}
          variant="outline"
          className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md transition-all"
        >
          Reset
        </Button>
      </form>
    </FormProvider>
  );
};

export default ManageRestaurantForm;

