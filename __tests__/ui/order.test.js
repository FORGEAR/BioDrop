import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "@jest/globals";
import Page from "../components/OrderPage"; // Adjust the path as needed
import { getOrdersByUserId } from "@/actions/order";
import { auth } from "@/auth";

// Mock dependencies
jest.mock("@/actions/order", () => ({
  getOrdersByUserId: jest.fn(),
}));
jest.mock("@/auth", () => ({
  auth: jest.fn(),
}));
jest.mock("@/components/modules/website/account/Orders", () => () => (
  <div data-testid="orders-component">Mocked Orders Component</div>
));

describe("Order Page UI: Unit Testing", () => {
  test("should render the Orders component with fetched data", async () => {
    // Mock Data
    auth.mockResolvedValue({ user: { id: "user123" } });
    getOrdersByUserId.mockResolvedValue([
      { id: 1, product: "Product A", status: "Completed" },
      { id: 2, product: "Product B", status: "Pending" },
    ]);

    // ARRANGE
    render(<Page />);

    // ACT & ASSERT
    expect(await screen.findByTestId("orders-component")).toBeInTheDocument();
  });
});
