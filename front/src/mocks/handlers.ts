import { http, HttpResponse } from "msw";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const handlers = [
  // ---------------- AUTH ----------------
  http.post(`${BASE_URL}/register`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    if (body.email && body.password) {
      return HttpResponse.json({ token: "fake-jwt-token-123" });
    }

    return HttpResponse.json(
      { message: "Invalid credentials", errors: {} },
      { status: 401 },
    );
  }),

  // ---------------- OVERVIEW / WASTE TYPES ----------------
  http.get(`${BASE_URL}/waste-by-type`, () => {
    return HttpResponse.json({
      success: true,
      message: "ok",
      data: {
        plastic: { total_quantity: 450, percentage: 35 },
        paper: { total_quantity: 300, percentage: 25 },
        glass: { total_quantity: 200, percentage: 15 },
        metal: { total_quantity: 180, percentage: 15 },
        organic: { total_quantity: 130, percentage: 10 },
      },
    });
  }),

  // ---------------- WASTE PRICES ----------------
  http.get(`${BASE_URL}/waste-types`, () => {
    return HttpResponse.json({
      data: [
        { id: 1, name: "Plastic", price_per_kg: "5.5" },
        { id: 2, name: "Paper", price_per_kg: "3.2" },
        { id: 3, name: "Glass", price_per_kg: "2.0" },
        { id: 4, name: "Metal", price_per_kg: "8.0" },
        { id: 5, name: "Organic", price_per_kg: "1.5" },
      ],
    });
  }),

  http.post(`${BASE_URL}/waste-types/prices`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ success: true, data: body });
  }),

  // ---------------- ANALYTICS ----------------
  http.get(`${BASE_URL}/collectors-performance`, () => {
    return HttpResponse.json({
      data: [
        { collector_id: 1, total_quantity_collected: 450, orders_count: 32 },
        { collector_id: 2, total_quantity_collected: 320, orders_count: 21 },
        { collector_id: 3, total_quantity_collected: 610, orders_count: 40 },
      ],
    });
  }),

  http.get(`${BASE_URL}/most-contributed-location`, () => {
    return HttpResponse.json({
      data: [
        { location_name: "Nasr City", total_quantity: 1200, percentage: 40 },
        { location_name: "Maadi", total_quantity: 950, percentage: 32 },
        { location_name: "Heliopolis", total_quantity: 780, percentage: 28 },
      ],
    });
  }),

  // ---------------- COLLECTORS ----------------
  http.get(`${BASE_URL}/waste-collectors`, () => {
    return HttpResponse.json({
      collectors: [
        {
          id: 1,
          name: "Ahmed Mostafa",
          email: "ahmed@test.com",
          phone: "01012345678",
        },
        {
          id: 2,
          name: "Sara Ali",
          email: "sara@test.com",
          phone: "01098765432",
        },
        {
          id: 3,
          name: "Mohamed Hassan",
          email: "mohamed@test.com",
          phone: "01123456789",
        },
      ],
    });
  }),

  // ---------------- CUSTOMERS ----------------
  http.get(`${BASE_URL}/users`, () => {
    return HttpResponse.json({
      users: [
        {
          user_id: 1,
          name: "Omar Khaled",
          total_points: 340,
          total_balance: 120.5,
        },
        {
          user_id: 2,
          name: "Laila Ahmed",
          total_points: 210,
          total_balance: 85.0,
        },
        {
          user_id: 3,
          name: "Youssef Tarek",
          total_points: 590,
          total_balance: 210.75,
        },
      ],
    });
  }),

  // ---------------- ORDERS / WASTE TRANSACTIONS ----------------
  http.get(`${BASE_URL}/orders`, () => {
    return HttpResponse.json({
      orders: [
        {
          order_id: "ORD-1001",
          arrival_time: "2026-07-20T10:30:00Z",
          user_name: "Omar Khaled",
          collector_name: "Ahmed Mostafa",
          quantity: 12.5,
          price_for_kg: 5.5,
          payment_method: "cash",
          status: "completed",
        },
        {
          order_id: "ORD-1002",
          arrival_time: "2026-07-21T14:00:00Z",
          user_name: "Laila Ahmed",
          collector_name: "Sara Ali",
          quantity: 8.0,
          price_for_kg: 3.2,
          payment_method: "points",
          status: "pending",
        },
        {
          order_id: "ORD-1003",
          arrival_time: "2026-07-22T09:15:00Z",
          user_name: "Youssef Tarek",
          collector_name: "Mohamed Hassan",
          quantity: 20.0,
          price_for_kg: 8.0,
          payment_method: "cash",
          status: "completed",
        },
      ],
    });
  }),

  // ---------------- POINT TRANSACTIONS ----------------
  http.get(`${BASE_URL}/transactions/pending`, () => {
    return HttpResponse.json({
      data: [
        {
          id: 1,
          date: "2026-07-24T12:00:00Z",
          status: "pending",
          points: 150,
          balance_by_points: 45.0,
          user: { id: 1, name: "Omar Khaled" },
        },
        {
          id: 2,
          date: "2026-07-25T09:30:00Z",
          status: "pending",
          points: 90,
          balance_by_points: 27.0,
          user: { id: 2, name: "Laila Ahmed" },
        },
      ],
    });
  }),

  http.patch(`${BASE_URL}/transactions/:id/status`, ({ params }) => {
    return HttpResponse.json({ success: true, id: params.id });
  }),
];
