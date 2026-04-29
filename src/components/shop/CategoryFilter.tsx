"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  categories: string[];
  selected?: string;
};

export default function CategoryFilter({ categories, selected }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(value: string | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }

    router.replace(`/?${params.toString()}`);
  }

  return (
    <Select defaultValue={selected ?? "all"} onValueChange={handleChange}>
      <SelectTrigger className="w-full sm:w-48">
        <SelectValue placeholder="หมวดหมู่" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">ทั้งหมด</SelectItem>
        {categories.map((cat) => (
          <SelectItem key={cat} value={cat}>
            {cat}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
