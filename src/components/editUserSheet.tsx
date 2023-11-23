import { FormEvent, useEffect, useState } from "react";
import { Button } from "../shadcn/components/ui/button"
import { Input } from "../shadcn/components/ui/input"
import { Label } from "../shadcn/components/ui/label"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../shadcn/components/ui/sheet"
import { Profile } from "../interfaces/profile";
import { supabase } from "../supabase/supabaseClient";

export function SheetDemo(props: { userId: string }) {
    const [profile, setProfile] = useState<Profile>();

    useEffect(() => {
        async function fetchProfile() {
            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', props.userId)
                .single();

            setProfile(data);
        }
        fetchProfile();
    }, []);

    const handleSaveChanges = async (e: FormEvent) => {
        e.preventDefault(); // Prevent default form submission

        if (!profile) {
            console.error("Profile data is not loaded");
            return;
        }

        const { error } = await supabase
            .from('profiles')
            .update({ username: profile.username })
            .eq('id', profile.id);

        if (error) {
            console.error('Error updating profile:', error);
            return;
        }

        console.log("Profile updated successfully");
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </SheetTrigger>
            <SheetContent>
                <form onSubmit={handleSaveChanges}>
                    <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                        <SheetDescription>
                            Make changes to your profile here. Click save when you're done.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input
                                id="username"
                                value={profile?.username || ''}
                                onChange={(e) => setProfile({ ...profile!, username: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <SheetFooter>
                        <Button type="submit">Save changes</Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}
