import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinueGuest: () => void;
  address: Address;
};
type Address = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  saveAddress: boolean;
};
export default function LoginDialog({
  open,
  onOpenChange,
  onContinueGuest,
  address,
}: Props) {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">

        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Continue Checkout
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">

<Button
  className="w-full"
  onClick={() => {
    sessionStorage.setItem("checkout-return", "/checkout");

    sessionStorage.setItem(
      "checkout-address",
      JSON.stringify(address)
    );

    navigate({
      to: "/auth/login",
    });
  }}
>
  Login
</Button>

 <Button
  variant="outline"
  className="w-full"
  onClick={() => {
    sessionStorage.setItem("checkout-return", "/checkout");

    sessionStorage.setItem(
      "checkout-address",
      JSON.stringify(address)
    );

    navigate({
      to: "/auth/register",
    });
  }}
>
  Register
</Button>

          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              onOpenChange(false);
              onContinueGuest();
            }}
          >
            Continue as Guest
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}