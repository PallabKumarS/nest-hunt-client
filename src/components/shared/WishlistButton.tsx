"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/redux/hook";
import { wishlistSelector } from "@/redux/features/wishlistSlice";
import { userSelector } from "@/redux/features/authSlice";
import Link from "next/link";

const WishlistButton = () => {
  const wishlistProperties = useAppSelector(wishlistSelector);
  const user = useAppSelector(userSelector);

  if (!user) return null;

  return (
    <Link href="/wishlist">
      <Button variant="ghost" size="icon" className="relative">
        <Heart className="h-5 w-5" />
        {wishlistProperties.length > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {wishlistProperties.length}
          </Badge>
        )}
      </Button>
    </Link>
  );
};

export default WishlistButton;
