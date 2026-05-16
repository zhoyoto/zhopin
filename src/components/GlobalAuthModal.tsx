"use client";

import React, { useState, useEffect } from "react";
import AuthModal from "./AuthModal";

export default function GlobalAuthModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-auth-modal", handleOpen);
    return () => window.removeEventListener("open-auth-modal", handleOpen);
  }, []);

  return <AuthModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}

export const openAuthModal = () => {
  window.dispatchEvent(new CustomEvent("open-auth-modal"));
};
