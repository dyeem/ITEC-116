export function useAuth() {
  try {
    const storedUser = localStorage.getItem("userData");
    const token = localStorage.getItem("userToken");

    if (!storedUser || storedUser === "undefined" || storedUser === "null") {
      return { user: null, token: null };
    }

    const user = JSON.parse(storedUser);

    return { user, token };
  } catch (error) {
    
    console.error("useAuth parsing error:", error);
    return { user: null, token: null };
  }
}
