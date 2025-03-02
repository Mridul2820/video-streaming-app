import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { addProfile } from "@/redux/slices/additionalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "@/redux/store";

export function AddProfile() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { profiles } = useSelector((state: RootState) => state.additional);
  console.log(profiles);
  const handleSubmit = () => {
    dispatch(addProfile({ name, imageUrl }));
    setName("");
    setImageUrl("");
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <div className="flex flex-col justify-center items-center gap-2">
          <Button className="bg-gray-600 rounded-full w-16 h-16 text-4xl">
            +
          </Button>
          <div className="text-gray-500">Add Profile</div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Your Profile</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
