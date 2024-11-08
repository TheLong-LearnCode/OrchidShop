import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from './ThemeContext';
import { getAuth, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';

export default function Profile() {
    const { theme } = useContext(ThemeContext)
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('information');
    const [newDisplayName, setNewDisplayName] = useState(user?.displayName || '');

    const handleUpdateProfile = async () => {
        try {
            const auth = getAuth();
            await updateProfile(auth.currentUser, {
                displayName: newDisplayName
            });
            window.location.reload();
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error('Failed to update profile');
        }
    };

    return (
        <div style={{paddingTop:'70px', width:'100%', minHeight: '100vh'}}>
        <div className="container py-5">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4" style={{ color: theme.color }}>Your Profile</h2>
                    <div className="card shadow" >
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3 border-end">
                                    <div className="d-flex flex-column">
                                        <button
                                            className={`btn ${activeTab === 'information' ? 'btn-dark' : 'btn-outline-dark'} mb-3`}
                                            onClick={() => setActiveTab('information')}
                                        >
                                            Information
                                        </button>
                                        <button
                                            className={`btn ${activeTab === 'update' ? 'btn-dark' : 'btn-outline-dark'}`}
                                            onClick={() => setActiveTab('update')}
                                        >
                                            Update Profile
                                        </button>
                                    </div>
                                </div>

                                {/* Right Column - Content */}
                                <div className="col-md-9">
                                    {activeTab === 'information' ? (
                                        <div className="d-flex flex-column align-items-center">
                                            <div className="mb-4">
                                                <img
                                                    src={user?.photoURL || 'https://static-00.iconduck.com/assets.00/user-icon-2046x2048-9pwm22pp.png'}
                                                    alt="avatar"
                                                    className="rounded-circle"
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <div className="w-100">
                                                <div className="mb-3">
                                                    <p className="h5"><strong className="text-muted mb-1">Name: </strong>{user?.displayName || 'Not set'}</p>
                                                </div>

                                                <div className="mb-3">
                                                    <p className="h5"><strong className="text-muted mb-1">Email: </strong>{user?.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-3 d-flex flex-column align-items-center">
                                            <h4 className="mb-4">Update Your Name</h4>
                                            <div className="mb-3 ">
                                                <input
                                                    style={{width: '100%'}}
                                                    type="text"
                                                    className="form-control"
                                                    value={newDisplayName}
                                                    onChange={(e) => setNewDisplayName(e.target.value)}
                                                    placeholder="Enter your new name"
                                                />
                                            </div>
                                            <button
                                                className="btn btn-dark"
                                                onClick={handleUpdateProfile}
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
