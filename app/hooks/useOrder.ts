import useSWRMutation from "swr/mutation";
import { fetcher, post, patch, trackingNumberUpdate } from "../lib/fetcher";
import useSWR, { useSWRConfig } from "swr";

interface EmailDetails {
  email: string;
  subject: string;
  html: string;
}

interface UseSendEmailReturn {
  sendEmail: (emailDetails: EmailDetails) => Promise<any>;
  isLoading: boolean;
  successMessage: string;
  errorMessage: string;
}

interface UseStatsReturn {
  stats: any;
  isLoading: boolean;
  errorMessage: string | null;
}

interface CheckoutDetails {
  checkoutProducts: any[];
  shippingAddress: any;
  fromCart: boolean;
}

interface UseCheckoutReturn {
  handleCheckout: (checkoutDetails: CheckoutDetails) => Promise<any>;
  isLoading: boolean;
  successUrl: string;
  errorMessage: string;
  mutate: () => Promise<any>;
}

export function useSendEmail() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/send-email",
    async (url, { arg }: { arg: EmailDetails }) => post(url, arg)
  );

  return {
    sendEmail: (emailDetails: EmailDetails) => trigger(emailDetails),
    isLoading: isMutating,
    successMessage: data?.message || "",
    errorMessage: error?.message || "",
  } as UseSendEmailReturn;
}

export function useStats() {
  const { data, error, isLoading } = useSWR("/api/admin/stats", fetcher);

  return {
    stats: data?.success ? data.data : null,
    isLoading,
    errorMessage: error
      ? "Failed to fetch dashboard data"
      : data?.error || null,
  } as UseStatsReturn;
}

export function useCheckout() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/checkout",
    async (url, { arg }: { arg: CheckoutDetails }) => post(url, arg)
  );

  const handleCheckout = async (checkoutDetails: CheckoutDetails) => {
    const result = await trigger(checkoutDetails);
    return result; 
  };

  return {
    handleCheckout,
    isLoading: isMutating,
    successUrl: data?.url || "",
    errorMessage: error?.message || "",
  } as UseCheckoutReturn;
}

export const deliveryStatus = async (status: string, id: number) => {
  await patch("/api/orders", status, id);
};

export const trackingNumberUpdateHandler = async (
  trackingNumber: string,
  id: number
) => {
  await trackingNumberUpdate("/api/orders", trackingNumber, id);
};
