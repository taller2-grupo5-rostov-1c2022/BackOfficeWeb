import React from "react";
import styles from "./Navbar.module.css";

type NavbarProps = {
  children: React.ReactNode;
  text: string;
};

// FIXME: This is a mock component.
// To show how to use components & TypeScript
const Navbar = ({ children, text }: NavbarProps) => {
  return (
    <div className={styles.navbar}>
      <div>{text}</div>
      <div>{children}</div>
    </div>
  );
};

export default Navbar;
