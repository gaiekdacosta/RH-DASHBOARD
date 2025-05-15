import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";

const Photo = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfileImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => fileInputRef.current?.click();

    return (
        <div className="flex flex-col items-center mb-4">
            <div
                className="
                    relative 
                    w-24 
                    h-24 
                    rounded-full 
                    bg-gray-200 
                    flex 
                    items-center 
                    justify-center 
                    overflow-hidden 
                    cursor-pointer
                "
                onClick={triggerFileInput}
            >
                {profileImage ? (
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex flex-col items-center">
                        <FaCamera className="text-gray-500 text-xl" />
                        <span className="text-xs text-gray-500 mt-1">Adicionar foto</span>
                    </div>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                />
            </div>
            <span className="text-sm text-gray-500 mt-2">Clique para alterar a foto</span>
        </div>
    );
}

export default Photo;