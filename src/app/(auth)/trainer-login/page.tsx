"use client";

import Image from "next/image";
import cypresslogo from "../../../../public/ferriera.png";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/shadcnInput";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "@/firebase.config";
import "./loader.css";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";

const FormSchema = z.object({
  phone: z.string().regex(/^\d{10}$/, { message: "Invalid Phone Number" }),
});

export default function MyForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const [submitError, setSubmitError] = useState("");
  const [user, setUser] = useState<ConfirmationResult | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = async ({ phone }: z.infer<typeof FormSchema>) => {
    if (!otpSent) {
      console.log(phone);
      console.log(value);
      const fullPhone = "+91" + phone;
      try {
        const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
        const confirmation = await signInWithPhoneNumber(
          auth,
          fullPhone,
          recaptcha
        );
        console.log(confirmation);
        setUser(confirmation);
        toast("OTP Sent Successfully", {
          description: "Check your phone for OTP",
        });
        setOtpSent(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      if (user) {
        try {
          await user.confirm(value);
          Cookies.set("auth", JSON.stringify(user));
          console.log("User confirmed");
          toast("otp confirmed", {
            description: "OTP Confirmed Successfully",
          });
          setTimeout(() => {
            router.push("/trainer-form");
          }, 3000);
        } catch (err) {
          console.log(err);
          toast("Error", {
            description: "Error sending OTP",
          });
        }
      } else {
        console.log("User confirmation is not available.");
      }
    }
  };

  useEffect(() => {
    if (submitError) {
      setSubmitError("");
    }
  }, [form.watch("phone")]);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="relative p-6 m-2 bg-gradient-to-b from-neutral-950 to-slate-700  w-full sm:justify-center sm:w-[500px] space-y-6 flex flex-col box-border rounded-lg shadow-[3px_3px_0px_slategray]"
          >
            <Link href="/" className="w-full flex justify-left items-center">
              <Image
                src={cypresslogo}
                alt="cypress Logo"
                width={50}
                height={50}
              />
              <span className="font-semibold dark:text-white text-4xl first-letter:ml-2">
                fr. ferreira
              </span>
            </Link>
            <FormDescription className="text-white">
              An all-In-One Collaboration and Productivity Platform
            </FormDescription>
            <div className="text-white font-bold">
              Login as an instructor
            </div>
            {otpSent ? (
              <>
                <div className="space-y-2 flex flex-col justify-center items-center">
                  <div className="text-white">Enter otp sent to your phone</div>
                  <InputOTP
                    maxLength={6}
                    value={value}
                    onChange={(value) => setValue(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <button
                  type="submit"
                  className="mx-auto w-[50%] flex justify-center px-6 py-2 font-medium rounded-lg bg-indigo-500 text-white transition shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                  disabled={isLoading}
                >
                  {!isLoading ? (
                    `Confirm OTP`
                  ) : (
                    <div className="loader flex justify-center" />
                  )}
                </button>
              </>
            ) : (
              <>
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Phone Number"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => {
                            field.onChange(e);
                            if (submitError) setSubmitError("");
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {submitError && <FormMessage>{submitError}</FormMessage>}
                <div id="recaptcha" className="flex justify-center"></div>
                <button
                  type="submit"
                  className="relative w-full flex justify-center px-6 py-2 font-medium rounded-lg bg-indigo-500 text-white transition shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                  disabled={isLoading}
                >
                  {!isLoading ? (
                    `Send OTP`
                  ) : (
                    <div className="loader flex justify-center" />
                  )}
                </button>
              </>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}
