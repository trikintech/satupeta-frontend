// app/(dashboard)/manajemen-peta/components/filter-drawer.tsx
"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/shared/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Button } from "@/shared/components/ui/button";

const FilterSchema = z.object({
  status: z.string().optional(),
  klasifikasi: z.string().optional(),
  instansi: z.string().optional(),
});

type FilterValues = z.infer<typeof FilterSchema>;

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: Record<string, string>) => void;
  currentFilters: {
    filter: string;
  };
}

export function FilterDrawer({
  isOpen,
  onClose,
  onFilter,
  currentFilters,
}: FilterDrawerProps) {
  // Parse current filters
  const parseCurrentFilters = (): FilterValues => {
    try {
      if (!currentFilters.filter) return {};
      return JSON.parse(currentFilters.filter) as FilterValues;
    } catch {
      return {};
    }
  };

  const form = useForm<FilterValues>({
    resolver: zodResolver(FilterSchema),
    defaultValues: parseCurrentFilters(),
  });

  const handleSubmit = (values: FilterValues) => {
    // Filter out empty values
    const nonEmptyValues = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(values).filter(([_, v]) => v && v.trim() !== "")
    );

    // Create filter string
    const filterStr = Object.keys(nonEmptyValues).length
      ? JSON.stringify(nonEmptyValues)
      : "";

    onFilter({ filter: filterStr });
  };

  const handleReset = () => {
    form.reset({});
    onFilter({ filter: "" });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Data</SheetTitle>
          <SheetDescription>
            Atur filter untuk menampilkan data sesuai kebutuhan.
          </SheetDescription>
        </SheetHeader>

        <div className="py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Aktif">Aktif</SelectItem>
                        <SelectItem value="Non-aktif">Non-aktif</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="klasifikasi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Klasifikasi</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih klasifikasi" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Publik">Publik</SelectItem>
                        <SelectItem value="Internal">Internal</SelectItem>
                        <SelectItem value="Rahasia">Rahasia</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instansi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instansi</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih instansi" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Kementerian">Kementerian</SelectItem>
                        <SelectItem value="Pemerintah Daerah">
                          Pemerintah Daerah
                        </SelectItem>
                        <SelectItem value="BUMN">BUMN</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetFooter className="gap-2 sm:space-x-0">
                <Button variant="outline" type="button" onClick={handleReset}>
                  Reset
                </Button>
                <Button type="submit">Terapkan Filter</Button>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
