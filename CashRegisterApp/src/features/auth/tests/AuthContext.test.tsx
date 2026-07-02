import { render, screen, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { AuthService } from "../api/authServices";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock AuthService
vi.mock("../api/authServices", () => ({
  AuthService: {
    login: vi.fn(),
    me: vi.fn(),
    logout: vi.fn(),
  },
}));

// Mock Mantine Notifications
vi.mock("@mantine/notifications", () => ({
  notifications: {
    show: vi.fn(),
  },
}));

const TestComponent = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? "Authenticated" : "Unauthenticated"}</div>
      <div data-testid="user-name">{user?.userName}</div>
    </div>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should be unauthenticated if /me fails", async () => {
    (AuthService.me as any).mockRejectedValue(new Error("DB Offline"));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("auth-status").textContent).toBe("Unauthenticated");
    });
  });

  it("should be authenticated if /me succeeds", async () => {
    const mockUser = { userName: "John", name: { firstName: "John", lastName: "Doe" }, role: "Admin" };
    (AuthService.me as any).mockResolvedValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("auth-status").textContent).toBe("Authenticated");
      expect(screen.getByTestId("user-name").textContent).toBe("John");
    });
  });
});
