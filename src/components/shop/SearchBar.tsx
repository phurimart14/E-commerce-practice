"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTransition } from "react";

type Props = {
  defaultValue?: string;
};

export default function SearchBar({ defaultValue }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    params.delete(""); // keep page clean

    startTransition(() => {
      router.replace(`/?${params.toString()}`);
    });
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        placeholder="ค้นหาสินค้า..."
        defaultValue={defaultValue}
        onChange={handleSearch}
        className="pl-9 w-full sm:w-56"
      />
    </div>
  );
}
