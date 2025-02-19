import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactFormSchema, type ContactForm, type BusinessData } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface ContactProps {
  businessData: BusinessData;
}

const SERVICE_OPTIONS = [
  "Emergency Repair",
  "Drain Cleaning",
  "Water Heater",
  "Installation",
  "Maintenance",
  "Other",
];

export function Contact({ businessData }: ContactProps) {
  const { toast } = useToast();
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactForm) => {
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", data);
    toast({
      title: "Request Sent",
      description: "We'll contact you shortly to schedule service.",
    });
    form.reset();
  };

  return (
    <section id="contact" className="bg-white py-20 md:py-40">
      <div className="container mx-auto max-w-3xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-12">
          {businessData.basic_info.name} is ready to help with your plumbing needs
        </p>

        <Card className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Needed</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SERVICE_OPTIONS.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your plumbing needs"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full md:w-auto bg-[#FF7A00] hover:bg-[#e66e00]"
                size="lg"
              >
                Submit Request
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </section>
  );
}
