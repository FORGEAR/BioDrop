import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "@jest/globals";
import Page from "../components/Dashboard"; // Adjust path as needed
import { getOrdersByUserId } from "@/actions/order";
import { auth } from "@/auth";

// Mock dependencies
jest.mock("@/actions/order", () => ({
  getOrdersByUserId: jest.fn(),
}));
jest.mock("@/auth", () => ({
  auth: jest.fn(),
}));

describe("Dashboard UI: Unit testing", () => {
  test("should display total orders, received orders, and paid orders", async () => {
    // Mock Data
    auth.mockResolvedValue({ user: { id: "user123" } });
    getOrdersByUserId.mockResolvedValue([
      { shippingStatus: "completed", isPaid: true, total: 100 },
      { shippingStatus: "pending", isPaid: false, total: 50 },
      { shippingStatus: "completed", isPaid: true, total: 200 },
    ]);

    // ARRANGE
    render(<Page />);

    // ACT & ASSERT
    expect(await screen.findByText(/3\+ orders/i)).toBeInTheDocument();
    expect(await screen.findByText(/2\+ received/i)).toBeInTheDocument();
    expect(await screen.findByText(/300\+ paid/i)).toBeInTheDocument();
  });
});
