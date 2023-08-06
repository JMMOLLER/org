import "./Header.css";

/* eslint-disable react/prop-types */
export default function Header({ children }) {
    return (
        <header>
            {children}
        </header>
    )
}