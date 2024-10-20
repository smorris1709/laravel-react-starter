import { cn } from "@/lib/utils";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      alt="Your Company"
      src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
      className={cn("mx-auto h-10 w-auto", className)}
    />
  );
}
