import { render, screen, waitFor } from "@testing-library/react";
import ProductList from "@/components/product-list";

global.fetch = jest.fn();

describe("ProductList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render loading state initially", () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<ProductList />);
    expect(screen.getByText("Loading products...")).toBeInTheDocument();
  });

  it("should render products after loading", async () => {
    const mockProducts = [
      {
        id: "1",
        name: "Test Product",
        description: "Test Description",
        price: 29.99,
        stock: 100,
        category: "Electronics",
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: { products: mockProducts },
      }),
    });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
      expect(screen.getByText("$29.99")).toBeInTheDocument();
    });
  });

  it("should render table headers", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: { products: [] },
      }),
    });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Category")).toBeInTheDocument();
      expect(screen.getByText("Price")).toBeInTheDocument();
      expect(screen.getByText("Stock")).toBeInTheDocument();
    });
  });
});
