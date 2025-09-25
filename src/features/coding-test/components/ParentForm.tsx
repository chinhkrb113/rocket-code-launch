import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ParentFormSchema, type ParentFormData } from "../types";
import { toast } from "@/hooks/use-toast";

interface ParentFormProps {
  onSubmit: (data: ParentFormData) => void;
  defaultValues?: Partial<ParentFormData>;
}

export function ParentForm({ onSubmit, defaultValues }: ParentFormProps) {
  const form = useForm<ParentFormData>({
    resolver: zodResolver(ParentFormSchema),
    defaultValues: {
      parentName: "",
      email: "",
      phone: "",
      studentName: "",
      grade: "",
      ...defaultValues
    }
  });

  const handleSubmit = (data: ParentFormData) => {
    try {
      onSubmit(data);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra, vui lòng thử lại.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Thông tin phụ huynh để gửi kết quả</CardTitle>
          <CardDescription>
            Vui lòng điền thông tin để chúng tôi có thể gửi báo cáo kết quả test và lộ trình học phù hợp
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên phụ huynh *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Nguyễn Văn A" 
                        {...field} 
                      />
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
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="example@email.com" 
                        {...field} 
                      />
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
                    <FormLabel>Số điện thoại *</FormLabel>
                    <FormControl>
                      <Input 
                        type="tel"
                        placeholder="0901234567" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên học sinh</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Tên con (tùy chọn)" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Khối lớp hiện tại *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn khối lớp" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[6, 7, 8, 9, 10, 11, 12].map((grade) => (
                          <SelectItem key={grade} value={grade.toString()}>
                            Khối {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                Tiếp tục làm bài test
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}