import ListingForm from "@/components/forms/ListingForm";
import Container from "@/components/shared/Container";
import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CreateListing = () => {
  return (
    <Container>
      <div className="flex flex-col md:flex-row items-center justify-between gap-y-5 gap-x-2">
        <div>
          <h1
            className={cn(
              "text-3xl font-bold tracking-tight",
              "bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent"
            )}
          >
            Create Your Listing
          </h1>
          <p className="mt-2 text-muted-foreground">
            Share your property with potential tenants
          </p>
        </div>

        <Modal
          title="Create Listing"
          trigger={
            <Button
              variant="secondary"
              className={cn(
                "px-6 py-2 text-lg",
                "bg-gradient-to-r from-green-500 to-emerald-500",
                "text-white hover:opacity-90 transition-opacity",
                "shadow-md hover:shadow-lg cursor-pointer"
              )}
            >
              Create Listing
            </Button>
          }
          content={<ListingForm />}
        />
      </div>
    </Container>
  );
};

export default CreateListing;
