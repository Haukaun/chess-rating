import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { Profile } from '../interfaces/profile';
import { SheetDemo } from '../components/editUserSheet';

function ProfilePage() {
    const [profile, setProfile] = useState<Profile>();
    const [loading, setLoading] = useState(true);

    const updateProfile = (updatedProfile: Profile) => {
        setProfile(updatedProfile);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const session = supabase.auth.getSession();

            if (session) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', (await session).data.session?.user.id)
                    .single();

                if (error) {
                    console.error('Error fetching profile:', error);
                } else {
                    setProfile(data);
                }
            }
            setLoading(false);
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <div>Loading profile...</div>;
    }

    if (!profile) {
        return <div>No profile data found</div>;
    }

    return (
        <main className="flex flex-col items-center justify-start pt-10 w-full pl-[15rem]">
            <div className='max-w-[70%] w-full flex items-center flex-col'>
                <div className='w-[10rem]'>
                    <img src="./slackavatar.webp" className='object-fill rounded-full border' alt="" />
                </div>
                <div className='pt-10 text-2xl text-center flex flex-col gap-2'>
                    <div>{profile.username}</div>
                    <div>{profile.email}</div>
                    <div>({profile.elo})</div>
                </div>
                <div className='pt-5'>
                    <SheetDemo player={profile} onUpdate={updateProfile} />
                </div>
            </div>

        </main>
    );
}

export default ProfilePage;
