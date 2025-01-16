import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <Link
        href="/vessels"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Vessels
      </Link>
      <Link
        href="/terminals"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Terminals
      </Link>
      <Link
        href="/transfer-plans"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Transfer Plans
      </Link>
    </nav>
  )
}

