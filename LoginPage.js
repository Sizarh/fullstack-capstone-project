// LoginPage.js

async function loginUser(credentials) {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",   // Content-Type header
        "Authorization": "Bearer myToken123"  // Authorization header
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const result = await response.json();
    console.log("User logged in successfully:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example usage
loginUser({ username: "Zama", password: "mypassword123" });
