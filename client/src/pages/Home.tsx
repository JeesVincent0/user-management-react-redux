import { useEffect, useState } from "react";
import { type AppDispatch, type RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/middleware/updateUserThunk";
import { logoutUser } from "../redux/middleware/logoutUserThunk";
import { getUserData } from "../redux/middleware/getUserThunk";
import { toast } from "react-toastify";
import { setisEditing } from "../redux/slice/userSlice/userSlice";

const Home = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { user, isEditing } = useSelector((state: RootState) => state.user);
  const [imagePreview, setImagePreview] = useState<string | null>(user?.image || null);
  const [formData, setFormData] = useState({
    image: null as File | null,
    name: '',
    email: '',
    houseName: '',
    area: '',
    city: '',
    pin: '',
    phone: ''
  });

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));


      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    dispatch(setisEditing(true));
  };

  function isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const handleSave = () => {
    const { name, email, houseName, area, city, pin, phone } = formData;

    if (!isValidEmail(email)) {
      toast.dismiss();
      toast.error('Enter valid email', { autoClose: 2000 });
      return;
    }

    if (!name || !email || !houseName || !area || !city || !pin || !phone) {
      toast.dismiss();
      toast.error("Please fill all fields before saving!");
      return;
    }
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("email", formData.email);
    fd.append("houseName", formData.houseName);
    fd.append("area", formData.area);
    fd.append("city", formData.city);
    fd.append("pin", formData.pin);
    fd.append("phone", formData.phone);
    if (formData.image) {
      fd.append("image", formData.image);
    }

    dispatch(updateUserProfile(fd));
    dispatch(setisEditing(false));
  };

  const handleCancel = () => {
    setFormData({
      image: null,
      name: user?.name || '',
      email: user?.email || '',
      houseName: user?.address?.houseName || '',
      area: user?.address?.area || '',
      city: user?.address?.city || '',
      pin: user?.address?.pin || '',
      phone: user?.address?.phone || ''
    });
    setImagePreview(user?.image || null);
    dispatch(setisEditing(false));
  };

  useEffect(() => {
    dispatch(getUserData());
    dispatch(setisEditing(false));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        image: null,
        name: user.name,
        email: user.email,
        houseName: user.address?.houseName || '',
        area: user.address?.area || '',
        city: user.address?.city || '',
        pin: user.address?.pin || '',
        phone: user.address?.phone || ''
      });
      setImagePreview(user.image || null);
    }
  }, [user])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">My Profile</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="px-6 py-6">
            <form className="space-y-6">
              {/* Profile Image */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={
                          imagePreview?.startsWith("data:")
                            ? imagePreview
                            : imagePreview
                              ? `http://localhost:3000${imagePreview}`
                              : ""
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />

                    ) : (
                      <span className="text-gray-400 text-sm">Non Image</span>
                    )}
                  </div>
                </div>
                {isEditing && (
                  <div className="mt-2">
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <span className="cursor-pointer inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Upload Image
                      </span>
                    </label>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">House Name</label>
                  <input
                    type="text"
                    name="houseName"
                    value={formData.houseName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                  <input
                    type="text"
                    name="pin"
                    value={formData.pin}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;