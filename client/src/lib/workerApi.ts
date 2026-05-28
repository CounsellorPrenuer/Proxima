import { PROJECT_ID, UNIVERSAL_WORKER_URL } from "@/lib/config";

export interface WorkerResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

async function parseJsonSafe(res: Response): Promise<any> {
  const raw = await res.text();
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(res.ok ? "Invalid server response format" : raw);
  }
}

async function postWorker<T>(path: string, payload: Record<string, unknown>): Promise<T> {
  const response = await fetch(`${UNIVERSAL_WORKER_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, project_id: PROJECT_ID }),
  });

  const json = await parseJsonSafe(response);
  if (!response.ok) {
    throw new Error(json?.error || json?.message || `Request failed (${response.status})`);
  }
  return json as T;
}

export function previewCoupon(payload: { plan_id: string; coupon_code: string }) {
  return postWorker("/api/coupons/preview", payload);
}

export function createOrder(payload: {
  plan_id: string;
  coupon_code?: string;
  name: string;
  email: string;
  phone: string;
}) {
  return postWorker("/api/payments/create-order", payload);
}

export function verifyPayment(payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  plan_id: string;
}) {
  return postWorker("/api/payments/verify", payload);
}

export function submitLead(payload: {
  name: string;
  email: string;
  phone: string;
  message?: string;
}) {
  return postWorker("/api/forms/submit", payload);
}
