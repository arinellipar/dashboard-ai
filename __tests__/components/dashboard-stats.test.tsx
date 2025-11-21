import { render, screen, waitFor } from "@testing-library/react";
import DashboardStats from "@/components/dashboard-stats";

global.fetch = jest.fn();
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

describe("DashboardStats Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue("mock-token");
  });

  it("should render loading state initially", () => {
    (global.fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<DashboardStats />);
    expect(screen.getByText("Loading stats...")).toBeInTheDocument();
  });

  it("should render stats after loading", async () => {
    const mockStats = {
      totalProducts: 25,
      totalOrders: 150,
      totalRevenue: 45678.9,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: mockStats,
      }),
    });

    render(<DashboardStats />);

    await waitFor(() => {
      expect(screen.getByText("25")).toBeInTheDocument();
      expect(screen.getByText("150")).toBeInTheDocument();
      expect(screen.getByText("$45678.90")).toBeInTheDocument();
    });
  });

  it("should render error message on failure", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch")
    );

    render(<DashboardStats />);

    await waitFor(() => {
      expect(screen.getByText("Failed to load stats")).toBeInTheDocument();
    });
  });

  it("should include authorization header", async () => {
    const mockStats = {
      totalProducts: 10,
      totalOrders: 20,
      totalRevenue: 1000,
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        success: true,
        data: mockStats,
      }),
    });

    render(<DashboardStats />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/stats",
        expect.objectContaining({
          headers: { Authorization: "Bearer mock-token" },
        })
      );
    });
  });
});
