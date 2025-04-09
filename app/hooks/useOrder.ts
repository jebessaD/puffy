import useSWRMutation from "swr/mutation";
import { fetcher, post } from "../lib/fetcher";
import useSWR from "swr";

export function useSendEmail() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/send-email",
    async (url, { arg }: { arg: EmailDetails }) => post(url, arg) // Ensure correct argument type
  );

  interface EmailDetails {
    email: string; // Renamed from 'recipient' to 'email' to match schema
    subject: string;
    html: string; // Renamed from 'body' to 'html' to match schema
  }

  interface UseSendEmailReturn {
    sendEmail: (emailDetails: EmailDetails) => Promise<any>;
    isLoading: boolean;
    successMessage: string;
    errorMessage: string;
  }

  return {
    sendEmail: (emailDetails: EmailDetails) => trigger(emailDetails), // Updated to use the corrected interface
    isLoading: isMutating,
    successMessage: data?.message || "",
    errorMessage: error?.message || "",
  } as UseSendEmailReturn;
}

export function useStats() {
  const { data, error, isLoading } = useSWR("/api/admin/stats", fetcher);



  interface UseStatsReturn {
    stats: any;
    isLoading: boolean;
    errorMessage: string | null;
  }

  return {
    stats: data?.success ? data.data : null,
    isLoading,
    errorMessage: error ? "Failed to fetch dashboard data" : data?.error || null,
  } as UseStatsReturn;
}
