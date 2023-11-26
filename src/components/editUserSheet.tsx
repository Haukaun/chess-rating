import { useEffect, useState } from "react";
import { Button } from "../shadcn/components/ui/button"
import { Input } from "../shadcn/components/ui/input"
import { Label } from "../shadcn/components/ui/label"
import { useToast } from "../shadcn/components/ui/use-toast"

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

export function SheetDemo(props: { player: Profile, onUpdate: (updatedProfile: Profile) => void }) {

    const [profile, setProfile] = useState<Profile>();

    useEffect(() => {
        setProfile(props.player);
    }, [props.player]);

    const { toast } = useToast()

    const handleSaveChanges = async (e: any) => {
        e.preventDefault();

        if (!profile) {
            console.error("Profile data is not loaded");
            return;
        }

        const { error } = await supabase
            .from('profiles')
            .update({ username: profile.username })
            .eq('id', profile.id);

        if (error) {
            console.log(error);
            console.error('Error updating profile:', error);
            toast({
                title: "Error",
                description: "Error updating profile, please try again later",
                color: "red",
            })
            return;
        }

        if (!error) {
            const updatedProfile = { ...props.player, username: profile?.username };
            props.onUpdate(updatedProfile);

            toast({
                className: "bg-green-500 text-white",
                title: "Success",
                description: "Profile updated successfully",
                color: "green",
            });
        }
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
