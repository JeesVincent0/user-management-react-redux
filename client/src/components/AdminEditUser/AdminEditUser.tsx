import { useEffect, useState } from 'react';
import { Save, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';
import { updateUserAdmin } from '../../redux/middleware/updateUserAdmin';
import { toast } from 'react-toastify';
import { setEditPop } from '../../redux/slice/adminSlice/adminSlice';

const EditUserForm = () => {

    // Sample user data - you can pass this as props

    const navigate = useNavigate();
    const { id } = useParams<{ id: String }>();
    const { users, editPop } = useSelector((state: RootState) => state.admin);
    const user = users.filter((user) => user._id === id)[0];
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState({
        id,
        name: user.name,
        email: user.email,
        housename: user.address.houseName,
        area: user.address.area,
        city: user.address.city,
        pin: user.address.pin,
        phone: user.address.phone,

    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!isValidEmail(formData.email)) {
            toast.dismiss();
            toast.error('Enter valid email', { autoClose: 2000 });
            return;
        } else {
            dispatch(updateUserAdmin(formData))
        }
    };

    // Handle cancel
    const handleCancel = () => {
        dispatch(setEditPop());
        navigate('/dashboard')
    };

    function isValidEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    useEffect(() => {
        if (!editPop) navigate('/dashboard')
    }, [editPop, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    Edit User
                </h2>

                <div className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                            placeholder="Enter user name"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                            placeholder="Enter email address"
                        />
                    </div>

                    {/* House name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            House Name
                        </label>
                        <input
                            type="text"
                            id="housename"
                            name="housename"
                            value={formData.housename}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                            placeholder="Enter house name"
                        />
                    </div>

                    {/* area Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Area
                        </label>
                        <input
                            type="text"
                            id="area"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                            placeholder="Enter area"
                        />
                    </div>

                    {/* City Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            City
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                            placeholder="Enter city"
                        />
                    </div>

                    {/* pin Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Pin
                        </label>
                        <input
                            type="text"
                            id="pin"
                            name="pin"
                            value={formData.pin}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                            placeholder="Enter pin"
                        />
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                            placeholder="Enter phone number"
                        />
                    </div>



                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            Save
                            <Save className="h-4 w-4" />
                        </button>

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                            <X className="h-4 w-4" />
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUserForm;