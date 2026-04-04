# CashRegisterApp - Main Frontend Application

The source code for the React-based Cash Register dashboard.

## Tech Stack & Libraries
- **UI Components:** Mantine (`@mantine/core`, etc.).
- **State Management:** React Context API and Hooks.
- **Routing:** React Router v6.
- **Styling:** PostCSS with Mantine's styling system.
- **Date Management:** `dayjs`.
- **Charts:** `recharts` and Mantine Charts.

## Directory Structure (src/)
- `api/`: Backend integration (Axios or Fetch).
- `Components/`: Reusable UI components.
- `contexts/`: React context providers.
- `pages/`: Main application pages.
- `services/`: Business logic and external API communication logic.
- `styles/`: Global styles and PostCSS configuration.

## Guidelines for Gemini
- Follow the component architecture established in `src/Components`.
- Use Mantine's hooks (e.g., `useDisclosure`, `useForm`) to simplify state management.
- Ensure all API calls are centralized in the `services/` directory.
- Use `App.tsx` and `routes.tsx` to manage application structure and navigation.
