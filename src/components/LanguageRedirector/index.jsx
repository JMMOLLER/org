import { Navigate } from "react-router-dom";

export default function LanguageRedirector() {
    const pathname = window.location.pathname;
    localStorage.setItem("i18nextLng", pathname.replace("/", ""));

    return <Navigate to="/" />;
}
