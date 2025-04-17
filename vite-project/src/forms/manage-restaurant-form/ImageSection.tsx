import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import axios from "axios";

type Props = {
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
};

const ImageSection = ({ imagePreview, setImagePreview }: Props) => {
  const { control, setValue } = useFormContext();

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:7000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const finalImageUrl = response.data.imageUrl;
      console.log("Image uploaded:", finalImageUrl);

      setImagePreview(finalImageUrl);
      setValue("imageFile", file, { shouldValidate: true });

    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image");
    }
  };

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an image that will be displayed on your restaurant listing in the search results.
          Adding a new image will overwrite the existing one.
        </FormDescription>
      </div>

      <div className="flex flex-col gap-8 w-[50%]">
        <FormField 
          control={control} 
          name="imageFile" 
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      handleUpload(file);
                    }
                  }}
                />
              </FormControl>
              <FormMessage className="text-red-500">{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />
        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm text-gray-500">Preview:</p>
            <img src={imagePreview} alt="Preview" className="w-40 h-40 object-cover rounded-md shadow" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSection;

