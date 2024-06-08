"use client";
import React, { useState, ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { CalendarForm } from "@/components/CalendarForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/Dialog";
import { Checkbox } from "@/components/CheckBox";
import { Toaster, toast } from "sonner";
import { db } from "@/firebase.config";
import { collection, getDocs, setDoc, doc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SignupFormDemo() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    name: "",
    dob: "",
    address: "",
    phone: "",
    healthStatus: "",
    maritalStatus: "",
    presentOccupation: "",
    guardianName: "",
    batch: "",
    education: {
      courseTitle: "",
      instituteName: "",
      percentage: "",
      yearOfPassing: "",
    },
    timestamp: Timestamp.now().toString(),
  });

  const [errors, setErrors] = useState<{
    age: string;
    gender: string;
    dob: string;
    address: string;
    phoneNo: string;
    fullname: string;
    healthStatus: string;
    maritalStatus: string;
    presentOccupation: string;
    guardianName: string;
    batch: string;
    courseTitle: string;
    instituteName: string;
    percentage: string;
    yearOfPassing: string;
  }>({
    age: "",
    gender: "",
    fullname: "",
    dob: "",
    address: "",
    phoneNo: "",
    healthStatus: "",
    maritalStatus: "",
    presentOccupation: "",
    guardianName: "",
    batch: "",
    courseTitle: "",
    instituteName: "",
    percentage: "",
    yearOfPassing: "",
  });

  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleCheckboxChange = () => {
    setIsTermsAccepted(!isTermsAccepted);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "phoneNo") {
      setFormData((prevData) => ({
        ...prevData,
        [id]: "+91" + value,
      }));
    }
    if (id.includes(".")) {
      const [parent, child] = id.split(".");
      if (parent === "education") {
        setFormData((prevState) => ({
          ...prevState,
          education: {
            ...prevState.education,
            [child]: value,
          },
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({
      age: "",
      gender: "",
      fullname: "",
      dob: "",
      address: "",
      phoneNo: "",
      healthStatus: "",
      maritalStatus: "",
      presentOccupation: "",
      guardianName: "",
      batch: "",
      courseTitle: "",
      instituteName: "",
      percentage: "",
      yearOfPassing: "",
    });
    if (formData.name.length === 0) {
      setErrors({ ...errors, fullname: "Invalid Name" });
      return;
    }
    if (formData.dob.length === 0) {
      setErrors({ ...errors, dob: "Invalid DOB" });
      return;
    }
    if (formData.age.length === 0) {
      setErrors({ ...errors, age: "Invalid Age" });
      return;
    }
    if (formData.gender.length === 0) {
      setErrors({ ...errors, gender: "Invalid gender" });
      return;
    }
    if (formData.address.length === 0) {
      setErrors({ ...errors, address: "Invalid Address" });
      return;
    }
    if (formData.maritalStatus.length === 0) {
      setErrors({ ...errors, maritalStatus: "Invalid Status" });
      return;
    }
    if (formData.presentOccupation.length === 0) {
      setErrors({ ...errors, presentOccupation: "Invalid Input" });
      return;
    }
    if (formData.phone.length != 10) {
      setErrors({ ...errors, phoneNo: "Invalid Phone Number" });
      return;
    }

    if (formData.batch.length === 0) {
      setErrors({ ...errors, batch: "Invalid Batch" });
      return;
    }
    if (formData.healthStatus.length === 0) {
      setErrors({
        ...errors,
        phoneNo: "Please enter fine if no health conditions",
      });
      return;
    }
    if (formData.education.courseTitle.length === 0) {
      setErrors({ ...errors, courseTitle: "Invalid course" });
      return;
    }
    if (formData.education.instituteName.length === 0) {
      setErrors({ ...errors, instituteName: "Invalid Institute" });
      return;
    }
    if (formData.education.percentage.length === 0) {
      setErrors({ ...errors, percentage: "Invalid Percentage" });
      return;
    }
    if (formData.education.yearOfPassing.length === 0) {
      setErrors({ ...errors, yearOfPassing: "Invalid Year" });
      return;
    }
    if (!isTermsAccepted) {
      toast("Please accept the terms and conditions", {
        description:
          "By accepting the terms and conditions you are agreeing to share the details with the institution",
      });
    }
    try {
      await setDoc(doc(db, "yogaTeacherUsers", formData.phone), formData);
      toast("Form Submitted", {
        description: "Thank you for submitting the form",
      });
      console.log("Form Submitted", formData);
      setTimeout(() => {
        router.back();
      },2000)
    } catch (err) {
      toast("Error", {
        description:
          "There was an error submitting the form. Please try again later",
      });
    }
  };

  return (
    <div className="flex justify-center items-center sm:h-full  m-2 sm:m-0">
      <div className="max-w-md w-full mx-auto rounded-2xl md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-gradient-to-b dark:from-neutral-950 dark:to-slate-700">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Ferrier
        </h2>
        <p className="font-medium text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Please enter your details for us to know you better
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                placeholder="Tyler"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.fullname && (
                <div className="text-red-500">Invalid Name</div>
              )}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="dob">DOB</Label>
              <Input
                id="dob"
                placeholder="dd/mm/yy"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />
              {errors.dob && <div className="text-red-500">Invalid Dob</div>}
            </LabelInputContainer>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                placeholder="18"
                type="number"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && <div className="text-red-500">Invalid age</div>}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="gender">Gender</Label>
              <Input
                id="gender"
                type="text"
                placeholder="M/F"
                value={formData.gender}
                onChange={handleChange}
              />
              {errors.gender && (
                <div className="text-red-500">enter gender</div>
              )}
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="24-bermingham palace"
              type="text"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && (
              <div className="text-red-500">Enter address</div>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="batch">Batch</Label>
            <Input
              id="batch"
              placeholder="1st"
              type="text"
              value={formData.batch}
              onChange={handleChange}
            />
            {errors.batch && <div className="text-red-500">Enter batch</div>}
          </LabelInputContainer>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="9876543210"
                type="text"
                value={formData.phone}
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                  event.target.value = event.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*?)\..*/g, "$1");
                }}
                onChange={handleChange}
              />
              {errors.phoneNo && (
                <div className="text-red-500">Invalid Phone Number</div>
              )}
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="healthStatus">Health Status</Label>
            <Input
              id="healthStatus"
              placeholder="healthy"
              type="text"
              value={formData.healthStatus}
              onChange={handleChange}
            />
            {errors.healthStatus && (
              <div className="text-red-500">Invalid Phone Number</div>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="guardinanName">Enter Guardian Name</Label>
            <Input
              id="guardianName"
              placeholder="Joel"
              type="text"
              value={formData.guardianName}
              onChange={handleChange}
            />
            {errors.guardianName && (
              <div className="text-red-500">Enter Guardian Name</div>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="maritalStatus">Enter Marital Status</Label>
            <Input
              id="maritalStatus"
              placeholder="married"
              type="text"
              value={formData.maritalStatus}
              onChange={handleChange}
            />
            {errors.maritalStatus && (
              <div className="text-red-500">Enter marital status</div>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="presentOccupation">Enter present occupation</Label>
            <Input
              id="presentOccupation"
              placeholder="yoga instructor"
              type="text"
              value={formData.presentOccupation}
              onChange={handleChange}
            />
            {errors.presentOccupation && (
              <div className="text-red-500">Enter Present Occupation</div>
            )}
          </LabelInputContainer>
          <div className="border-t border-grey mb-4"></div>
          <div className="text-white mb-4 font-semibold">Education Details</div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="yearOfPassing">Enter year of Passing</Label>
              <Input
                id="education.yearOfPassing"
                placeholder="2021"
                type="text"
                value={formData.education.yearOfPassing}
                onChange={handleChange}
              />
              {errors.yearOfPassing && (
                <div className="text-red-500">Enter year of Passing</div>
              )}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="courseTitle">Course Title</Label>
              <Input
                id="education.courseTitle"
                placeholder="solid"
                type="text"
                value={formData.education.courseTitle}
                onChange={handleChange}
              />
              {errors.courseTitle && (
                <div className="text-red-500">Enter Course Title</div>
              )}
            </LabelInputContainer>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="instituteName">Institute Name</Label>
              <Input
                id="education.instituteName"
                placeholder="None"
                type="text"
                value={formData.education.instituteName}
                onChange={handleChange}
              />
              {errors.instituteName && (
                <div className="text-red-500">Enter Institute Name</div>
              )}
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="percentage">Enter Percentage</Label>
              <Input
                id="education.percentage"
                placeholder="75%"
                type="text"
                value={formData.education.percentage}
                onChange={handleChange}
              />
              {errors.percentage && (
                <div className="text-red-500">Enter percentage</div>
              )}
            </LabelInputContainer>
          </div>

          <div className="flex font-medium text-white items-center space-x-2 m-3">
            <Dialog>
              <Checkbox id="terms" onCheckedChange={handleCheckboxChange} />
              <DialogTrigger asChild>
                <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:text-gray-400">
                  Accept terms and conditions
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] w-[400px] backdrop-blur-sm">
                <DialogHeader>
                  <DialogTitle className="text-slate-200">Ferrier</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    By submitting the details you are accepting to agree to
                    share the details with the institution
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <div className="flex justify-around">
                    <DialogClose asChild>
                      <button className="relative px-6 py-2 font-medium rounded-lg bg-indigo-500 text-white w-fit transition shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
                        Close &#x2718;
                      </button>
                    </DialogClose>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <button
            type="submit"
            className="relative px-6 py-2 font-medium rounded-lg bg-indigo-500 text-white w-fit transition shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
