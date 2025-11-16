"use client";
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
    KeyRoundIcon,
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
} from "@/components/ui/sheet";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { userCreateFormSchema } from "@/pages/users/validation/create-user.validation";

interface CreateUserFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateUserForm({ open, onOpenChange }: CreateUserFormProps) {


    const form = useForm<z.infer<typeof userCreateFormSchema>>({
        resolver: zodResolver(userCreateFormSchema),
        defaultValues: {
            fullname: "",
            email: "",
            dateOfBirth: undefined,
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof userCreateFormSchema>) {
        console.log(values);
    }

    function onReset() {
        form.reset();
        form.clearErrors();
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
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
                        className="space-y-8 @container flex-1 overflow-y-auto"
                    >
                        <div className="grid grid-cols-12 gap-4 mx-1">
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
                                    <FormItem className="col-span-12 col-start-auto">
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 col-start-auto">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <InputGroup>
                                                <InputGroupInput
                                                    placeholder="Your password"
                                                    type="password"
                                                    {...field}
                                                />
                                                <InputGroupAddon align="inline-start">
                                                    <KeyRoundIcon className="size-4" strokeWidth={2} />
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="col-span-12 col-start-auto">
                                <Button
                                    className="w-full"
                                    type="submit"
                                    variant="default"
                                >
                                    Create new user
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}
