"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import { updateUserInfo } from '@/app/actions/account';
import { toast } from 'sonner';

const ContactInfo = ({userInfo}) => {
    const [UIfo, setUIfo] = useState({
        "phone":userInfo?.phone,
        "website":userInfo?.website
    })

    const handleChange = (event) => {
            const field = event.target.name;
            const value = event.target.value;
            setUIfo({
                ...UIfo, [field]: value
            });
        }
        /// console.log(infoState);
    
        const handleUpdate = async (event) => {
            event.preventDefault();
            try {
                await updateUserInfo(userInfo?.email,UIfo);
                toast.success("User details updated successfully");
            } catch (error) {
                toast.error(`Error: ${error.message}`);
            }
        }

    return (
        <div>
    <h5 className="text-lg font-semibold mb-4">Contact Info :</h5>
    <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 gap-5">
            <div>
                <Label className="mb-2 block">Phone No. :</Label>
                <Input
                    name="phone"
                    id="number"
                    type="number"
                    onChange={handleChange}
                    placeholder="Phone :"
                    value={UIfo.phone}
                />
            </div>
            <div>
                <Label className="mb-2 block">Website :</Label>
                <Input
                    name="website"
                    id="url"
                    type="url"
                    placeholder="Url :"
                    onChange={handleChange}
                    value={UIfo.website}
                />
            </div>
        </div>
        {/*end grid*/}
        <Button className="mt-5" type="submit">
            Add
        </Button>
    </form>
</div>
    );
};

export default ContactInfo;