"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changeOwnPassword } from '@/app/actions/account';
import { toast } from 'sonner';


const ChangePassword = ({email}) => {

    const [passwordState, setPasswordState] = useState({
        "oldPassword" : "",
        "newPassword" : "",
        "confirmPassword":"" 
    });

    const handleChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setPasswordState({
            ...passwordState, [key]: value
        });
    }

    async function doPasswordChange(event) {
        event.preventDefault();

        if(passwordState?.newPassword !== passwordState?.confirmPassword){
            toast.error(`New password and confirm password do not match. Please try again.`);
            return;
        }

        try {
            await changeOwnPassword(email,passwordState?.oldPassword, passwordState?.newPassword);
            toast.success("Password changed successfully")
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    }

    return (
        <div>
<h5 className="text-lg font-semibold mb-4">
    Change password :
</h5>
<form onSubmit={doPasswordChange}>
    <div className="grid grid-cols-1 gap-5">
        <div>
            <Label className="mb-2 block">Old password :</Label>
            <Input
                type="password"
                id="oldPassword"
                name="oldPassword"
                onChange={handleChange}
                placeholder="Old password"
                required=""
            />
        </div>
        <div>
            <Label className="mb-2 block">New password :</Label>
            <Input
                type="password"
                id="newPassword"
                name="newPassword"
                onChange={handleChange}
                placeholder="New password"
                required=""
            />
        </div>
        <div>
            <Label className="mb-2 block">
                Re-type New password :
            </Label>
            <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Re-type New password"
                required=""
            />
        </div>
    </div>
    {/*end grid*/}
    <Button className="mt-5" type="submit">
        Save password
    </Button>
</form>
</div>
    );
};

export default ChangePassword;