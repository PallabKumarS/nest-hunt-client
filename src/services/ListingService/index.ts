"use server";

import { getValidToken } from "@/lib/verifyToken";
import { TListing } from "@/types";
import { revalidateTag } from "next/cache";

// Get all listings
export const getAllListings = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings`, {
      next: {
        tags: ["listings"],
      },
    });
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

// Get single listing
export const getSingleListing = async (listingId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/:${listingId}`,
      {
        next: {
          tags: ["listing"],
        },
      }
    );
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

// Get all personal listings
export const getPersonalListings = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/personal`,
      {
        next: {
          tags: ["listings"],
        },
        headers: {
          Authorization: token,
        },
      }
    );
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

// Create listing
export const createListing = async (listingData: TListing): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings`, {
      method: "POST",
      body: JSON.stringify(listingData),
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });

    revalidateTag("listings");

    return res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

// Delete listing
export const deleteListing = async (listingId: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/${listingId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    revalidateTag("listings");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
