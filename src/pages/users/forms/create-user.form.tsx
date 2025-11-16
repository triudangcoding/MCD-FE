"use client";
import { useState, useEffect } from "react";
import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon,
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
    FileUserIcon,
    VoicemailIcon,
    CalendarIcon,
    UserIcon,
    ShieldCheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from "@/components/ui/sheet";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { userCreateFormSchema } from "@/pages/users/validation/create-user.validation";
import FileUpload from "@/components/custom/file-upload";

interface CreateUserFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateUserForm({ open, onOpenChange }: CreateUserFormProps) {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    type FormInput = z.input<typeof userCreateFormSchema>;

    const form = useForm<FormInput>({
        resolver: zodResolver(userCreateFormSchema),
        defaultValues: {
            fullname: "",
            email: "",
            dateOfBirth: undefined,
            password: "",
            gender: undefined,
            role: undefined,
            avatar: undefined,
        },
    });

    // Reset form khi sheet mở lại
    useEffect(() => {
        if (open) {
            form.reset();
            form.clearErrors();
        }
        // eslint-disable-next-line react-hook-form/exhaustive-deps
    }, [open]);

    function onSubmit(values: FormInput) {
        // Parse values through schema to get output type
        const parsedValues = userCreateFormSchema.parse(values);
        console.log(parsedValues);
        // Sau khi submit thành công, đóng sheet
        onOpenChange(false);
    }

    function onReset() {
        form.reset();
        form.clearErrors();
    }

    function handleOpenChange(newOpen: boolean) {
        // Nếu đang đóng sheet và form đã có thay đổi
        if (!newOpen && open && form.formState.isDirty) {
            setShowConfirmDialog(true);
        } else {
            onOpenChange(newOpen);
        }
    }

    function handleConfirmClose() {
        setShowConfirmDialog(false);
        onReset();
        onOpenChange(false);
    }

    function handleCancelClose() {
        setShowConfirmDialog(false);
    }

    function handleDialogOpenChange(dialogOpen: boolean) {
        // Nếu đóng dialog bằng cách click ra ngoài hoặc ESC, giữ sheet mở
        if (!dialogOpen) {
            setShowConfirmDialog(false);
        }
    }

    return (
        <>
            <Sheet open={open} onOpenChange={handleOpenChange}>
                <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col">
                <SheetHeader className="border-b px-0">
                    <SheetTitle className="text-lg">Add New User</SheetTitle>
                    <SheetDescription className="text-sm">
                        Fill in the information to add a new user to the system
                    </SheetDescription>
                </SheetHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        onReset={onReset}
                        className="flex flex-col flex-1 overflow-hidden"
                    >
                        <div className="space-y-8 @container flex-1 overflow-y-auto">
                            <div className="grid grid-cols-12 gap-4 mx-1 items-start">
                                <FormField
                                    control={form.control}
                                    name="fullname"
                                    render={({ field }) => (
                                        <FormItem className="col-span-12 col-start-auto">
                                            <FormLabel>Fullname</FormLabel>
                                            <FormControl>
                                                <InputGroup>
                                                    <InputGroupInput
                                                        placeholder="Your fullname"
                                                        type="text"
                                                        {...field}
                                                    />
                                                    <InputGroupAddon align="inline-start">
                                                        <FileUserIcon className="size-4" strokeWidth={2} />
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="col-span-12 col-start-auto">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <InputGroup>
                                                    <InputGroupInput
                                                        placeholder="Your email"
                                                        type="email"
                                                        {...field}
                                                    />
                                                    <InputGroupAddon align="inline-start">
                                                        <VoicemailIcon className="size-4" strokeWidth={2} />
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dateOfBirth"
                                    render={({ field }) => (
                                        <FormItem className="col-span-6 col-start-auto">
                                            <FormLabel>Date of birth</FormLabel>
                                            <FormControl>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className="justify-start text-left font-normal w-full"
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span className="text-muted-foreground">
                                                                    Date of birth
                                                                </span>
                                                            )}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            initialFocus
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem className="col-span-6 col-start-auto">
                                            <FormLabel>Gender</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full pl-9 relative">
                                                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" strokeWidth={2} />
                                                        <SelectValue placeholder="Select gender" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="male">Male</SelectItem>
                                                    <SelectItem value="female">Female</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem className="col-span-12 col-start-auto">
                                            <FormLabel>Role</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full pl-9 relative">
                                                        <ShieldCheckIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" strokeWidth={2} />
                                                        <SelectValue placeholder="Select role" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="super_admin">Super Admin</SelectItem>
                                                    <SelectItem value="manager">Manager</SelectItem>
                                                    <SelectItem value="staff">Staff</SelectItem>
                                                    <SelectItem value="casher">Casher</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="avatar"
                                    render={({ field }) => (
                                        <FormItem className="col-span-12 col-start-auto pb-4">
                                            <FormLabel>Avatar</FormLabel>
                                            <FormControl>
                                                <FileUpload
                                                    onFileSelect={(file) => {
                                                        field.onChange(file);
                                                    }}
                                                    onFileError={(error) => {
                                                        form.setError("avatar", {
                                                            type: "manual",
                                                            message: error,
                                                        });
                                                    }}
                                                    currentFile={field.value || null}
                                                    maxFileSize={10 * 1024 * 1024} // 10MB
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <SheetFooter className="border-t px-0 mt-auto">
                            <Button
                                className="w-full"
                                type="submit"
                                variant="default"
                            >
                                Create new user
                            </Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>

        <AlertDialog open={showConfirmDialog} onOpenChange={handleDialogOpenChange}>
            <AlertDialogContent variant="error">
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm close form</AlertDialogTitle>
                    <AlertDialogDescription>
                        You have unsaved changes. Are you sure you want to close the form? All changes will be lost.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancelClose}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmClose}>
                        Close
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </>
    );
}
